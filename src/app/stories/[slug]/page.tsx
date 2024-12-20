import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// This would typically come from your database or CMS
const STORIES_DATA = {
    "future-of-web3": {
        title: "The Future of Web3",
        description: "Exploring the decentralized future and how blockchain is reshaping our digital interactions.",
        content: "Full podcast content would go here...",
        imageUrl: "/api/placeholder/1200/600",
        duration: "45:30",
        date: "2024-03-20"
    },
    "solana-development": {
        title: "Solana Development Journey",
        description: "A deep dive into building on Solana and the challenges faced by modern blockchain developers.",
        content: "Full podcast content would go here...",
        imageUrl: "/api/placeholder/1200/600",
        duration: "38:15",
        date: "2024-03-15"
    },
    "nft-revolution": {
        title: "NFT Revolution",
        description: "Understanding the impact of NFTs on digital ownership and the creator economy.",
        content: "Full podcast content would go here...",
        imageUrl: "/api/placeholder/1200/600",
        duration: "42:20",
        date: "2024-03-10"
    }
} as const;

type Params = {
    params: {
        slug: string;
    };
};

export function generateStaticParams() {
    return Object.keys(STORIES_DATA).map((slug) => ({
        slug,
    }));
}

export default function StoryPage({ params }: Params) {
    const story = STORIES_DATA[params.slug as keyof typeof STORIES_DATA];

    if (!story) {
        notFound();
    }

    return (
        <div className="min-h-[calc(100vh-64px)] py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center text-purple-500 hover:text-purple-600 mb-8 transition-colors"
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

                <article className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-xl">
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
                        <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                            <time dateTime={story.date}>{story.date}</time>
                            <span>•</span>
                            <span>{story.duration}</span>
                        </div>

                        <h1 className="text-3xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">
                            {story.title}
                        </h1>

                        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
                            {story.description}
                        </p>

                        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6">
                            <div className="flex items-center justify-between">
                                <button className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-6 py-2 flex items-center gap-2 transition-colors">
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                    Play Episode
                                </button>
                                <div className="text-zinc-500 dark:text-zinc-400">
                                    {story.duration}
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
