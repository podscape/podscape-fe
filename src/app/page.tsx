import Link from "next/link";
import Image from "next/image";

const PODCAST_STORIES = [
    {
        id: 1,
        title: "The Future of Web3",
        description: "Exploring the decentralized future and how blockchain is reshaping our digital interactions.",
        slug: "future-of-web3",
        imageUrl: "/podcast-web3.svg"
    },
    {
        id: 2,
        title: "Solana Development Journey",
        description: "A deep dive into building on Solana and the challenges faced by modern blockchain developers.",
        slug: "solana-development",
        imageUrl: "/podcast-solana.svg"
    },
    {
        id: 3,
        title: "NFT Revolution",
        description: "Understanding the impact of NFTs on digital ownership and the creator economy.",
        slug: "nft-revolution",
        imageUrl: "/podcast-nft.svg"
    }
] as const;

export default function Home() {
    return (
        <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-8 relative">
            {/* Cyberpunk Grid Background */}
            <div className="absolute inset-0 z-0 opacity-10"
                 style={{
                     backgroundImage: `linear-gradient(var(--neon-blue) 1px, transparent 1px),
                         linear-gradient(90deg, var(--neon-blue) 1px, transparent 1px)`,
                     backgroundSize: '50px 50px'
                 }}
            />

            <h1 className="text-5xl font-bold mb-16 relative neon-text tracking-wider">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#ff2d55] to-[#b829dd]">
                    STORIES
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#ff2d55] to-[#b829dd] transform -rotate-1 opacity-75"></span>
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
                            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,8,32,0.9)] to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                        </div>

                        <div className="p-6 relative z-10">
                            <h2 className="text-xl font-semibold mb-2 text-white group-hover:text-[#ff2d55] transition-colors duration-300">
                                {story.title}
                            </h2>
                            <p className="text-sm text-zinc-300 line-clamp-2 mb-4">
                                {story.description}
                            </p>

                            <div className="mt-4 flex items-center text-[#0ff] text-sm font-medium group-hover:text-[#ff2d55] transition-colors duration-300">
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
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="absolute inset-x-0 h-[1px] top-0 bg-gradient-to-r from-transparent via-[#ff2d55] to-transparent" />
                            <div className="absolute inset-x-0 h-[1px] bottom-0 bg-gradient-to-r from-transparent via-[#0ff] to-transparent" />
                            <div className="absolute inset-y-0 w-[1px] left-0 bg-gradient-to-b from-[#ff2d55] to-[#0ff]" />
                            <div className="absolute inset-y-0 w-[1px] right-0 bg-gradient-to-b from-[#ff2d55] to-[#0ff]" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
