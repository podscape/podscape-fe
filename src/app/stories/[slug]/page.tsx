import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AudioPlayer from "./AudioPlayer";
import React from "react";
import Head from "next/head";

type Story = {
    readonly title: string;
    readonly description: string;
    readonly audioSrc: string;
    readonly vttSrc: string;
    readonly imageUrl: string;
    readonly duration: string;
    readonly date: string;
};

const STORIES_DATA: Readonly<Record<string, Story>> = {
    "future-of-web3": {
        title: "The Future of Web3",
        description: "Exploring the decentralized future and how blockchain is reshaping our digital interactions.",
        audioSrc: "/audio/future-future-of-web3.mp3",
        vttSrc: "/audio/future-of-web3.vtt",
        imageUrl: "/podcast-web3.svg",
        duration: "45:30",
        date: "2024-03-20"
    },
    "solana-development": {
        title: "Solana Development Journey",
        description: "A deep dive into building on Solana and the challenges faced by modern blockchain developers.",
        audioSrc: "/audio/future-of-web3.mp3",
        vttSrc: "/audio/future-of-web3.vtt",
        imageUrl: "/podcast-solana.svg",
        duration: "38:15",
        date: "2024-03-15"
    },
    "nft-revolution": {
        title: "NFT Revolution",
        description: "Understanding the impact of NFTs on digital ownership and the creator economy.",
        audioSrc: "/audio/future-of-web3.mp3",
        vttSrc: "/audio/future-of-web3.vtt",

        imageUrl: "/podcast-nft.svg",
        duration: "42:20",
        date: "2024-03-10"
    }
} as const;

export async function generateStaticParams() {
    return Object.keys(STORIES_DATA).map((slug) => ({
        slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const story = STORIES_DATA[params.slug as keyof typeof STORIES_DATA];

    if (!story) {
        return {
            title: 'Story Not Found',
        };
    }

    return {
        title: `${story.title} | Podscape AI`,
        description: story.description,
        openGraph: {
            title: story.title,
            description: story.description,
            images: [story.imageUrl],
        },
    };
}

export default async function StoryPage({ params }: { params: { slug: string } }) {
    const story = STORIES_DATA[params.slug as keyof typeof STORIES_DATA];

    if (!story) {
        notFound();
    }

    return (
        <>
            <Head>
                <link
                    rel="preload"
                    href={story.audioSrc}
                    as="audio"
                    type="audio/mpeg"
                />
                <link
                    rel="preload"
                    href={story.vttSrc}
                    as="fetch"
                    crossOrigin="anonymous"
                />
            </Head>

            <div className="min-h-[calc(100vh-64px)] py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/"
                        className="inline-flex items-center text-[var(--secondary)] hover:text-[var(--primary)] mb-8 transition-colors neon-text"
                    >
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Back to Home
                    </Link>

                    <article className="bg-[rgba(13,8,32,0.8)] backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-[rgba(255,255,255,0.1)] synth-container">
                        <div className="aspect-[2/1] relative">
                            <Image
                                src={story.imageUrl}
                                alt={story.title}
                                fill
                                sizes="(max-width: 1536px) 100vw, 1536px"
                                priority
                                className="object-cover"
                            />
                            <div className="absolute inset-0 synth-overlay opacity-0 transition-opacity duration-300" />
                        </div>

                        <div className="p-8">
                            <div className="flex items-center gap-4 text-sm text-zinc-400 mb-4">
                                <time dateTime={story.date}>{story.date}</time>
                                <span>•</span>
                                <span>{story.duration}</span>
                            </div>

                            <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] synth-glitch">
                                {story.title}
                            </h1>

                            <p className="text-lg text-zinc-300 mb-8 synth-text">
                                {story.description}
                            </p>

                            <AudioPlayer
                                audioSrc={story.audioSrc}
                                vttSrc={story.vttSrc}
                            />
                        </div>
                    </article>
                </div>
            </div>
        </>
    );
}
