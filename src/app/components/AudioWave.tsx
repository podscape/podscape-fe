'use client';
export const AudioWave = () => {
    return (
        <div className="flex items-center justify-center h-32 gap-1">
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="w-1 bg-[var(--primary)] rounded-full animate-waveform"
                    style={{
                        height: '100%',
                        animationDelay: `${i * 0.1}s`,
                        opacity: 0.7 + (i % 3) * 0.1
                    }}
                />
            ))}
        </div>
    );
};
