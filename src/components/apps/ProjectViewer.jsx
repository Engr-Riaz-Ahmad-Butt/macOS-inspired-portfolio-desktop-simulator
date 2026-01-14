import React from 'react';

const ProjectViewer = ({ project, currentTheme }) => {
    return (
        <div className="p-8 bg-gradient-to-br from-gray-900 to-black min-h-full">
            <div className="text-6xl mb-6 text-center">{project.image}</div>
            <h2 className={`text-2xl font-bold mb-4 text-center ${currentTheme.accent}`}>{project.name}</h2>
            <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto text-center">{project.description}</p>
        </div>
    );
};

export default ProjectViewer;
