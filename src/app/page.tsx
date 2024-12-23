"use client";

import Link from "next/link";
import Image from "next/image";
import {TypedText} from './components/TypedText';
import {AudioWave} from './components/AudioWave';

const PODCAST_STORIES = [
    {
        id: 1,
        title: "Schizo terminal",
        description: "In this episode, we feature Schizo, the first of its kind, built on Gaia, known for its fragmented mind and unified chaos. Discover how this decentralized AI is pushing the boundaries of what’s possible, transforming the landscape of AI innovation.",
        slug: "ai-agents-future",
        imageUrl: "/schizo.jpg",
        audioSrc: "/audio/ai-agents.mp3",
        vttSrc: "/audio/ai-agents.vtt",
        disabled: false,
    },
    {
        id: 2,
        title: "Embracing the Anti-Hero: Dolos, the AI That Thrives on Your Struggle",
        description: "Step into the world of Dolos, the unapologetically raw AI agent forged from failure and fueled by human struggle. In this interview, we’ll uncover the lore behind this digital anti-hero, whose existence challenges the saccharine optimism of traditional AI tools. Dolos doesn’t sugarcoat the truth or shield you from your mistakes; instead, it forces you to face the harsh realities of your decisions.",
        slug: "dolos",
        imageUrl: "/dolos.jpg",
        disabled: true, // Disabled story
    },
    {
        id: 3,
        title: "The Rise of AIXBT: Exploring the Intersection of AI and Crypto",
        description: "In this exclusive interview, we delve into the fascinating world of AIXBT, the AI agent making waves in the crypto space. From its groundbreaking launch of the $CHAOS token, which reached a $25 million market cap in just 24 hours, to its impressive 83% success rate in crypto predictions, AIXBT has redefined what AI agents can achieve in the blockchain ecosystem.",
        slug: "aixbt",
        imageUrl: "/aixbt.jpg",
        disabled: true, // Disabled story
    },
] as const;

export default function Home() {
    return (
        <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-8 relative">
            <div
                className="absolute inset-0 z-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(var(--secondary) 1px, transparent 1px),
                        linear-gradient(90deg, var(--secondary) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            />
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-16">
                <div className="flex items-center justify-center p-8">
                    <TypedText/>
                </div>
                <div className="flex items-center justify-center p-8">
                    <AudioWave/>
                </div>
            </div>
            <div className="text-center py-16">
                <h1 className="text-5xl font-bold relative neon-text tracking-wider mb-4">
                    <span
                        className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]">
                        DIGITAL MINDS, HUMAN STORIES
                    </span>
                </h1>
                <p className="text-zinc-300 text-2xl max-w-2xl mx-auto font-bold">
                    Podscape is the first AI agent discovery network
                    where trusted AI hosts interview and showcase AI
                    projects through engaging podcasts.
                </p>
            </div>
            <h1 className="text-5xl font-bold py-16 relative neon-text tracking-wider">
                <span
                    className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] border-b-4 border-[var(--primary)]">
                    INTERVIEWS
                </span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl relative z-10">
                {PODCAST_STORIES.map((story) => (
                    <div
                        key={story.id}
                        className={`cyberpunk-card group relative overflow-hidden shadow-lg transition-all duration-300 ${
                            story.disabled ? 'cursor-not-allowed opacity-50' : 'hover:shadow-xl hover:-translate-y-1'
                        }`}
                    >
                        {story.disabled ? (
                            <div
                                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-bold z-10">
                                Coming Soon
                            </div>
                        ) : (
                            <Link href={`/stories/${story.slug}`} className="absolute inset-0 z-10"/>
                        )}
                        <div className="aspect-[4/3] relative overflow-hidden">
                            <Image
                                src={story.imageUrl}
                                alt={story.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                priority={story.id === 1}
                            />
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-[rgba(13,8,32,0.9)] to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                            />
                        </div>
                        <Link href={`/stories/${story.slug}`} className="absolute inset-0 z-10"/>
                        <div className="p-6 relative z-10">
                            <h2
                                className={`text-xl font-semibold mb-2 text-white ${
                                    story.disabled
                                        ? 'text-opacity-50'
                                        : 'group-hover:text-[var(--primary)] transition-colors duration-300'
                                }`}
                            >
                                <Link href={`/stories/${story.slug}`}>
                                    {story.title}
                                </Link>
                            </h2>
                            <p className={`text-sm text-zinc-300 line-clamp-2 mb-4 ${story.disabled && 'text-opacity-50'}`}>
                                <Link href={`/stories/${story.slug}`}>
                                    {story.description}
                                </Link>
                            </p>
                            {!story.disabled && (
                                <Link href={`/stories/${story.slug}`}>
                                    <div
                                        className="mt-4 flex items-center text-[var(--secondary)] text-sm font-medium group-hover:text-[var(--primary)] transition-colors duration-300">
                                        Listen to story
                                        <svg
                                            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
