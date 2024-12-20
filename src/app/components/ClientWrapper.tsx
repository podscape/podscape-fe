'use client';

import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import WalletContextProvider from "../providers/WalletProvider";
import WalletConnect from "./WalletConnect";

export function ClientWrapper({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            {mounted && (
                <WalletContextProvider>
                    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-black/[.08] dark:border-white/[.08]">
                        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                            <Link href="/" className="font-bold text-lg hover:text-[#ff2d55] transition-colors">
                                Podscape AI
                            </Link>
                            <WalletConnect />
                        </div>
                    </header>
                    <main className="pt-16">
                        {children}
                    </main>
                </WalletContextProvider>
            )}
        </>
    );
}
