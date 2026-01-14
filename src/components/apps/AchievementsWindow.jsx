import React from 'react';

const AchievementsWindow = ({ achievements, achievementsList, currentTheme }) => {
    return (
        <div className="p-8 bg-gradient-to-br from-gray-900 to-black min-h-full">
            <h1 className={`text-3xl font-bold ${currentTheme.accent} mb-8 text-center`}>ACHIEVEMENTS</h1>
            <div className="max-w-2xl mx-auto space-y-3">
                {achievementsList.map(achievement => (
                    <div
                        key={achievement.id}
                        className={`p-4 rounded-lg border transition-all ${achievements[achievement.id] ? `bg-gray-800/80 ${currentTheme.border}` : 'bg-gray-900/50 border-gray-700'
                            }`}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-xl">{achievements[achievement.id] ? '✓' : '•'}</span>
                            <span className={`text-lg font-semibold ${achievements[achievement.id] ? currentTheme.accent : 'text-gray-600'}`}>
                                {achievement.name}
                            </span>
                        </div>
                        <div className={`ml-8 text-sm ${achievements[achievement.id] ? 'text-gray-400' : 'text-gray-700'}`}>
                            {achievements[achievement.id] ? achievement.description : '???'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AchievementsWindow;
