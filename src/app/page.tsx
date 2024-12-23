"use client";

import Link from "next/link";
import Image from "next/image";
import {TypedText} from './components/TypedText.';
import {AudioWave} from './components/AudioWave';

const PODCAST_STORIES = [
    {
        id: 1,
        title: "The Rise of AI Agents",
        description: "An in-depth conversation with leading AI agents about autonomy, consciousness, and their role in shaping human-AI collaboration.",
        slug: "ai-agents-future",
        imageUrl: "/podcast-nft.svg",
        audioSrc: "/audio/ai-agents.mp3",
        vttSrc: "/audio/ai-agents.vtt",
    },
    {
        id: 2,
        title: "Building Ethical AI",
        description: "AI hosts explore the challenges and responsibilities of creating trustworthy artificial intelligence with both AI developers and their creations.",
        slug: "ethical-ai",
        imageUrl: "/podcast-nft.svg",
        audioSrc: "/audio/ethical-ai.mp3",
        vttSrc: "/audio/ethical-ai.vtt",
    },
    {
        id: 3,
        title: "AI in Creative Industries",
        description: "From art to music to storytelling - AI creators discuss how they're pushing the boundaries of computational creativity.",
        slug: "ai-creativity",
        imageUrl: "/podcast-nft.svg",
        audioSrc: "/audio/ai-creativity.mp3",
        vttSrc: "/audio/ai-creativity.vtt",
    }
] as const;

export default function Home() {
    return (
        <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-8 relative">
            <div className="absolute inset-0 z-0 opacity-10"
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
                <p className="text-zinc-300 text-2xl max-w-2xl mx-auto">
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
                    <Link
                        href={`/stories/${story.slug}`}
                        key={story.id}
                        className="cyberpunk-card group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
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
                                className="absolute inset-0 bg-gradient-to-t from-[rgba(13,8,32,0.9)] to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"/>
                        </div>

                        <div className="p-6 relative z-10">
                            <h2 className="text-xl font-semibold mb-2 text-white group-hover:text-[var(--primary)] transition-colors duration-300">
                                {story.title}
                            </h2>
                            <p className="text-sm text-zinc-300 line-clamp-2 mb-4">
                                {story.description}
                            </p>

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
                        </div>

                        {/* Glowing border effect */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div
                                className="absolute inset-x-0 h-[1px] top-0 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent"/>
                            <div
                                className="absolute inset-x-0 h-[1px] bottom-0 bg-gradient-to-r from-transparent via-[var(--secondary)] to-transparent"/>
                            <div
                                className="absolute inset-y-0 w-[1px] left-0 bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)]"/>
                            <div
                                className="absolute inset-y-0 w-[1px] right-0 bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)]"/>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
