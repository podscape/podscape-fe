import Link from "next/link";
import Image from "next/image";

const PODCAST_STORIES = [
    {
        id: 1,
        title: "The Future of Web3",
        description: "Exploring the decentralized future and how blockchain is reshaping our digital interactions.",
        slug: "future-of-web3",
        imageUrl: "/podcast-web3.svg"  // Updated path
    },
    {
        id: 2,
        title: "Solana Development Journey",
        description: "A deep dive into building on Solana and the challenges faced by modern blockchain developers.",
        slug: "solana-development",
        imageUrl: "/podcast-solana.svg"  // Updated path
    },
    {
        id: 3,
        title: "NFT Revolution",
        description: "Understanding the impact of NFTs on digital ownership and the creator economy.",
        slug: "nft-revolution",
        imageUrl: "/podcast-nft.svg"  // Updated path
    }
] as const;

export default function Home() {
    return (
        <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-bold mb-16 relative">
                <span className="relative z-10">STORIES</span>
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-purple-500/20 -rotate-1"></span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
                {PODCAST_STORIES.map((story) => (
                    <Link
                        href={`/stories/${story.slug}`}
                        key={story.id}
                        className="group relative bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
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
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-2 text-zinc-800 dark:text-zinc-100">
                                {story.title}
                            </h2>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                                {story.description}
                            </p>

                            <div className="mt-4 flex items-center text-purple-500 text-sm font-medium">
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
                    </Link>
                ))}
            </div>
        </div>
    );
}
