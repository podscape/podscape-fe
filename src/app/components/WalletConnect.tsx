'use client';

import { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

const WalletConnectContent: FC = () => {
    const { publicKey } = useWallet();
    const { connection } = useConnection();
    const [balance, setBalance] = useState<number | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchBalance = async () => {
            if (!publicKey) {
                setBalance(null);
                return;
            }

            try {
                const lamports = await connection.getBalance(publicKey);
                if (isMounted) {
                    setBalance(lamports / LAMPORTS_PER_SOL);
                }
            } catch (error) {
                console.error('Error fetching balance:', error);
                if (isMounted) {
                    setBalance(null);
                }
            }
        };

        fetchBalance();

        // Optional: Set up balance auto-refresh
        const intervalId = setInterval(fetchBalance, 1000);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, [publicKey, connection]);

    return (
        <div className="flex items-center gap-4">
            {publicKey && (
                <div className="flex items-center gap-4">
                    <div className="text-sm font-mono">
                        {publicKey.toBase58().slice(0, 4)}...
                        {publicKey.toBase58().slice(-4)}
                    </div>
                    {balance !== null && (
                        <div className="text-sm font-mono">
                            {balance.toFixed(2)} SOL
                        </div>
                    )}
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
