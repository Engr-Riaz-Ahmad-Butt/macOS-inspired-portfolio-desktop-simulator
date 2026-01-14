import React from 'react';

const DesktopIcon = ({ icon, selectedIcon, setSelectedIcon, handleIconDoubleClick, currentTheme }) => {
    return (
        <div
            className={`absolute cursor-pointer select-none group`}
            style={{ left: icon.x, top: icon.y, maxWidth: '120px' }}
            onClick={() => setSelectedIcon(icon.id)}
            onDoubleClick={() => handleIconDoubleClick(icon)}
        >
            <div className={`flex flex-col items-center gap-1 p-2 rounded transition-all ${selectedIcon === icon.id ? `${currentTheme.accentBg} bg-opacity-40 shadow-lg ${currentTheme.shadow}` : 'hover:bg-opacity-30 hover:bg-gray-900'
                }`}>
                <icon.icon
                    size={48}
                    className={`${selectedIcon === icon.id ? currentTheme.accent : currentTheme.accent} drop-shadow-lg filter ${currentTheme.iconGlow}`}
                    strokeWidth={1.5}
                />
                <span className={`text-xs font-medium px-2 py-0.5 rounded text-center break-words w-full ${selectedIcon === icon.id ? `${currentTheme.accentBg} text-white shadow-lg ${currentTheme.shadow}` : `bg-gray-900 bg-opacity-90 ${currentTheme.accent} ${currentTheme.border} border`
                    }`}>
                    {icon.name}
                </span>
            </div>
        </div>
    );
};

export default DesktopIcon;
