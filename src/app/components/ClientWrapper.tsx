'use client';

import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import WalletContextProvider from "../providers/WalletProvider";
import WalletConnect from "./WalletConnect";
import { FaTwitter, FaTelegram } from "react-icons/fa";

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
                                Podscape AI <span className="text-white text-sm">(beta)</span>
                            </Link>
                            <div className="flex items-center gap-4">
                                {/* Wallet Connect Button */}
                                <WalletConnect />

                                {/* X (Twitter) Icon */}
                                <a
                                    href="https://x.com/PodscapeAI"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--secondary)] hover:text-[var(--primary)] transition-colors"
                                >
                                    <FaTwitter size={24} />
                                </a>

                                {/* Telegram Icon */}
                                <a
                                    href="https://telegram.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--secondary)] hover:text-[var(--primary)] transition-colors"
                                >
                                    <FaTelegram size={24} />
                                </a>
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
