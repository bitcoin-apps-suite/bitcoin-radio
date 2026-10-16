'use client';

import { useCallback, useEffect, useState } from 'react';
import { useWallet, inscribeFile, listSaved, MAX_INSCRIPTION_BYTES, type SavedItem } from '@/lib/bwallet';

type Props = { accept: string; noun: string; title?: string; file?: File | null };

/**
 * Save a file on-chain as a 1Sat ordinal held in the user's own wallet, and list what they saved.
 * The wallet funds the fee and shows its own approval sheet. Nothing here is custodial.
 */
export default function SaveOnChain({ accept, noun, title, file: given }: Props) {
  const { user, connect, connecting } = useWallet();
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string; txid?: string } | null>(null);
  const [items, setItems] = useState<SavedItem[] | null>(null);
  const chosen = given ?? file;

  const refresh = useCallback(async () => {
    try {
      setItems(await listSaved());
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    if (user) refresh();
    else setItems(null);
  }, [user, refresh]);

  const save = async () => {
    if (!chosen) return;
    setBusy(true);
    setMsg(null);
    try {
      const txid = await inscribeFile(chosen, `Save ${noun} on-chain`);
      setMsg({ ok: true, text: 'Saved on-chain.', txid });
      setFile(null);
      refresh();
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : 'The wallet did not complete the save.' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-3xl rounded-2xl border border-white/10 bg-black/40 p-6 text-white">
      <h2 className="text-lg font-semibold">{title ?? `Save your ${noun} on-chain`}</h2>
      <p className="mt-1 text-sm text-white/60">
        Inscribed as a 1Sat ordinal and kept in your own wallet. Your wallet shows the fee and asks you to approve.
      </p>
      {!user ? (
        <button
          type="button"
          onClick={connect}
          disabled={connecting}
          className="mt-4 rounded-lg bg-amber-400 px-4 py-2 text-sm font-medium text-black hover:bg-amber-300 disabled:opacity-60"
        >
          {connecting ? 'Connecting…' : 'Sign in with bWalletX to save'}
        </button>
      ) : (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {!given && (
            <input
              type="file"
              accept={accept}
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="text-sm text-white/80 file:mr-3 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-white"
            />
          )}
          <button
            type="button"
            onClick={save}
            disabled={!chosen || busy || (chosen?.size ?? 0) > MAX_INSCRIPTION_BYTES}
            className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-medium text-black hover:bg-amber-300 disabled:opacity-50"
          >
            {busy ? 'Waiting for wallet…' : 'Save on-chain'}
          </button>
          {chosen && chosen.size > MAX_INSCRIPTION_BYTES && (
            <span className="text-xs text-red-400">Up to 5 MB per file.</span>
          )}
        </div>
      )}
      {msg && (
        <p className={`mt-3 text-sm ${msg.ok ? 'text-green-400' : 'text-red-400'}`}>
          {msg.text}{' '}
          {msg.txid && (
            <a className="underline" href={`https://whatsonchain.com/tx/${msg.txid}`} target="_blank" rel="noopener noreferrer">
              View transaction
            </a>
          )}
        </p>
      )}
      {user && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-white/80">Your saved {noun}s</h3>
          {items === null ? (
            <p className="mt-2 text-sm text-white/50">Loading…</p>
          ) : items.length === 0 ? (
            <p className="mt-2 text-sm text-white/50">Nothing saved yet. Your first one will show up here.</p>
          ) : (
            <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {items.map((it) => (
                <li key={it.outpoint} className="overflow-hidden rounded-lg border border-white/10 bg-white/5">
                  {it.url && it.mime.startsWith('image/') && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={it.url} alt={it.name} className="aspect-square w-full object-cover" />
                  )}
                  {it.url && it.mime.startsWith('audio/') && <audio src={it.url} controls className="w-full" />}
                  {it.url && it.mime.startsWith('video/') && <video src={it.url} controls className="w-full" />}
                  <a
                    href={`https://whatsonchain.com/tx/${it.txid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block truncate px-2 py-1 text-xs text-white/70 hover:text-white"
                  >
                    {it.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
