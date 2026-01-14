import React from 'react';

const TextViewer = ({ content, currentTheme }) => {
    return (
        <div className={`p-6 font-mono text-sm whitespace-pre-wrap bg-black ${currentTheme.accent} min-h-full`}>
            {content}
        </div>
    );
};

export default TextViewer;
