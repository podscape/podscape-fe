import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.scss";
import { ClientWrapper } from "./components/ClientWrapper";

const tiemposText = localFont({
    src: [
        {
            path: '../../public/fonts/TestTiemposText-Regular-BF66457a50cd521.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../public/fonts/TestTiemposText-RegularItalic-BF66457a50421c2.woff2',
            weight: '400',
            style: 'italic',
        },
        {
            path: '../../public/fonts/TestTiemposText-Medium-BF66457a508489a.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../public/fonts/TestTiemposText-MediumItalic-BF66457a508d6d9.woff2',
            weight: '500',
            style: 'italic',
        },
        {
            path: '../../public/fonts/TestTiemposText-Semibold-BF66457a4fed201.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../../public/fonts/TestTiemposText-SemiboldItalic-BF66457a505477c.woff2',
            weight: '600',
            style: 'italic',
        },
        {
            path: '../../public/fonts/TestTiemposText-Bold-BF66457a4f03c40.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../../public/fonts/TestTiemposText-BoldItalic-BF66457a50155b4.woff2',
            weight: '700',
            style: 'italic',
        }
    ],
    variable: '--font-tiempos',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "Podscape AI",
    description: "Tell me all about you",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${tiemposText.variable} font-tiempos antialiased`} suppressHydrationWarning>
        <ClientWrapper>
            {children}
        </ClientWrapper>
        </body>
        </html>
    );
}
