'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const WalletConnectContent: FC = () => {
    const { publicKey } = useWallet();

    return (
        <div className="flex items-center gap-4">
            {publicKey && (
                <div className="text-sm font-mono">
                    {publicKey.toBase58().slice(0, 4)}...
                    {publicKey.toBase58().slice(-4)}
                </div>
            )}
            <WalletMultiButton className="wallet-adapter-button" />
        </div>
    );
};

// Dynamically load the wallet component to prevent SSR issues
const WalletConnect = dynamic(
    () => Promise.resolve(WalletConnectContent),
    {
        ssr: false,
    }
);

export default WalletConnect;
