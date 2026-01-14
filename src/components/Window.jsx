import React, { useState, useEffect, useRef } from 'react';
import TerminalContent from './apps/TerminalContent';
import FinderContent from './apps/FinderContent';
import TextViewer from './apps/TextViewer';
import PDFViewer from './apps/PDFViewer';
import MailClient from './apps/MailClient';
import Minesweeper from './apps/Minesweeper';
import ProjectViewer from './apps/ProjectViewer';
import SystemPreferences from './apps/SystemPreferences';
import SnakeGame from './apps/SnakeGame';
import AchievementsWindow from './apps/AchievementsWindow';

const Window = ({ window: win, isActive, onFocus, onClose, setWindows, windows, openWindow, addTerminalLine, terminalHistory, easterEggMode, setEasterEggMode, wallpaper, setWallpaper, wallpapers, screensaverEnabled, setScreensaverEnabled, screensaverDelay, setScreensaverDelay, unlockAchievement, setGamesPlayed, achievements, achievementsList, trashFilesAttempted, setTrashFilesAttempted, currentTheme, theme, setTheme, themes }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isResizing, setIsResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState(null);
    const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const windowRef = useRef(null);

    const handleMouseDown = (e) => {
        if (e.target.closest('.window-content')) return;
        if (e.target.closest('.resize-handle')) return;
        setIsDragging(true);
        setDragOffset({
            x: e.clientX - win.x,
            y: e.clientY - win.y
        });
        onFocus();
    };

    const handleResizeStart = (e, direction) => {
        e.stopPropagation();
        setIsResizing(true);
        setResizeDirection(direction);
        setResizeStart({
            x: e.clientX,
            y: e.clientY,
            width: win.width,
            height: win.height,
            windowX: win.x,
            windowY: win.y
        });
        onFocus();
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) {
                setWindows(windows.map(w =>
                    w.id === win.id
                        ? { ...w, x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y }
                        : w
                ));
            } else if (isResizing) {
                const deltaX = e.clientX - resizeStart.x;
                const deltaY = e.clientY - resizeStart.y;

                let newWidth = resizeStart.width;
                let newHeight = resizeStart.height;
                let newX = resizeStart.windowX;
                let newY = resizeStart.windowY;

                const minWidth = 400;
                const minHeight = 300;

                if (resizeDirection.includes('e')) {
                    newWidth = Math.max(minWidth, resizeStart.width + deltaX);
                }
                if (resizeDirection.includes('s')) {
                    newHeight = Math.max(minHeight, resizeStart.height + deltaY);
                }
                if (resizeDirection.includes('w')) {
                    const potentialWidth = resizeStart.width - deltaX;
                    if (potentialWidth >= minWidth) {
                        newWidth = potentialWidth;
                        newX = resizeStart.windowX + deltaX;
                    }
                }
                if (resizeDirection.includes('n')) {
                    const potentialHeight = resizeStart.height - deltaY;
                    if (potentialHeight >= minHeight) {
                        newHeight = potentialHeight;
                        newY = resizeStart.windowY + deltaY;
                    }
                }

                setWindows(windows.map(w =>
                    w.id === win.id
                        ? { ...w, width: newWidth, height: newHeight, x: newX, y: newY }
                        : w
                ));
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            setIsResizing(false);
            setResizeDirection(null);
        };

        if (isDragging || isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, dragOffset, resizeDirection, resizeStart, win.id, windows, setWindows]);

    return (
        <div
            ref={windowRef}
            className={`absolute bg-gradient-to-br ${currentTheme.windowBg} rounded-lg shadow-2xl overflow-hidden transition-all ${currentTheme.border} border ${isActive ? `z-40 ${currentTheme.shadow}` : 'z-30 border-opacity-30'
                }`}
            style={{
                left: win.x,
                top: win.y,
                width: win.width,
                height: win.height,
                boxShadow: isActive ? `0 0 30px ${currentTheme.shadow}` : '0 4px 20px rgba(0, 0, 0, 0.5)'
            }}
            onMouseDown={onFocus}
        >
            <div
                className={`h-10 ${isActive ? `bg-gradient-to-r ${currentTheme.accentBg.replace('bg-', 'from-')} to-gray-700` : 'bg-gradient-to-r from-gray-800 to-gray-900'} ${currentTheme.border} border-b border-opacity-30 flex items-center justify-between px-3 cursor-move`}
                onMouseDown={handleMouseDown}
            >
                <div className="flex items-center gap-2">
                    <div onClick={onClose} className="w-3 h-3 rounded-sm bg-red-600 hover:bg-red-500 cursor-pointer border border-red-800" />
                    <div className="w-3 h-3 rounded-sm bg-yellow-600 hover:bg-yellow-500 cursor-pointer border border-yellow-800" />
                    <div className="w-3 h-3 rounded-sm bg-green-600 hover:bg-green-500 cursor-pointer border border-green-800" />
                </div>
                <span className={`text-sm font-semibold ${currentTheme.accent} absolute left-1/2 transform -translate-x-1/2`}>
                    {win.title}
                </span>
            </div>

            <div className="window-content overflow-auto bg-black" style={{ height: 'calc(100% - 40px)' }}>
                {win.type === 'terminal' && (
                    <TerminalContent
                        history={terminalHistory}
                        addLine={addTerminalLine}
                        openWindow={openWindow}
                        easterEggMode={easterEggMode}
                        setEasterEggMode={setEasterEggMode}
                        unlockAchievement={unlockAchievement}
                        currentTheme={currentTheme}
                        folderContents={{ about: [], experience: [], projects: [], playground: [] }}
                    />
                )}
                {win.type === 'finder' && (
                    <FinderContent
                        content={win.content}
                        openWindow={openWindow}
                        trashFilesAttempted={trashFilesAttempted}
                        setTrashFilesAttempted={setTrashFilesAttempted}
                        unlockAchievement={unlockAchievement}
                        currentTheme={currentTheme}
                    />
                )}
                {win.type === 'text' && <TextViewer content={win.content} currentTheme={currentTheme} />}
                {win.type === 'pdf' && <PDFViewer currentTheme={currentTheme} />}
                {win.type === 'mail' && <MailClient currentTheme={currentTheme} />}
                {win.type === 'minesweeper' && (
                    <Minesweeper
                        unlockAchievement={unlockAchievement}
                        currentTheme={currentTheme}
                    />
                )}
                {win.type === 'project' && <ProjectViewer project={win.content} currentTheme={currentTheme} />}
                {win.type === 'settings' && (
                    <SystemPreferences
                        wallpaper={wallpaper}
                        setWallpaper={setWallpaper}
                        wallpapers={wallpapers}
                        screensaverEnabled={screensaverEnabled}
                        setScreensaverEnabled={setScreensaverEnabled}
                        screensaverDelay={screensaverDelay}
                        setScreensaverDelay={setScreensaverDelay}
                        theme={theme}
                        setTheme={setTheme}
                        themes={themes}
                        currentTheme={currentTheme}
                    />
                )}
                {win.type === 'snake' && (
                    <SnakeGame
                        unlockAchievement={unlockAchievement}
                        currentTheme={currentTheme}
                    />
                )}
                {win.type === 'achievements' && (
                    <AchievementsWindow
                        achievements={achievements}
                        achievementsList={achievementsList}
                        currentTheme={currentTheme}
                    />
                )}
            </div>

            {isActive && (
                <>
                    <div className="resize-handle absolute top-0 left-0 w-4 h-4 cursor-nw-resize" onMouseDown={(e) => handleResizeStart(e, 'nw')} />
                    <div className="resize-handle absolute top-0 right-0 w-4 h-4 cursor-ne-resize" onMouseDown={(e) => handleResizeStart(e, 'ne')} />
                    <div className="resize-handle absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize" onMouseDown={(e) => handleResizeStart(e, 'sw')} />
                    <div className="resize-handle absolute bottom-0 right-0 w-4 h-4 cursor-se-resize" onMouseDown={(e) => handleResizeStart(e, 'se')} />
                    <div className="resize-handle absolute top-0 left-4 right-4 h-1 cursor-n-resize" onMouseDown={(e) => handleResizeStart(e, 'n')} />
                    <div className="resize-handle absolute bottom-0 left-4 right-4 h-1 cursor-s-resize" onMouseDown={(e) => handleResizeStart(e, 's')} />
                    <div className="resize-handle absolute left-0 top-4 bottom-4 w-1 cursor-w-resize" onMouseDown={(e) => handleResizeStart(e, 'w')} />
                    <div className="resize-handle absolute right-0 top-4 bottom-4 w-1 cursor-e-resize" onMouseDown={(e) => handleResizeStart(e, 'e')} />
                </>
            )}
        </div>
    );
};

export default Window;
