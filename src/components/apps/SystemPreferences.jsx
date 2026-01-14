import React, { useState } from 'react';

const SystemPreferences = ({ wallpaper, setWallpaper, wallpapers, screensaverEnabled, setScreensaverEnabled, screensaverDelay, setScreensaverDelay, theme, setTheme, themes }) => {
    const [activeTab, setActiveTab] = useState('theme');

    const wallpaperOptions = [
        { id: 'default', name: 'Kali Dark', preview: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 50%, #000000 100%)', category: 'Solid' },
        { id: 'solid', name: 'Solid Black', preview: '#0a0a0a', category: 'Solid' },
        { id: 'gradient1', name: 'Purple Blend', preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', category: 'Gradient' },
        { id: 'gradient2', name: 'Pink Sunset', preview: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', category: 'Gradient' },
        { id: 'gradient3', name: 'Ocean Blue', preview: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)', category: 'Gradient' },
        { id: 'gradient4', name: 'Fire Orange', preview: 'linear-gradient(135deg, #f83600 0%, #f9d423 100%)', category: 'Gradient' },
        { id: 'image1', name: 'Mountain Lake', preview: 'url(https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=400)', category: 'Nature' },
        { id: 'image2', name: 'Forest Path', preview: 'url(https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400)', category: 'Nature' },
        { id: 'image9', name: 'Desert Dunes', preview: 'url(https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=400)', category: 'Nature' },
        { id: 'image10', name: 'Ocean Waves', preview: 'url(https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400)', category: 'Nature' },
        { id: 'image11', name: 'Mountain Peak', preview: 'url(https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=400)', category: 'Nature' },
        { id: 'image3', name: 'Dark Cyber', preview: 'url(https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400)', category: 'Urban' },
        { id: 'image4', name: 'Night City', preview: 'url(https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&w=400)', category: 'Urban' },
        { id: 'image6', name: 'Neon Lights', preview: 'url(https://images.pexels.com/photos/1486861/pexels-photo-1486861.jpeg?auto=compress&cs=tinysrgb&w=400)', category: 'Urban' },
        { id: 'image12', name: 'Tokyo Night', preview: 'url(https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=400)', category: 'Urban' },
        { id: 'image5', name: 'Digital Matrix', preview: 'url(https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400)', category: 'Tech' },
        { id: 'image7', name: 'Purple Space', preview: 'url(https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg?auto=compress&cs=tinysrgb&w=400)', category: 'Space' },
        { id: 'image8', name: 'Aurora Lights', preview: 'url(https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg?auto=compress&cs=tinysrgb&w=400)', category: 'Space' }
    ];

    return (
        <div className="h-full bg-gradient-to-br from-gray-900 to-black">
            <div className="flex h-full">
                <div className="w-48 bg-gray-900 border-r border-blue-500/30 p-4">
                    <div className="space-y-2">
                        <button onClick={() => setActiveTab('theme')} className={`w-full text-left px-3 py-2 rounded transition-all ${activeTab === 'theme' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}>
                            🎨 Theme
                        </button>
                        <button onClick={() => setActiveTab('wallpaper')} className={`w-full text-left px-3 py-2 rounded transition-all ${activeTab === 'wallpaper' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}>
                            🖼️ Wallpaper
                        </button>
                        <button onClick={() => setActiveTab('screensaver')} className={`w-full text-left px-3 py-2 rounded transition-all ${activeTab === 'screensaver' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}>
                            💤 Screensaver
                        </button>
                    </div>
                </div>

                <div className="flex-1 p-6 overflow-auto">
                    {activeTab === 'theme' && (
                        <div>
                            <h2 className="text-2xl font-bold text-blue-400 mb-6">Theme Settings</h2>
                            <p className="text-gray-400 mb-6 text-sm">Choose a theme to customize the look and feel of your OS</p>
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(themes).map(([key, themeData]) => (
                                    <div
                                        key={key}
                                        onClick={() => setTheme(key)}
                                        className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${theme === key ? 'border-blue-500 shadow-lg shadow-blue-500/50' : 'border-gray-700 hover:border-blue-400'
                                            }`}
                                    >
                                        <div className="h-40 w-full relative" style={{ background: themeData.background, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className={`${themeData.border} border-2 rounded-lg px-4 py-2 bg-black bg-opacity-50 backdrop-blur-sm`}>
                                                    <span className={`${themeData.accent} font-semibold`}>Preview</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`p-3 text-center ${theme === key ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}>
                                            <div className="font-semibold">{themeData.name}</div>
                                            <div className="text-xs opacity-75 mt-1">{themeData.font.split(',')[0].replace(/"/g, '')}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'wallpaper' && (
                        <div>
                            <h2 className="text-2xl font-bold text-blue-400 mb-6">Wallpaper Settings</h2>

                            {['Solid', 'Gradient', 'Nature', 'Urban', 'Tech', 'Space'].map(category => {
                                const categoryWallpapers = wallpaperOptions.filter(w => w.category === category);
                                if (categoryWallpapers.length === 0) return null;

                                return (
                                    <div key={category} className="mb-8">
                                        <h3 className="text-lg font-semibold text-gray-400 mb-3">{category}</h3>
                                        <div className="grid grid-cols-4 gap-4">
                                            {categoryWallpapers.map(option => (
                                                <div
                                                    key={option.id}
                                                    onClick={() => setWallpaper(option.id)}
                                                    className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${wallpaper === option.id ? 'border-blue-500 shadow-lg shadow-blue-500/50 scale-105' : 'border-gray-700 hover:border-blue-400'
                                                        }`}
                                                >
                                                    <div className="h-28 w-full" style={{ background: option.preview, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                                                    <div className={`p-2 text-center text-sm ${wallpaper === option.id ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}>
                                                        {option.name}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {activeTab === 'screensaver' && (
                        <div>
                            <h2 className="text-2xl font-bold text-blue-400 mb-6">Screensaver Settings</h2>

                            <div className="space-y-6">
                                <div className="bg-gray-800 p-4 rounded-lg border border-blue-500/30">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-green-400 mb-1">Enable Screensaver</h3>
                                            <p className="text-sm text-gray-400">Show screensaver after period of inactivity</p>
                                        </div>
                                        <button
                                            onClick={() => setScreensaverEnabled(!screensaverEnabled)}
                                            className={`relative w-14 h-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${screensaverEnabled ? 'bg-blue-600' : 'bg-gray-600'
                                                }`}
                                        >
                                            <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out ${screensaverEnabled ? 'translate-x-6' : 'translate-x-0'
                                                }`} />
                                        </button>
                                    </div>
                                </div>

                                {screensaverEnabled && (
                                    <div className="bg-gray-800 p-4 rounded-lg border border-blue-500/30">
                                        <h3 className="text-lg font-semibold text-green-400 mb-3">Start screensaver after</h3>
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="range"
                                                min="1"
                                                max="30"
                                                value={screensaverDelay}
                                                onChange={(e) => setScreensaverDelay(Number(e.target.value))}
                                                className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                                style={{ background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(screensaverDelay / 30) * 100}%, #374151 ${(screensaverDelay / 30) * 100}%, #374151 100%)` }}
                                            />
                                            <span className="text-blue-400 font-mono text-lg min-w-[80px]">{screensaverDelay} min</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SystemPreferences;
