import React, { useState } from 'react';
import { Folder, FileCode, FileText } from 'lucide-react';

const FinderContent = ({ content, openWindow, trashFilesAttempted, setTrashFilesAttempted, unlockAchievement, currentTheme }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const handleItemClick = (item) => {
        if (item.type === 'trash-locked') {
            setPopupMessage(item.message);
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);

            const newAttempts = new Set([...trashFilesAttempted, item.name]);
            setTrashFilesAttempted(newAttempts);

            if (newAttempts.size >= 4) {
                unlockAchievement('trashExplorer');
            }
        } else if (item.type === 'text') {
            openWindow(`file-${item.name}`, 'text', item.name, item.content);
        }
    };

    return (
        <div className="p-6 bg-gradient-to-br from-gray-900 to-black min-h-full relative">
            {showPopup && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
                    <div className="bg-gradient-to-br from-red-600 to-red-800 text-white px-6 py-4 rounded-lg shadow-2xl border-2 border-red-400 max-w-md">
                        <div className="flex items-start gap-3 mb-4">
                            <span className="text-2xl">🚫</span>
                            <div>
                                <div className="font-bold text-lg mb-1">Access Denied</div>
                                <div className="text-sm">{popupMessage}</div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="px-4 py-2 bg-white text-red-600 rounded font-semibold hover:bg-gray-100 transition-colors"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-4 gap-4">
                {content?.map((item, i) => (
                    <div
                        key={i}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-800/50 ${currentTheme.border} border border-opacity-30 hover:bg-opacity-50 hover:${currentTheme.border} cursor-pointer transition-all min-h-[140px]`}
                        onDoubleClick={() => handleItemClick(item)}
                    >
                        <div className="flex-shrink-0">
                            {item.type === 'folder' ? <Folder size={48} className={currentTheme.accent} /> :
                                item.type === 'project' ? <FileCode size={48} className="text-purple-400" /> :
                                    item.type === 'trash-locked' ? <FileText size={48} className="text-red-400" /> :
                                        <FileText size={48} className={currentTheme.accent} />}
                        </div>
                        <span className={`text-sm text-center break-words w-full ${item.type === 'trash-locked' ? 'text-red-300' : currentTheme.accent}`}>
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FinderContent;
