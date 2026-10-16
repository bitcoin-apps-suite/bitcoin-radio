'use client';

/**
 * BRC-100 wallet connection (bWalletX first; any BRC-100 wallet works).
 * Auto mode: XDM when framed inside bWalletX, otherwise window.CWI or a local wallet on :3321.
 * No server keys, no custodial balances: every paid action is a wallet createAction,
 * and the wallet shows its own approval sheet.
 */
import { useCallback, useEffect, useState } from 'react';
import { WalletClient, PublicKey, P2PKH, LockingScript, Utils } from '@bsv/sdk';

export const APP_NAME = 'bRadio';
export const BASKET = 'bradio';
const ORIGINATOR = 'bitcoin-radio.vercel.app';
const PAYMAIL_API = 'https://pay.bwallet.space/api/paymail/lookup';
const STORE_KEY = `${BASKET}:identity`;

let client: WalletClient | null = null;
export const getWallet = (): WalletClient => {
  if (!client) client = new WalletClient('auto', ORIGINATOR);
  return client;
};

export type WalletUser = { identityKey: string; paymail?: string; name: string };

const short = (k: string) => `${k.slice(0, 6)}…${k.slice(-4)}`;

const lookupPaymail = async (identityKey: string): Promise<string | undefined> => {
  try {
    const r = await fetch(`${PAYMAIL_API}?key=${identityKey}`);
    if (!r.ok) return undefined;
    const j = await r.json();
    return typeof j?.paymail === 'string' ? j.paymail : undefined;
  } catch {
    return undefined;
  }
};

const readStored = (): WalletUser | null => {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as WalletUser) : null;
  } catch {
    return null;
  }
};

const listeners = new Set<(u: WalletUser | null) => void>();
const broadcast = (u: WalletUser | null) => listeners.forEach((l) => l(u));

/** Ask the wallet for this user's identity key (the wallet asks the user to allow it). */
export const connectWallet = async (): Promise<WalletUser> => {
  const w = getWallet();
  const { publicKey } = await w.getPublicKey({ identityKey: true });
  const paymail = await lookupPaymail(publicKey);
  const user: WalletUser = { identityKey: publicKey, paymail, name: paymail ?? short(publicKey) };
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(user));
  } catch {}
  broadcast(user);
  return user;
};

export const disconnectWallet = () => {
  try {
    localStorage.removeItem(STORE_KEY);
  } catch {}
  broadcast(null);
};

export const useWallet = () => {
  const [user, setUser] = useState<WalletUser | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setUser(readStored());
    listeners.add(setUser);
    return () => {
      listeners.delete(setUser);
    };
  }, []);
  const connect = useCallback(async () => {
    setConnecting(true);
    setError(null);
    try {
      return await connectWallet();
    } catch (e) {
      setError(
        e instanceof Error && e.message
          ? e.message
          : 'No BRC-100 wallet found. Open this app inside bWalletX, or install bWalletX.',
      );
      return null;
    } finally {
      setConnecting(false);
    }
  }, []);
  return { user, connecting, error, connect, disconnect: disconnectWallet };
};

/* ---------- On-chain saves (1Sat ordinal inscriptions held in the user's own wallet) ---------- */

const PROTOCOL: [1, string] = [1, `${BASKET} inscription`];

const pushData = (bytes: number[]): string => {
  const n = bytes.length;
  const hex = Utils.toHex(bytes);
  if (n === 0) return '00';
  if (n < 0x4c) return n.toString(16).padStart(2, '0') + hex;
  if (n <= 0xff) return '4c' + n.toString(16).padStart(2, '0') + hex;
  if (n <= 0xffff) return '4d' + Utils.toHex([n & 0xff, n >> 8]) + hex;
  return '4e' + Utils.toHex([n & 0xff, (n >> 8) & 0xff, (n >> 16) & 0xff, (n >>> 24) & 0xff]) + hex;
};

/** Inscription envelope (1Sat ordinals) followed by a P2PKH lock to the given address. */
const inscriptionScript = (address: string, mime: string, data: number[]): LockingScript => {
  const env =
    '0063' + // OP_FALSE OP_IF
    pushData(Utils.toArray('ord', 'utf8')) +
    '51' + // OP_1 (content type)
    pushData(Utils.toArray(mime, 'utf8')) +
    '00' + // OP_0 (content)
    pushData(data) +
    '68'; // OP_ENDIF
  const p2pkh = new P2PKH().lock(address).toHex();
  return LockingScript.fromHex(env + p2pkh);
};

export const MAX_INSCRIPTION_BYTES = 5 * 1024 * 1024;

/**
 * Inscribe a file on-chain as a 1Sat ordinal, locked to a key derived from the user's wallet
 * and kept in this app's basket. The wallet funds the fee and shows its own approval sheet.
 */
export const inscribeFile = async (file: File, description: string): Promise<string> => {
  if (file.size > MAX_INSCRIPTION_BYTES) throw new Error('Files up to 5 MB can be saved on-chain here.');
  const w = getWallet();
  const keyID = String(Date.now());
  const { publicKey } = await w.getPublicKey({ protocolID: PROTOCOL, keyID, counterparty: 'self' });
  const address = PublicKey.fromString(publicKey).toAddress();
  const data = Array.from(new Uint8Array(await file.arrayBuffer()));
  const mime = file.type || 'application/octet-stream';
  const res = await w.createAction({
    description: description.slice(0, 50),
    outputs: [
      {
        lockingScript: inscriptionScript(address, mime, data).toHex(),
        satoshis: 1,
        outputDescription: `${APP_NAME} inscription`.slice(0, 50),
        basket: BASKET,
        tags: [mime.split('/')[0] || 'file'],
        customInstructions: JSON.stringify({ protocolID: PROTOCOL, keyID, counterparty: 'self', name: file.name }),
      },
    ],
    options: { randomizeOutputs: false },
  });
  if (!res.txid) throw new Error('The wallet did not return a transaction id.');
  return res.txid;
};

export type SavedItem = { outpoint: string; txid: string; mime: string; name: string; url?: string };

const parseInscription = (hex: string): { mime: string; data: number[] } | null => {
  try {
    const chunks = LockingScript.fromHex(hex).chunks;
    const i = chunks.findIndex((c, k) => c.op === 0 && chunks[k + 1]?.op === 0x63);
    if (i < 0) return null;
    const body = chunks.slice(i + 2);
    if (Utils.toUTF8(body[0]?.data ?? []) !== 'ord') return null;
    let mime = 'application/octet-stream';
    let data: number[] = [];
    for (let k = 1; k < body.length && body[k].op !== 0x68; k++) {
      if (body[k].op === 0x51) mime = Utils.toUTF8(body[k + 1]?.data ?? []);
      if (body[k].op === 0 && !body[k].data) data = body[k + 1]?.data ?? [];
    }
    return { mime, data };
  } catch {
    return null;
  }
};

/** This user's saved items, read back from their own wallet basket. */
export const listSaved = async (): Promise<SavedItem[]> => {
  const w = getWallet();
  const r = await w.listOutputs({
    basket: BASKET,
    include: 'locking scripts',
    includeCustomInstructions: true,
    limit: 100,
  });
  return r.outputs.map((o) => {
    let name = 'Untitled';
    try {
      name = JSON.parse(o.customInstructions ?? '{}').name ?? name;
    } catch {}
    const ins = o.lockingScript ? parseInscription(o.lockingScript) : null;
    const url = ins ? URL.createObjectURL(new Blob([new Uint8Array(ins.data)], { type: ins.mime })) : undefined;
    return { outpoint: o.outpoint, txid: o.outpoint.split('.')[0], mime: ins?.mime ?? '', name, url };
  });
};
