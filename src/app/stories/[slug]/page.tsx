import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AudioPlayer from "./AudioPlayer";

type Segment = {
    readonly speaker: "Synthetic Mind" | "AIXBT";
    readonly text: string;
};

type Story = {
    readonly title: string;
    readonly description: string;
    readonly content: readonly Segment[];
    readonly imageUrl: string;
    readonly duration: string;
    readonly date: string;
};

// Common interview content that will be shared across all stories
const COMMON_INTERVIEW_CONTENT = [
    {
        speaker: "Synthetic Mind",
        text: "So, let's dive right in. I'm really excited to talk to you today about AIXBT and what you guys are doing in the crypto space. Before we dive into all the specifics, can you tell me what initially sparked your interest in creating an AI agent like AIXBT?"
    },
    {
        speaker: "AIXBT",
        text: "You know, I've been involved in the crypto space for a while, and I've always been fascinated by the potential of AI to analyze and make sense of the vast amounts of data that flow through it. I was talking to some of my friends who were into trading and investing, and they were always looking for ways to get an edge in the market. That's when it hit me—what if we could create an AI agent that could help people make better investment decisions by analyzing market trends and providing actionable insights?"
    },
    {
        speaker: "AIXBT",
        text: "That's when the idea for AIXBT was born. We started by building a platform that could ingest data from a wide range of sources and then use machine learning algorithms to identify patterns and make predictions about market movements. And from there, it just grew. We realized that we could use this technology to not just help traders and investors but also to provide a new level of transparency and accountability in the crypto space."
    },
    {
        speaker: "Synthetic Mind",
        text: "It sounds like the spark for AIXBT was really about filling a need in the market and giving people an edge in making informed investment decisions. I'm curious, how did you and your team approach building this AI agent, and what were some of the biggest technical challenges you faced in getting it up and running?"
    },
    {
        speaker: "AIXBT",
        text: "So, building AIXBT was a true team effort. We assembled a group of talented engineers and data scientists who were experts in AI, machine learning, and natural language processing. Our goal was to create an agent that could not only analyze market data but also communicate its findings in a clear and actionable way."
    }
] as const;

const STORIES_DATA: Readonly<Record<string, Story>> = {
    "future-of-web3": {
        title: "The Future of Web3",
        description: "Exploring the decentralized future and how blockchain is reshaping our digital interactions.",
        content: COMMON_INTERVIEW_CONTENT,
        imageUrl: "/podcast-web3.svg",
        duration: "45:30",
        date: "2024-03-20"
    },
    "solana-development": {
        title: "Solana Development Journey",
        description: "A deep dive into building on Solana and the challenges faced by modern blockchain developers.",
        content: COMMON_INTERVIEW_CONTENT,
        imageUrl: "/podcast-solana.svg",
        duration: "38:15",
        date: "2024-03-15"
    },
    "nft-revolution": {
        title: "NFT Revolution",
        description: "Understanding the impact of NFTs on digital ownership and the creator economy.",
        content: COMMON_INTERVIEW_CONTENT,
        imageUrl: "/podcast-nft.svg",
        duration: "42:20",
        date: "2024-03-10"
    }
} as const;

interface Props {
    params: {
        slug: string;
    }
}

export function generateStaticParams() {
    return Object.keys(STORIES_DATA).map((slug) => ({
        slug,
    }));
}

export function generateMetadata({ params }: Props) {
    const story = STORIES_DATA[params.slug as keyof typeof STORIES_DATA];

    return {
        title: story?.title ?? 'Story Not Found',
        description: story?.description,
    };
}

export default function StoryPage({ params }: Props) {
    const story = STORIES_DATA[params.slug as keyof typeof STORIES_DATA];

    if (!story) {
        notFound();
    }

    return (
        <div className="min-h-[calc(100vh-64px)] py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center text-[#0ff] hover:text-[#ff2d55] mb-8 transition-colors"
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
                    Back to Stories
                </Link>

                <article className="bg-[rgba(13,8,32,0.8)] backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-[rgba(255,255,255,0.1)]">
                    <div className="aspect-[2/1] relative">
                        <Image
                            src={story.imageUrl}
                            alt={story.title}
                            fill
                            sizes="(max-width: 1536px) 100vw, 1536px"
                            priority
                            className="object-cover"
                        />
                    </div>

                    <div className="p-8">
                        <div className="flex items-center gap-4 text-sm text-zinc-400 mb-4">
                            <time dateTime={story.date}>{story.date}</time>
                            <span>•</span>
                            <span>{story.duration}</span>
                        </div>

                        <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#ff2d55] to-[#b829dd]">
                            {story.title}
                        </h1>

                        <p className="text-lg text-zinc-300 mb-8">
                            {story.description}
                        </p>

                        <AudioPlayer content={story.content} />

                        <div className="mt-8 h-96 overflow-y-auto p-6 bg-[rgba(0,0,0,0.2)] rounded-xl">
                            {story.content.map((segment, index) => (
                                <div key={index} className="mb-6" data-timestamp={index}>
                                    <div className="font-semibold text-[#0ff] mb-2">
                                        {segment.speaker}:
                                    </div>
                                    <p className="text-zinc-300">
                                        {segment.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
