'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { WaveformSpinner } from '../../components/LoadingSpinner';

interface VTTCue {
    startTime: number;
    endTime: number;
    text: string;
    speaker: string;
}

interface GroupedCue {
    speaker: string;
    segments: {
        text: string;
        startTime: number;
        endTime: number;
    }[];
}

interface AudioPlayerProps {
    audioSrc: string;
    vttSrc: string;
}

const AudioWave = ({ isPlaying }) => {
    return (
        <div className="flex items-center gap-1">
            {[...Array(12)].map((_, i) => (
                <div
                    key={i}
                    className={`w-0.5 bg-gradient-to-t from-[var(--gradient-start)] to-[var(--gradient-end)] rounded-full opacity-50 transition-all duration-300`}
                    style={{
                        animation: isPlaying ? `wave 1s ease-in-out infinite ${i * 0.05}s` : 'none',
                        height: isPlaying ? '16px' : '4px'
                    }}
                />
            ))}
            <style jsx>{`
                @keyframes wave {
                    0%, 100% { height: 4px; }
                    50% { height: 16px; }
                }
            `}</style>
        </div>
    );
};

export default function AudioPlayer({ audioSrc, vttSrc }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [cues, setCues] = useState<VTTCue[]>([]);
    const [currentCue, setCurrentCue] = useState<VTTCue | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const transcriptRef = useRef<HTMLDivElement>(null);

    const groupedCues = useMemo(() => {
        const groups: GroupedCue[] = [];
        let currentGroup: GroupedCue | null = null;

        cues.forEach((cue) => {
            if (!currentGroup || currentGroup.speaker !== cue.speaker) {
                currentGroup = {
                    speaker: cue.speaker,
                    segments: []
                };
                groups.push(currentGroup);
            }

            currentGroup.segments.push({
                text: cue.text,
                startTime: cue.startTime,
                endTime: cue.endTime
            });
        });

        return groups;
    }, [cues]);

    useEffect(() => {
        const fetchVTT = async () => {
            try {
                const response = await fetch(vttSrc);
                if (!response.ok) {
                    throw new Error(`Failed to load VTT file: ${response.status} ${response.statusText}`);
                }
                const text = await response.text();
                const parsedCues = parseVTT(text);
                setCues(parsedCues);
                setIsLoading(false);
            } catch (error) {
                console.error('Error loading VTT file:', error);
                setIsLoading(false);
            }
        };

        fetchVTT();
    }, [vttSrc]);

    const parseVTT = (vttContent: string): VTTCue[] => {
        const lines = vttContent.split('\n');
        const cues: VTTCue[] = [];
        let currentCue: Partial<VTTCue> = {};

        let startIndex = lines.findIndex(line => line.trim() === 'WEBVTT') + 1;
        if (startIndex === 0) startIndex = 0;

        for (let i = startIndex; i < lines.length; i++) {
            const line = lines[i].trim();

            if (line.includes('-->')) {
                const [startStr, endStr] = line.split('-->').map(t => t.trim());
                const [startHours, startMinutes, startSeconds] = startStr.split(':').map(Number);
                const [endHours, endMinutes, endSeconds] = endStr.split(':').map(Number);

                const startTime = startHours * 3600 + startMinutes * 60 + parseFloat(String(startSeconds));
                const endTime = endHours * 3600 + endMinutes * 60 + parseFloat(String(endSeconds));

                currentCue = { startTime, endTime };
            } else if (line.startsWith('SPEAKER:')) {
                currentCue.speaker = line.replace('SPEAKER:', '').trim();
            } else if (line && currentCue.startTime !== undefined && currentCue.speaker) {
                currentCue.text = line;
                cues.push(currentCue as VTTCue);
                currentCue = {};
            }
        }

        return cues;
    };

    useEffect(() => {
        if (!audioRef.current) return;

        const audio = audioRef.current;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
            const activeCue = cues.find(
                cue => audio.currentTime >= cue.startTime && audio.currentTime <= cue.endTime
            );

            if (activeCue !== currentCue) {
                setCurrentCue(activeCue || null);
                if (activeCue && transcriptRef.current) {
                    const cueElement = transcriptRef.current.querySelector(`[data-time="${activeCue.startTime}"]`);
                    cueElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
            setIsLoading(false);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
            setCurrentCue(null);
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleError = () => {
            const error = audio.error;
            let errorMessage = 'An error occurred while loading the audio.';

            if (error) {
                switch (error.code) {
                    case MediaError.MEDIA_ERR_ABORTED:
                        errorMessage = 'You aborted the audio playback.';
                        break;
                    case MediaError.MEDIA_ERR_NETWORK:
                        errorMessage = 'A network error occurred while loading the audio.';
                        break;
                    case MediaError.MEDIA_ERR_DECODE:
                        errorMessage = 'The audio format is not supported by your browser.';
                        break;
                    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                        errorMessage = 'The audio format or file is not supported.';
                        break;
                }
            }

            setError(errorMessage);
            setIsLoading(false);
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('error', handleError);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('error', handleError);
        };
    }, [cues, currentCue]);

    const togglePlayback = async () => {
        if (!audioRef.current) return;

        try {
            if (isPlaying) {
                await audioRef.current.pause();
            } else {
                await audioRef.current.play();
            }
        } catch (error) {
            console.error('Playback error:', error);
        }
    };

    const getProgress = () => {
        if (!duration) return 0;
        return Math.floor((currentTime / duration) * 100);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (isLoading) {
        return <div className="flex justify-center items-center p-6">
            <WaveformSpinner />
        </div>;
    }

    if (error) {
        return (
            <div className="bg-[rgba(0,0,0,0.3)] rounded-xl p-6">
                <div className="text-red-500 text-center">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[rgba(0,0,0,0.3)] rounded-xl p-6">
            <audio
                ref={audioRef}
                preload="metadata"
            >
                <source src={audioSrc} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={togglePlayback}
                    className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] hover:from-[var(--primary)] hover:to-[var(--primary)] text-white rounded-lg px-6 py-2 flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-[var(--primary)]/20"
                >
                    {isPlaying ? (
                        <>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                            Pause
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            Play
                        </>
                    )}
                </button>

                <div className="flex items-center gap-4">
                    <AudioWave isPlaying={isPlaying} />
                    <span className="text-zinc-400">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                </div>
            </div>

            <div className="relative flex items-center">
                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={(e) => {
                        const time = parseFloat(e.target.value);
                        if (audioRef.current) {
                            audioRef.current.currentTime = time;
                            setCurrentTime(time);
                        }
                    }}
                    className="w-full h-1 accent-[var(--primary)] bg-[rgba(255,255,255,0.1)] rounded-full appearance-none cursor-pointer"
                    style={{
                        background: `linear-gradient(to right, var(--gradient-start) 0%, var(--gradient-end) ${getProgress()}%, rgba(255,255,255,0.1) ${getProgress()}%, rgba(255,255,255,0.1) 100%)`
                    }}
                />
            </div>

            <div
                ref={transcriptRef}
                className="mt-8 h-96 overflow-y-auto p-6 bg-[rgba(0,0,0,0.2)] rounded-xl"
            >
                {groupedCues.map((group, groupIndex) => (
                    <div
                        key={groupIndex}
                        className="mb-8"
                    >
                        <div className="font-semibold text-[var(--secondary)] mb-2 synth-speaker">
                            {group.speaker}:
                        </div>
                        <p className="text-zinc-300 leading-relaxed">
                            {group.segments.map((segment, segmentIndex) => (
                                <span
                                    key={segmentIndex}
                                    data-time={segment.startTime}
                                    className={`inline transition-all duration-300 ${
                                        currentCue &&
                                        currentCue.startTime === segment.startTime
                                            ? 'text-[var(--primary)]'
                                            : ''
                                    }`}
                                >
                                    {segment.text}
                                    {segmentIndex < group.segments.length - 1 ? ' ' : ''}
                                </span>
                            ))}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
