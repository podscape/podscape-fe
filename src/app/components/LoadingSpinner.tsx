import React from 'react';

export function NeonSpinner() {
    return (
        <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-transparent border-t-[#ff2d55] border-r-[#b829dd] rounded-full animate-neon-spin"></div>
            <div className="absolute inset-0 border-4 border-transparent border-b-[#0ff] border-l-[#b829dd] rounded-full animate-neon-spin-reverse"></div>
        </div>
    );
}

export function WaveformSpinner() {
    return (
        <div className="flex items-center gap-1 h-8">
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className="w-1 bg-gradient-to-t from-[#ff2d55] to-[#0ff] animate-waveform"
                    style={{
                        animationDelay: `${i * 0.1}s`,
                        height: '100%'
                    }}
                ></div>
            ))}
        </div>
    );
}

export function HexagonSpinner() {
    return (
        <div className="relative w-16 h-16">
            <div className="absolute inset-0">
                <svg viewBox="0 0 100 100" className="w-full h-full animate-hex-rotate">
                    <polygon
                        points="50 3,91 25,91 75,50 97,9 75,9 25"
                        fill="none"
                        stroke="url(#hex-gradient)"
                        strokeWidth="3"
                        className="animate-hex-dash"
                    />
                    <defs>
                        <linearGradient id="hex-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ff2d55" />
                            <stop offset="50%" stopColor="#b829dd" />
                            <stop offset="100%" stopColor="#0ff" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
}
