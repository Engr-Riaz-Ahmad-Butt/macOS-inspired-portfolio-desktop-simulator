import React, { useState, useEffect, useRef } from 'react';

const SnakeGame = ({ unlockAchievement, currentTheme }) => {
    const [snake, setSnake] = useState([[10, 10]]);
    const [food, setFood] = useState([15, 15]);
    const [direction, setDirection] = useState('RIGHT');
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [speed, setSpeed] = useState(150);
    const [isPaused, setIsPaused] = useState(false);
    const gameLoopRef = useRef(null);

    const gridSize = 20;

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (gameOver) return;

            if (e.key === ' ') {
                setIsPaused(prev => !prev);
                return;
            }

            switch (e.key) {
                case 'ArrowUp':
                    if (direction !== 'DOWN') setDirection('UP');
                    break;
                case 'ArrowDown':
                    if (direction !== 'UP') setDirection('DOWN');
                    break;
                case 'ArrowLeft':
                    if (direction !== 'RIGHT') setDirection('LEFT');
                    break;
                case 'ArrowRight':
                    if (direction !== 'LEFT') setDirection('RIGHT');
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [direction, gameOver]);

    useEffect(() => {
        if (gameOver || isPaused) return;

        gameLoopRef.current = setInterval(() => {
            moveSnake();
        }, speed);

        return () => clearInterval(gameLoopRef.current);
    }, [snake, direction, gameOver, isPaused, speed]);

    const moveSnake = () => {
        const newSnake = [...snake];
        const head = [...newSnake[0]];

        switch (direction) {
            case 'UP': head[1] -= 1; break;
            case 'DOWN': head[1] += 1; break;
            case 'LEFT': head[0] -= 1; break;
            case 'RIGHT': head[0] += 1; break;
        }

        if (head[0] < 0 || head[0] >= gridSize || head[1] < 0 || head[1] >= gridSize) {
            setGameOver(true);
            return;
        }

        if (newSnake.some(segment => segment[0] === head[0] && segment[1] === head[1])) {
            setGameOver(true);
            return;
        }

        newSnake.unshift(head);

        if (head[0] === food[0] && head[1] === food[1]) {
            setScore(prev => prev + 10);
            generateFood(newSnake);
            setSpeed(prev => Math.max(50, prev - 5));
        } else {
            newSnake.pop();
        }

        setSnake(newSnake);
    };

    const generateFood = (currentSnake) => {
        let newFood;
        do {
            newFood = [
                Math.floor(Math.random() * gridSize),
                Math.floor(Math.random() * gridSize)
            ];
        } while (currentSnake.some(segment => segment[0] === newFood[0] && segment[1] === newFood[1]));
        setFood(newFood);
    };

    const resetGame = () => {
        setSnake([[10, 10]]);
        setFood([15, 15]);
        setDirection('RIGHT');
        setGameOver(false);
        setScore(0);
        setSpeed(150);
        setIsPaused(false);
    };

    return (
        <div className="p-6 flex flex-col items-center bg-gradient-to-br from-gray-900 to-black min-h-full">
            <div className="flex gap-4 mb-4 items-center">
                <div className={`px-4 py-2 bg-gray-800 rounded font-mono ${currentTheme.accent} ${currentTheme.border} border`}>
                    Score: {score}
                </div>
                <button
                    onClick={resetGame}
                    className={`px-4 py-2 ${currentTheme.accentBg} text-white rounded hover:opacity-90 transition-colors ${currentTheme.border} border`}
                >
                    New Game
                </button>
                <button
                    onClick={() => setIsPaused(!isPaused)}
                    disabled={gameOver}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition-colors border border-green-400 disabled:opacity-50"
                >
                    {isPaused ? 'Resume' : 'Pause'}
                </button>
            </div>

            {gameOver && (
                <div className="mb-4 px-6 py-3 rounded-lg bg-red-900 text-red-100 font-semibold border-2 border-red-500">
                    💀 Game Over! Final Score: {score}
                </div>
            )}

            {isPaused && !gameOver && (
                <div className="mb-4 px-6 py-3 rounded-lg bg-yellow-900 text-yellow-100 font-semibold border-2 border-yellow-500">
                    ⏸️ Paused
                </div>
            )}

            <div
                className={`inline-block border-4 ${currentTheme.border} rounded bg-black shadow-2xl ${currentTheme.shadow}`}
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${gridSize}, 20px)`,
                    gap: '1px'
                }}
            >
                {Array.from({ length: gridSize }).map((_, y) =>
                    Array.from({ length: gridSize }).map((_, x) => {
                        const isSnake = snake.some(segment => segment[0] === x && segment[1] === y);
                        const isHead = snake[0] && snake[0][0] === x && snake[0][1] === y;
                        const isFood = food[0] === x && food[1] === y;

                        return (
                            <div
                                key={`${x}-${y}`}
                                className={`w-5 h-5 ${isHead ? 'bg-green-400' :
                                    isSnake ? 'bg-green-500' :
                                        isFood ? 'bg-red-500' :
                                            'bg-gray-900'
                                    }`}
                            />
                        );
                    })
                )}
            </div>

            <div className="mt-4 text-center text-gray-400 text-sm">
                <p>Use Arrow Keys | Space to Pause</p>
            </div>
        </div>
    );
};

export default SnakeGame;
