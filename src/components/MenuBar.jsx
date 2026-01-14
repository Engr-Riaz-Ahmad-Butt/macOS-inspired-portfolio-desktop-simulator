import React from 'react';
import { Wifi, Battery, Clock } from 'lucide-react';

const MenuBar = ({ currentTheme, windows, activeWindow, resetAchievements, openSystemPreferences, openAchievements, newAchievementPulse, time }) => {
    return (
        <div className={`absolute top-0 left-0 right-0 h-8 bg-gradient-to-b ${currentTheme.menuBar} ${currentTheme.border} border-b flex items-center justify-between px-4 text-sm z-50 shadow-lg ${currentTheme.shadow}`}>
            <div className="flex items-center gap-4">
                <span className={`font-bold text-lg ${currentTheme.accent}`}>🐉</span>
                <div className="relative group">
                    <button className={`font-semibold ${currentTheme.accent} hover:opacity-80 transition-colors`}>
                        {activeWindow ? windows.find(w => w.id === activeWindow)?.title : 'Portfolio OS'}
                    </button>
                    <div className={`absolute top-full left-0 mt-1 hidden group-hover:block bg-gray-900 ${currentTheme.border} border rounded shadow-xl min-w-[180px] z-50`}>
                        <button
                            onClick={resetAchievements}
                            className={`w-full text-left px-4 py-2 ${currentTheme.accent} hover:bg-gray-800 transition-colors text-sm`}
                        >
                            Restart
                        </button>
                    </div>
                </div>
                <button
                    onClick={openSystemPreferences}
                    className={`text-xs ${currentTheme.accent} hover:opacity-80 px-2 py-1 rounded hover:bg-opacity-30 transition-colors`}
                >
                    System Preferences
                </button>
            </div>
            <div className={`flex items-center gap-3 ${currentTheme.accent}`}>
                <Wifi size={14} className="text-green-400" />
                <Battery size={14} className="text-green-400" />
                <button
                    onClick={openAchievements}
                    className={`hover:opacity-80 transition-all ${newAchievementPulse ? 'animate-pulse text-yellow-400' : ''}`}
                    title="Achievements"
                >
                    🏆
                </button>
                <Clock size={14} />
                <span className="text-xs font-medium">
                    {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </div>
    );
};

export default MenuBar;
