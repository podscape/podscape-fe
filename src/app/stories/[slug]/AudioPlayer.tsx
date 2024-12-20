'use client';

import { useState, useEffect, useRef } from 'react';

type Segment = {
    readonly speaker: string;
    readonly text: string;
};

interface AudioPlayerProps {
    content: readonly Segment[];
}

export default function AudioPlayer({ content }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSegment, setCurrentSegment] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    // Simulate audio playback with text highlighting
    useEffect(() => {
        if (isPlaying) {
            if (currentSegment >= content.length) {
                setIsPlaying(false);
                setCurrentSegment(0);
                return;
            }

            // Scroll to current segment
            const element = document.querySelector(`[data-timestamp="${currentSegment}"]`);
            element?.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Highlight current segment
            const segments = document.querySelectorAll('[data-timestamp]');
            segments.forEach((seg) => {
                seg.classList.remove('playing');
            });
            element?.classList.add('playing');

            // Move to next segment after delay (simulating audio playback)
            const wordCount = content[currentSegment].text.split(' ').length;
            const readingTime = wordCount * 300; // 300ms per word

            timeoutRef.current = setTimeout(() => {
                setCurrentSegment(prev => prev + 1);
            }, readingTime);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [isPlaying, currentSegment, content]);

    const togglePlayback = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="bg-[rgba(0,0,0,0.3)] rounded-xl p-6">
            <div className="flex items-center justify-between">
                <button
                    onClick={togglePlayback}
                    className="bg-gradient-to-r from-[#ff2d55] to-[#b829dd] hover:from-[#ff2d55] hover:to-[#ff2d55] text-white rounded-lg px-6 py-2 flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-[#ff2d55]/20"
                >
                    {isPlaying ? (
                        <>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                            Pause Episode
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            Play Episode
                        </>
                    )}
                </button>

                <div className="text-zinc-400">
                    {Math.floor(currentSegment / content.length * 100)}% Complete
                </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4 h-1 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-[#ff2d55] to-[#b829dd] transition-all duration-300"
                    style={{ width: `${(currentSegment / content.length) * 100}%` }}
                />
            </div>
        </div>
    );
}
