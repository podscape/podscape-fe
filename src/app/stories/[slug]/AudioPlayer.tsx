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
    const [currentWord, setCurrentWord] = useState(0);
    const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        // Initialize speech synthesis
        if (typeof window !== 'undefined') {
            speechSynthRef.current = new SpeechSynthesisUtterance();
            speechSynthRef.current.rate = 1;
            speechSynthRef.current.pitch = 1;
        }

        return () => {
            if (speechSynthRef.current) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    // Handle word-by-word playback and text-to-speech
    useEffect(() => {
        if (isPlaying && currentSegment < content.length) {
            const words = content[currentSegment].text.split(' ');

            if (currentWord === 0) {
                // Start speaking the current segment
                if (speechSynthRef.current) {
                    speechSynthRef.current.text = content[currentSegment].text;
                    window.speechSynthesis.speak(speechSynthRef.current);
                }
            }

            if (currentWord < words.length) {
                // Highlight current word
                const element = document.querySelector(`[data-segment="${currentSegment}"]`);
                if (element) {
                    const wordElements = element.querySelectorAll('.word');
                    wordElements.forEach((el, idx) => {
                        if (idx === currentWord) {
                            el.classList.add('playing');
                        } else {
                            el.classList.remove('playing');
                        }
                    });
                }

                // Move to next word after delay
                timeoutRef.current = setTimeout(() => {
                    setCurrentWord(prev => prev + 1);
                }, 300); // Adjust timing as needed
            } else {
                // Move to next segment
                setCurrentWord(0);
                setCurrentSegment(prev => prev + 1);
            }
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [isPlaying, currentSegment, currentWord, content]);

    const togglePlayback = () => {
        if (!isPlaying) {
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
            window.speechSynthesis.cancel();
        }
    };

    const getProgress = () => {
        if (currentSegment >= content.length) return 100;

        const totalWords = content.reduce((acc, segment) =>
            acc + segment.text.split(' ').length, 0);

        const wordsCompleted = content
            .slice(0, currentSegment)
            .reduce((acc, segment) =>
                acc + segment.text.split(' ').length, 0) + currentWord;

        return Math.floor((wordsCompleted / totalWords) * 100);
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
                    {getProgress()}% Complete
                </div>
            </div>

            <div className="mt-4 h-1 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-[#ff2d55] to-[#b829dd] transition-all duration-300"
                    style={{ width: `${getProgress()}%` }}
                />
            </div>
        </div>
    );
}
