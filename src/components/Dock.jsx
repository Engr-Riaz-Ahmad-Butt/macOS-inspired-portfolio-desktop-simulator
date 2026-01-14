import React from 'react';

const Dock = ({ dockApps, windows, handleDockClick, currentTheme }) => {
    return (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <div className={`bg-black bg-opacity-90 backdrop-blur-xl ${currentTheme.border} border rounded-lg px-2 py-2 shadow-2xl ${currentTheme.shadow} flex items-end gap-1`}>
                {dockApps.map(app => (
                    <div
                        key={app.id}
                        className="relative group cursor-pointer"
                        onClick={() => handleDockClick(app)}
                    >
                        <div className={`w-14 h-14 flex items-center justify-center bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg transition-all duration-200 hover:scale-110 hover:-translate-y-2 ${currentTheme.border} border hover:${currentTheme.shadow}`}>
                            <app.icon size={28} className={currentTheme.accent} strokeWidth={1.5} />
                        </div>
                        {windows.some(w => w.type === app.id) && (
                            <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 ${currentTheme.accentBg.replace('bg-', 'bg-')} rounded-full shadow-lg`} />
                        )}
                        <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 ${currentTheme.accent} text-xs px-2 py-1 rounded whitespace-nowrap ${currentTheme.border} border shadow-lg`}>
                            {app.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dock;
