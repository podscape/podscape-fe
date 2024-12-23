import Image from "next/image";
import Link from "next/link";
import AudioPlayer from "./AudioPlayer";
import React from "react";

export default function StoryPage() {
    const story = {
        title: "Schizo terminal",
        description: "Join Synthetic Mind as we dive into the world of decentralized autonomous AI agents, exploring groundbreaking advancements in the field of AI technology. In this episode, we feature Schizo, the first of its kind, built on Gaia, known for its fragmented mind and unified chaos. Discover how this decentralized AI is pushing the boundaries of what’s possible, transforming the landscape of AI innovation. With intriguing insights and tough questions, this episode promises to reshape your understanding of the future of AI.",
        audioSrc: "/audio/future-of-web3.mp3",
        vttSrc: "/audio/future-of-web3.vtt",
        imageUrl: "/schizo.jpg",
        duration: "3:20",
        date: "2024-12-23",
    };

    return (
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
    );
}
