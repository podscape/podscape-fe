'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const WalletContextProvider = dynamic(
    () => import("../providers/WalletProvider"),
    { ssr: false }
);

const WalletConnect = dynamic(
    () => import("./WalletConnect"),
    { ssr: false }
);

export function ClientWrapper({ children }: { children: ReactNode }) {
    return (
        <WalletContextProvider>
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-black/[.08] dark:border-white/[.08]">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="font-bold text-lg">Podscape AI</div>
                    <WalletConnect />
                </div>
            </header>
            <main className="pt-16">
                {children}
            </main>
        </WalletContextProvider>
    );
}
