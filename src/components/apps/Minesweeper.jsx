import React, { useState, useEffect } from 'react';

const Minesweeper = ({ unlockAchievement, currentTheme }) => {
    const [difficulty, setDifficulty] = useState('easy');
    const [grid, setGrid] = useState([]);
    const [revealed, setRevealed] = useState([]);
    const [flags, setFlags] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [timer, setTimer] = useState(0);
    const [hasTriggeredAchievement, setHasTriggeredAchievement] = useState(false);

    const difficulties = {
        easy: { rows: 8, cols: 8, mines: 10 },
        medium: { rows: 12, cols: 12, mines: 25 },
        hard: { rows: 16, cols: 16, mines: 40 }
    };

    useEffect(() => {
        initGame();
    }, [difficulty]);

    useEffect(() => {
        if (revealed.length > 0 && !gameOver && !won) {
            const interval = setInterval(() => setTimer(t => t + 1), 1000);
            return () => clearInterval(interval);
        }
    }, [revealed, gameOver, won]);

    useEffect(() => {
        if (gameOver && !hasTriggeredAchievement) {
            unlockAchievement('firstMine');
            setHasTriggeredAchievement(true);
        }
        if (won && !hasTriggeredAchievement) {
            unlockAchievement('cleanBoard');
            setHasTriggeredAchievement(true);
        }
    }, [gameOver, won]);

    const initGame = () => {
        const config = difficulties[difficulty];
        const newGrid = Array(config.rows).fill(null).map(() => Array(config.cols).fill(0));

        let minesPlaced = 0;
        while (minesPlaced < config.mines) {
            const r = Math.floor(Math.random() * config.rows);
            const c = Math.floor(Math.random() * config.cols);
            if (newGrid[r][c] !== -1) {
                newGrid[r][c] = -1;
                minesPlaced++;
            }
        }

        for (let r = 0; r < config.rows; r++) {
            for (let c = 0; c < config.cols; c++) {
                if (newGrid[r][c] === -1) continue;
                let count = 0;
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        const nr = r + dr, nc = c + dc;
                        if (nr >= 0 && nr < config.rows && nc >= 0 && nc < config.cols && newGrid[nr][nc] === -1) {
                            count++;
                        }
                    }
                }
                newGrid[r][c] = count;
            }
        }

        setGrid(newGrid);
        setRevealed([]);
        setFlags([]);
        setGameOver(false);
        setWon(false);
        setTimer(0);
        setHasTriggeredAchievement(false);
    };

    const handleClick = (r, c) => {
        if (gameOver || won || flags.includes(`${r}-${c}`)) return;
        if (revealed.includes(`${r}-${c}`)) return;

        if (grid[r][c] === -1) {
            setGameOver(true);
            return;
        }

        const newRevealed = [...revealed, `${r}-${c}`];

        if (grid[r][c] === 0) {
            const toReveal = [[r, c]];
            const visited = new Set([`${r}-${c}`]);

            while (toReveal.length > 0) {
                const [cr, cc] = toReveal.pop();
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        const nr = cr + dr, nc = cc + dc;
                        const key = `${nr}-${nc}`;
                        if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && !visited.has(key)) {
                            visited.add(key);
                            newRevealed.push(key);
                            if (grid[nr][nc] === 0) {
                                toReveal.push([nr, nc]);
                            }
                        }
                    }
                }
            }
        }

        setRevealed(newRevealed);

        const totalCells = grid.length * grid[0].length;
        const mines = difficulties[difficulty].mines;
        if (newRevealed.length === totalCells - mines) {
            setWon(true);
        }
    };

    const handleRightClick = (e, r, c) => {
        e.preventDefault();
        if (gameOver || won || revealed.includes(`${r}-${c}`)) return;

        const key = `${r}-${c}`;
        setFlags(flags.includes(key) ? flags.filter(f => f !== key) : [...flags, key]);
    };

    const getCellColor = (value) => {
        const colors = ['', 'text-blue-600', 'text-green-600', 'text-red-600', 'text-purple-600', 'text-orange-600'];
        return colors[value] || 'text-gray-800';
    };

    return (
        <div className="p-6 flex flex-col items-center bg-gradient-to-br from-gray-900 to-black min-h-full">
            <div className="flex gap-4 mb-4 items-center">
                <div className={`px-4 py-2 bg-gray-800 rounded font-mono ${currentTheme.accent} ${currentTheme.border} border`}>
                    ⏱️ {timer}s
                </div>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="px-4 py-2 border rounded bg-gray-800 text-white">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <button
                    onClick={initGame}
                    className={`px-4 py-2 ${currentTheme.accentBg} text-white rounded hover:opacity-90 transition-colors ${currentTheme.border} border`}
                >
                    New Game
                </button>
            </div>

            {(gameOver || won) && (
                <div className={`mb-4 px-6 py-3 rounded-lg ${won ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} font-semibold`}>
                    {won ? '🎉 You Won!' : '💥 Game Over'}
                </div>
            )}

            <div
                className={`inline-block border-4 ${currentTheme.border} rounded bg-black shadow-2xl ${currentTheme.shadow}`}
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${difficulties[difficulty].cols}, 20px)`,
                    gap: '1px'
                }}
            >
                {grid.map((row, r) => (
                    row.map((cell, c) => {
                        const key = `${r}-${c}`;
                        const isRevealed = revealed.includes(key);
                        const isFlagged = flags.includes(key);
                        const isMine = cell === -1;

                        return (
                            <div
                                key={key}
                                className={`w-5 h-5 flex items-center justify-center border border-gray-300 text-xs font-bold cursor-pointer select-none
                  ${isRevealed
                                        ? isMine ? 'bg-red-500' : 'bg-gray-200'
                                        : 'bg-gray-100 hover:bg-gray-200'}`}
                                onClick={() => handleClick(r, c)}
                                onContextMenu={(e) => handleRightClick(e, r, c)}
                            >
                                {isFlagged && !isRevealed ? '🚩' :
                                    isRevealed ? (isMine ? '💣' : cell > 0 ? <span className={getCellColor(cell)}>{cell}</span> : '') : ''}
                            </div>
                        );
                    })
                ))}
            </div>
        </div>
    );
};

export default Minesweeper;
