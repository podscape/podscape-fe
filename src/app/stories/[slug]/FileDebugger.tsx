'use client';

import React, {useEffect, useState} from 'react';

const FileDebugger = ({ audioSrc, vttSrc }) => {
    const [audioExists, setAudioExists] = useState(false);
    const [vttExists, setVttExists] = useState(false);

    useEffect(() => {
        // Check if files exist
        const checkFiles = async () => {
            try {
                const audioResponse = await fetch(audioSrc);
                setAudioExists(audioResponse.ok);

                const vttResponse = await fetch(vttSrc);
                setVttExists(vttResponse.ok);
            } catch (error) {
                console.error('Error checking files:', error);
            }
        };

        checkFiles();
    }, [audioSrc, vttSrc]);

    return (
        <div className="p-4 bg-red-500/10 rounded-lg mb-4">
            <h3 className="font-bold mb-2">File Debug Info:</h3>
            <div>Audio file ({audioSrc}): {audioExists ? '✅' : '❌'}</div>
            <div>VTT file ({vttSrc}): {vttExists ? '✅' : '❌'}</div>
        </div>
    );
};

export default FileDebugger;
