'use client';

import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import WalletContextProvider from "../providers/WalletProvider";
import WalletConnect from "./WalletConnect";
import { ThemeSwitcher } from './ThemeSwitcher';

export function ClientWrapper({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            {mounted && (
                <WalletContextProvider>
                    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-white/[0.08]"
                            style={{
                                background: 'rgba(var(--bg-gradient-3), 0.8)'
                            }}>
                        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                            <Link href="/" className="font-bold text-lg text-[var(--secondary)] hover:text-[var(--primary)] transition-colors">
                                Podscape AI
                            </Link>
                            <div className="flex items-center gap-4">
                                <ThemeSwitcher />
                                <WalletConnect />
                            </div>
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
