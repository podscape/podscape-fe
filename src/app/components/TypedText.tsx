'use client';
import { useState, useEffect } from "react";
export const TypedText = () => {
    const [text, setText] = useState('');
    const fullText = "Hi. I wanna know everything about you.";

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            setText(fullText.slice(0, index));
            index++;
            if (index > fullText.length) clearInterval(timer);
        }, 100);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="text-5xl font-bold text-white">{text}</div>
    );
};
