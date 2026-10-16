'use client';

import { useWallet } from '@/lib/bwallet';

/** Sign in with a BRC-100 wallet (bWalletX first). Shows the paymail or a short identity key. */
export default function WalletButton({ className = '' }: { className?: string }) {
  const { user, connecting, error, connect, disconnect } = useWallet();
  const base =
    'inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ' + className;
  if (user) {
    return (
      <span className="inline-flex items-center gap-2">
        <span className="text-sm text-amber-300" title={user.identityKey}>
          {user.name}
        </span>
        <button type="button" onClick={disconnect} className={base + ' border border-white/20 text-white/80 hover:bg-white/10'}>
          Sign out
        </button>
      </span>
    );
  }
  return (
    <span className="inline-flex flex-col items-end">
      <button
        type="button"
        data-signin
        onClick={connect}
        disabled={connecting}
        className={base + ' bg-amber-400 text-black hover:bg-amber-300 disabled:opacity-60'}
      >
        {connecting ? 'Connecting…' : 'Sign in with bWalletX'}
      </button>
      {error && <span className="mt-1 max-w-xs text-right text-xs text-red-400">{error}</span>}
    </span>
  );
}
