import React, { useState, useEffect, useRef } from 'react';

const TerminalContent = ({ history, addLine, openWindow, easterEggMode, setEasterEggMode, unlockAchievement, currentTheme, folderContents }) => {
    const [input, setInput] = useState('');
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [commandHistory, setCommandHistory] = useState([]);
    const inputRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
    }, [history]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const commands = {
        help: () => {
            unlockAchievement('helpActually');
            return `Available commands:
  help          - Show this help message
  about         - Learn about me
  projects      - View my projects
  experience    - See my work history
  skills        - Display my technical skills
  contact       - Get my contact information
  ls            - List directory contents
  cat <file>    - Read a file
  open <item>   - Open an application or folder
  whoami        - Display user info
  clear         - Clear terminal
  cv            - View my CV
  email         - Open email client
  minesweeper   - Play Minesweeper
  matrix        - Enter the Matrix
  eastereggs    - Discover hidden features`;
        },
        about: () => 'Opening About Me folder...',
        projects: () => 'Opening Projects folder...',
        experience: () => 'Opening Experience folder...',
        skills: () => 'Opening skills.txt...',
        contact: () => `📧 Email: engr.riazahmadbutt@gmail.com
📱 Phone: +92 3360359897
📍 Location: Islamabad, Pakistan
💼 LinkedIn: linkedin.com/in/riaz-ahmad-butt`,
        ls: () => 'About Me/  Experience/  Projects/  Playground/  cv.pdf  Trash/',
        whoami: () => 'riaz@portfolio ~ Software Engineer | MERN Stack Developer | AI Enthusiast',
        clear: () => 'CLEAR',
        cv: () => 'Opening CV...',
        email: () => 'Opening Mail...',
        minesweeper: () => 'Launching Minesweeper...',
        matrix: () => 'MATRIX_MODE',
        eastereggs: () => `🥚 Easter Eggs:
  - Konami code (↑↑↓↓←→←→BA)
  - Type "matrix" for something special
  - Check the Playground folder
  - Triple-click the menu bar logo
  - More secrets await the curious...`
    };

    const handleCommand = (cmd) => {
        const trimmed = cmd.trim().toLowerCase();
        addLine(`┌──(riaz㉿kali)-[~]`);
        addLine(`└─$ ${cmd}`);

        setCommandHistory([...commandHistory, cmd]);
        setHistoryIndex(-1);

        if (trimmed === '') return;

        if (trimmed.length > 0) {
            unlockAchievement('commandLineCurious');
        }

        if (trimmed === 'clear') {
            history.length = 0;
            return;
        }

        if (trimmed === 'matrix') {
            setEasterEggMode(prev => !prev);
            addLine('🟢 Entering the Matrix...');
            return;
        }

        const parts = trimmed.split(' ');
        const command = parts[0];
        const arg = parts.slice(1).join(' ');

        if (command === 'open') {
            if (arg === 'about' || arg === 'about me') {
                openWindow('about', 'finder', 'About Me', []);
                addLine('Opening About Me...');
            } else if (arg === 'projects') {
                openWindow('projects', 'finder', 'Projects', []);
                addLine('Opening Projects...');
            } else if (arg === 'terminal') {
                openWindow('terminal-2', 'terminal', 'Terminal', null);
                addLine('Opening new Terminal window...');
            } else {
                addLine(`Cannot open: ${arg}`);
            }
        } else if (command === 'cat') {
            if (arg === 'bio.txt') {
                addLine('Hi! I\'m Riaz Ahmad Butt 👋\n\nSoftware Engineer with 2 years building scalable web applications using the MERN stack...');
            } else if (arg === 'skills.txt') {
                openWindow('skills', 'text', 'skills.txt', 'Loading skills...');
                addLine('Opening skills.txt...');
            } else {
                addLine(`cat: ${arg}: No such file`);
            }
        } else if (commands[command]) {
            const result = commands[command]();
            if (result) addLine(result);

            if (command === 'about') openWindow('about', 'finder', 'About Me', []);
            if (command === 'projects') openWindow('projects', 'finder', 'Projects', []);
            if (command === 'cv') openWindow('cv-viewer', 'pdf', 'cv.pdf', null);
            if (command === 'email') openWindow('mail', 'mail', 'Mail', null);
            if (command === 'minesweeper') openWindow('minesweeper', 'minesweeper', 'Minesweeper', null);
        } else {
            addLine(`command not found: ${command}. Type 'help' for available commands.`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = historyIndex + 1;
                if (newIndex >= commandHistory.length) {
                    setHistoryIndex(-1);
                    setInput('');
                } else {
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[newIndex]);
                }
            }
        }
    };

    return (
        <div className={`h-full bg-black ${currentTheme.accent} p-4 font-mono text-sm ${easterEggMode ? 'animate-pulse' : ''}`}
            onClick={() => inputRef.current?.focus()}
            ref={contentRef}>
            <div className={`mb-4 ${currentTheme.accent}`}>
                <span className={currentTheme.accent}>┌──(</span>
                <span className="text-red-400">riaz㉿kali</span>
                <span className={currentTheme.accent}>)-[</span>
                <span className="text-white">~</span>
                <span className={currentTheme.accent}>]</span>
                <br />
                <span className={currentTheme.accent}>└─$ </span>
                <span className={currentTheme.accent}>Riaz Ahmad Butt's Portfolio OS v1.0</span>
                <br />
                Type 'help' for available commands
                <br />
                Type 'contact' for contact information
                <br />
                <br />
            </div>
            {history.map((line, i) => (
                <div key={i} className="mb-1 whitespace-pre-wrap">{line}</div>
            ))}
            <div className="flex items-center">
                <span className={`${currentTheme.accent} mr-1`}>┌──(</span>
                <span className="text-red-400 mr-1">riaz㉿kali</span>
                <span className={`${currentTheme.accent} mr-1`}>)-[</span>
                <span className="text-white mr-1">~</span>
                <span className={`${currentTheme.accent} mr-2`}>]</span>
                <br />
            </div>
            <div className="flex items-center">
                <span className={`${currentTheme.accent} mr-2`}>└─$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={`flex-1 bg-transparent outline-none border-none ${currentTheme.accent}`}
                    autoFocus
                />
                <span className={`animate-pulse ${currentTheme.accent}`}>▊</span>
            </div>
        </div>
    );
};

export default TerminalContent;
