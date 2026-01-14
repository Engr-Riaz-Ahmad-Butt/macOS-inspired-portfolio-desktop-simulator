import React, { useState, useEffect } from 'react';
import { Folder, FileText, Mail, Grid3x3, Image, Trash2 } from 'lucide-react';
import Window from './components/Window';
import Dock from './components/Dock';
import MenuBar from './components/MenuBar';
import DesktopIcon from './components/DesktopIcon';

// Terminal icon component
const TerminalIcon = ({ size = 24, className = "", strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);

const MacOSPortfolio = () => {
  const [windows, setWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [time, setTime] = useState(new Date());
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [easterEggMode, setEasterEggMode] = useState(false);
  const [konami, setKonami] = useState([]);
  const [wallpaper, setWallpaper] = useState('default');
  const [screensaverEnabled, setScreensaverEnabled] = useState(false);
  const [screensaverDelay, setScreensaverDelay] = useState(5);
  const [showScreensaver, setShowScreensaver] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [achievements, setAchievements] = useState({
    firstBoot: false,
    desktopExplorer: false,
    contextMatters: false,
    referenceCheck: false,
    actuallyReadIt: false,
    commandLineCurious: false,
    helpActually: false,
    trashExplorer: false,
    firstMine: false,
    cleanBoard: false,
    justOneMore: false,
    gamer: false
  });
  const [achievementNotification, setAchievementNotification] = useState(null);
  const [newAchievementPulse, setNewAchievementPulse] = useState(false);
  const [openedFiles, setOpenedFiles] = useState(new Set());
  const [trashFilesAttempted, setTrashFilesAttempted] = useState(new Set());
  const [gamesPlayed, setGamesPlayed] = useState({ minesweeper: 0, snake: 0 });
  const [theme, setTheme] = useState('kali');

  const themes = {
    kali: {
      name: 'Kali Linux',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 50%, #000000 100%)',
      menuBar: 'from-gray-900 to-black',
      border: 'border-blue-500',
      accent: 'text-blue-400',
      accentBg: 'bg-blue-600',
      iconGlow: 'drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]',
      windowBg: 'from-gray-900 via-black to-gray-900',
      windowBorder: 'border-blue-500',
      shadow: 'shadow-blue-500/50',
      font: '"Courier New", monospace'
    },
    vintage: {
      name: 'Vintage Tech',
      background: 'linear-gradient(135deg, #2d1b00 0%, #1a0f00 50%, #0d0800 100%)',
      menuBar: 'from-amber-900 to-amber-950',
      border: 'border-amber-600',
      accent: 'text-amber-400',
      accentBg: 'bg-amber-700',
      iconGlow: 'drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]',
      windowBg: 'from-amber-950 via-black to-amber-950',
      windowBorder: 'border-amber-600',
      shadow: 'shadow-amber-600/50',
      font: '"Courier New", monospace'
    },
    minimal: {
      name: 'Minimal',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 50%, #050505 100%)',
      menuBar: 'from-gray-900 to-black',
      border: 'border-gray-500',
      accent: 'text-gray-300',
      accentBg: 'bg-gray-700',
      iconGlow: 'drop-shadow-[0_0_8px_rgba(156,163,175,0.3)]',
      windowBg: 'from-gray-900 via-black to-gray-900',
      windowBorder: 'border-gray-500',
      shadow: 'shadow-gray-500/30',
      font: '"Inter", sans-serif'
    },
    aurora: {
      name: 'Aurora',
      background: 'linear-gradient(135deg, #2e3440 0%, #3b4252 50%, #2e3440 100%)',
      menuBar: 'from-gray-800 to-gray-900',
      border: 'border-cyan-400',
      accent: 'text-cyan-300',
      accentBg: 'bg-cyan-600',
      iconGlow: 'drop-shadow-[0_0_8px_rgba(136,192,208,0.5)]',
      windowBg: 'from-gray-800 via-gray-900 to-gray-800',
      windowBorder: 'border-cyan-400',
      shadow: 'shadow-cyan-400/50',
      font: '"Inter", sans-serif'
    },
    concrete: {
      name: 'Concrete',
      background: 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 50%, #1a1a1a 100%)',
      menuBar: 'from-gray-700 to-gray-800',
      border: 'border-stone-500',
      accent: 'text-stone-300',
      accentBg: 'bg-stone-600',
      iconGlow: 'drop-shadow-[0_0_8px_rgba(168,162,158,0.4)]',
      windowBg: 'from-stone-800 via-gray-900 to-stone-800',
      windowBorder: 'border-stone-500',
      shadow: 'shadow-stone-500/40',
      font: '"Roboto Mono", monospace'
    }
  };

  const currentTheme = themes[theme];

  const wallpapers = {
    default: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 50%, #000000 100%)',
    solid: '#0a0a0a',
    gradient1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    gradient2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    gradient3: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
    gradient4: 'linear-gradient(135deg, #f83600 0%, #f9d423 100%)',
    image1: 'url(https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1920)',
    image2: 'url(https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1920)',
    image3: 'url(https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1920)',
    image4: 'url(https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&w=1920)',
    image5: 'url(https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1920)',
    image6: 'url(https://images.pexels.com/photos/1486861/pexels-photo-1486861.jpeg?auto=compress&cs=tinysrgb&w=1920)',
    image7: 'url(https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg?auto=compress&cs=tinysrgb&w=1920)',
    image8: 'url(https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg?auto=compress&cs=tinysrgb&w=1920)',
    image9: 'url(https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1920)',
    image10: 'url(https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1920)',
    image11: 'url(https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=1920)',
    image12: 'url(https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1920)'
  };

  const achievementsList = [
    { id: 'firstBoot', name: 'First Boot', description: 'Launched the portfolio OS for the first time' },
    { id: 'desktopExplorer', name: 'Desktop Explorer', description: 'Opened 5 different files or folders' },
    { id: 'contextMatters', name: 'Context Matters', description: 'Read both bio.txt and skills.txt files' },
    { id: 'referenceCheck', name: 'Reference Check', description: 'Checked the testimonials in Mail' },
    { id: 'actuallyReadIt', name: 'Actually Read It', description: 'Opened and viewed the CV' },
    { id: 'commandLineCurious', name: 'Command Line Curious', description: 'Entered a command in the terminal' },
    { id: 'helpActually', name: 'Help, Actually', description: 'Used the help command' },
    { id: 'trashExplorer', name: 'Trash Explorer', description: 'Attempted to open all files in Trash' },
    { id: 'firstMine', name: 'First Mine', description: 'Triggered a mine in Minesweeper' },
    { id: 'cleanBoard', name: 'Clean Board', description: 'Won a game of Minesweeper' },
    { id: 'justOneMore', name: 'Just One More', description: 'Played the same mini-game multiple times' },
    { id: 'gamer', name: 'Gamer', description: 'Played both Minesweeper and Snake' }
  ];

  const unlockAchievement = (achievementId) => {
    if (!achievements[achievementId]) {
      setAchievements(prev => ({ ...prev, [achievementId]: true }));
      const achievement = achievementsList.find(a => a.id === achievementId);
      setAchievementNotification(achievement.name);
      setNewAchievementPulse(true);
      setTimeout(() => setAchievementNotification(null), 4000);
      setTimeout(() => setNewAchievementPulse(false), 2000);
    }
  };

  // First Boot
  useEffect(() => {
    unlockAchievement('firstBoot');
  }, []);

  // Desktop Explorer
  useEffect(() => {
    if (openedFiles.size >= 5) {
      unlockAchievement('desktopExplorer');
    }
  }, [openedFiles]);

  // Gamer
  useEffect(() => {
    if (gamesPlayed.minesweeper > 0 && gamesPlayed.snake > 0) {
      unlockAchievement('gamer');
    }
  }, [gamesPlayed]);

  // Just One More
  useEffect(() => {
    if (gamesPlayed.minesweeper > 1 || gamesPlayed.snake > 1) {
      unlockAchievement('justOneMore');
    }
  }, [gamesPlayed]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Activity tracking for screensaver
  useEffect(() => {
    const handleActivity = () => {
      setLastActivity(Date.now());
      setShowScreensaver(false);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, []);

  // Screensaver timer
  useEffect(() => {
    if (!screensaverEnabled) return;

    const checkInactivity = setInterval(() => {
      const inactiveTime = (Date.now() - lastActivity) / 1000 / 60;
      if (inactiveTime >= screensaverDelay) {
        setShowScreensaver(true);
      }
    }, 1000);

    return () => clearInterval(checkInactivity);
  }, [screensaverEnabled, screensaverDelay, lastActivity]);

  // Konami code easter egg
  useEffect(() => {
    const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    const handler = (e) => {
      const newKonami = [...konami, e.key].slice(-10);
      setKonami(newKonami);
      if (JSON.stringify(newKonami) === JSON.stringify(sequence)) {
        setEasterEggMode(prev => !prev);
        addTerminalLine('🎮 KONAMI CODE ACTIVATED! Matrix mode toggled.');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [konami]);

  const desktopIcons = [
    { id: 'about', name: 'About Me', icon: Folder, type: 'folder', x: 30, y: 50 },
    { id: 'experience', name: 'Experience', icon: Folder, type: 'folder', x: 30, y: 150 },
    { id: 'projects', name: 'Projects', icon: Folder, type: 'folder', x: 30, y: 250 },
    { id: 'playground', name: 'Playground', icon: Folder, type: 'folder', x: 30, y: 350 },
    { id: 'cv', name: 'cv.pdf', icon: FileText, type: 'pdf', x: 30, y: 450 },
    { id: 'trash', name: 'Trash', icon: Trash2, type: 'trash', x: 30, y: 560 }
  ];

  const dockApps = [
    { id: 'finder', name: 'Finder', icon: Folder },
    { id: 'terminal', name: 'Terminal', icon: TerminalIcon },
    { id: 'mail', name: 'Mail', icon: Mail },
    { id: 'minesweeper', name: 'Minesweeper', icon: Grid3x3 },
    { id: 'snake', name: 'Snake', icon: Image }
  ];

  const folderContents = {
    about: [
      { name: 'bio.txt', type: 'text', content: 'Hi! I\'m Riaz Ahmad Butt 👋\n\nSoftware Engineer with 2 years building scalable web applications using the MERN stack. I specialize in architecting RESTful APIs with Node.js/Express and creating high-performance React frontends.\n\nCurrently building AI-powered web applications at Aawaz AI, where I integrate OpenAI APIs and custom ML models into production features. I\'m passionate about writing clean, maintainable code that drives measurable business impact.\n\nLocation: Islamabad, Pakistan 🇵🇰\nEmail: engr.riazahmadbutt@gmail.com\nPhone: +92 3360359897\nLinkedIn: linkedin.com/in/riaz-ahmad-butt' },
      { name: 'skills.txt', type: 'text', content: '💻 TECHNICAL SKILLS\n\n🎨 Frontend Development\nReact.js | Next.js | TypeScript | JavaScript (ES6+)\nRedux Toolkit | Zustand | Context API | TanStack Query\nMaterial UI | Tailwind CSS | Shadcn/UI | Bootstrap\nHTML5 | CSS3 | Zod | Axios | jQuery\n\n⚙️ Backend Development\nNode.js | Express.js | MongoDB | SQL | Sequelize\nRESTful APIs | JWT Authentication | WebSockets\nAWS S3 | GraphQL | CI/CD Pipelines\n\n🛠️ Tools & Methodologies\nGit | Docker | Postman | VS Code | Jenkins\nAWS | Heroku | Agile/Scrum\n\n🌟 Soft Skills\nProblem-solving, Communication, Adaptability\nTeamwork, Attention to detail, Time management\nCritical thinking' },
      { name: 'education.txt', type: 'text', content: '🎓 EDUCATION\n\nBSc Software Engineering\nUniversity of Azad Jammu and Kashmir, Muzaffarabad\n2019 – 2023\nMZD, Pakistan\n\n📜 CERTIFICATES\n• MERN Stack Fellowship — Bytewise Limited\n• Responsive Web Design — freeCodeCamp' }
    ],
    experience: [
      {
        name: 'Aawaz AI', type: 'folder', items: [
          { name: 'role.txt', type: 'text', content: 'Full Stack Developer\nNovember 2025 – Present | Islamabad, Pakistan\n\n🚀 Key Responsibilities:\n• Build AI-powered web applications using Next.js and React\n• Integrate OpenAI APIs and custom ML models into production features\n• Develop responsive, user-friendly interfaces for complex AI workflows\n• Implement server-side rendering (SSR) for optimized performance\n• Manage state with Redux Toolkit and Zustand across multiple projects\n• Collaborate with AI/ML teams to translate models into functional features\n• Create reusable component libraries to accelerate development' }
        ]
      },
      {
        name: 'Mexil Software Solution', type: 'folder', items: [
          { name: 'role.txt', type: 'text', content: 'MERN Stack Developer\nMarch 2024 – November 2025 | Islamabad, Pakistan\n\n🚀 Key Achievements:\n• Built and maintained scalable web applications using MERN stack, Next.js, and SQL databases\n• Integrated third-party APIs including Meta (Facebook/Instagram) APIs for social media functionality\n• Implemented AI features to automate workflows and enhance user experience\n• Configured AWS S3 for secure file storage, uploads, and access control\n• Developed real-time chat systems using WebSockets for instant messaging\n• Designed responsive, mobile-first UIs with Tailwind CSS and Shadcn/UI\n• Deployed applications on Heroku with CI/CD pipelines and AWS service integration\n• Optimized API performance and database queries for high-traffic applications' }
        ]
      }
    ],
    projects: [
      { name: 'TalkingMe', type: 'project', image: '🎤', description: 'AI-powered platform built with MERN stack and Gemini API that helps users improve their careers by analyzing resumes, audio, and video introductions. Features insights, practice sessions, and skill-building resources through an interactive dashboard.' },
      { name: 'OmniChannel', type: 'project', image: '💬', description: 'Developed an OmniChannel communication platform integrating Meta (Facebook, Instagram, WhatsApp), Euro SMS, and Email for seamless messaging. Implemented real-time messaging and synchronization with Node.js, Next.js, Sequelize, and various APIs.' },
      { name: 'Clarno AI', type: 'project', image: '🧠', description: 'AI-powered SaaS platform that guides entrepreneurs through structured problem validation using Next.js, OpenAI APIs, and JWT authentication. Built an interactive 8-step workflow system with real-time AI chat interface for discovering and analyzing customer pain points.' }
    ],
    playground: [
      { name: 'secret.txt', type: 'text', content: '🎩 You found a secret! Try typing "matrix" in the terminal...\n\nOr try the Konami code: ↑↑↓↓←→←→BA' },
      {
        name: 'experiments', type: 'folder', items: [
          { name: 'webgl-shader.js', type: 'text', content: '// Experimental shader code\nconst vertexShader = `\n  varying vec2 vUv;\n  void main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n  }\n`;' }
        ]
      }
    ],
    trash: [
      { name: 'passwords.txt', type: 'trash-locked', message: 'Absolutely not. PS don\'t store your passwords in a .txt file like EVER' },
      { name: 'journal_2020-2022.txt', type: 'trash-locked', message: 'Nope. Nope. Nope.' },
      { name: 'bank_transactions_2021.csv', type: 'trash-locked', message: 'Financial data is not part of the portfolio.' },
      { name: 'side_projects_roi.csv', type: 'trash-locked', message: 'Some metrics hurt more than they help.' }
    ]
  };

  const addTerminalLine = (text) => {
    setTerminalHistory(prev => [...prev, text]);
  };

  const openWindow = (id, type, title, content) => {
    const existing = windows.find(w => w.id === id);
    if (existing) {
      setActiveWindow(id);
      return;
    }

    // Track file opening for achievements
    if (type === 'text' || type === 'finder' || type === 'pdf' || type === 'mail') {
      setOpenedFiles(prev => new Set([...prev, id]));
    }

    // Context Matters achievement
    if (id === 'file-bio.txt' || id === 'file-skills.txt') {
      const newFiles = new Set([...openedFiles, id]);
      if (newFiles.has('file-bio.txt') && newFiles.has('file-skills.txt')) {
        unlockAchievement('contextMatters');
      }
    }

    // Reference Check achievement
    if (type === 'mail') {
      unlockAchievement('referenceCheck');
    }

    // Actually Read It achievement
    if (type === 'pdf' && id === 'cv-viewer') {
      unlockAchievement('actuallyReadIt');
    }

    // Game tracking
    if (type === 'minesweeper') {
      setGamesPlayed(prev => ({ ...prev, minesweeper: prev.minesweeper + 1 }));
    }
    if (type === 'snake') {
      setGamesPlayed(prev => ({ ...prev, snake: prev.snake + 1 }));
    }

    const newWindow = {
      id,
      type,
      title,
      content,
      x: 200 + windows.length * 30,
      y: 100 + windows.length * 30,
      width: type === 'terminal' ? 700 : type === 'pdf' ? 800 : 600,
      height: type === 'terminal' ? 500 : type === 'pdf' ? 700 : 500,
      minimized: false
    };

    setWindows([...windows, newWindow]);
    setActiveWindow(id);
  };

  const closeWindow = (id) => {
    setWindows(windows.filter(w => w.id !== id));
    if (activeWindow === id) {
      setActiveWindow(windows[windows.length - 2]?.id || null);
    }
  };

  const handleIconDoubleClick = (icon) => {
    if (icon.type === 'folder') {
      openWindow(icon.id, 'finder', icon.name, folderContents[icon.id]);
    } else if (icon.type === 'pdf') {
      openWindow('cv-viewer', 'pdf', 'cv.pdf', null);
    } else if (icon.type === 'trash') {
      openWindow('trash', 'finder', 'Trash', folderContents.trash);
    }
  };

  const handleDockClick = (app) => {
    if (app.id === 'terminal') {
      openWindow('terminal', 'terminal', 'Terminal', null);
    } else if (app.id === 'finder') {
      openWindow('finder-home', 'finder', 'Finder', Object.keys(folderContents).map(k => ({ name: k, type: 'folder' })));
    } else if (app.id === 'mail') {
      openWindow('mail', 'mail', 'Mail', null);
    } else if (app.id === 'minesweeper') {
      openWindow('minesweeper', 'minesweeper', 'Minesweeper', null);
    } else if (app.id === 'snake') {
      openWindow('snake', 'snake', 'Snake', null);
    }
  };

  const openSystemPreferences = () => {
    openWindow('system-prefs', 'settings', 'System Preferences', null);
  };

  const openAchievements = () => {
    openWindow('achievements', 'achievements', 'Achievements', null);
  };

  const resetAchievements = () => {
    setAchievements({
      firstBoot: false,
      desktopExplorer: false,
      contextMatters: false,
      referenceCheck: false,
      actuallyReadIt: false,
      commandLineCurious: false,
      helpActually: false,
      trashExplorer: false,
      firstMine: false,
      cleanBoard: false,
      justOneMore: false,
      gamer: false
    });
    setOpenedFiles(new Set());
    setTrashFilesAttempted(new Set());
    setGamesPlayed({ minesweeper: 0, snake: 0 });
    setAchievementNotification(null);
    setNewAchievementPulse(false);

    setTimeout(() => {
      unlockAchievement('firstBoot');
    }, 100);
  };

  return (
    <div className={`fixed inset-0 overflow-hidden ${easterEggMode ? 'animate-pulse' : ''}`}
      style={{
        background: easterEggMode
          ? 'linear-gradient(45deg, #000 0%, #0a0 50%, #000 100%)'
          : wallpapers[wallpaper] || currentTheme.background,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: currentTheme.font
      }}>

      {/* Screensaver */}
      {showScreensaver && (
        <div className="absolute inset-0 z-50 bg-black flex items-center justify-center"
          onClick={() => setShowScreensaver(false)}>
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">🐉</div>
            <div className="text-2xl text-blue-400 font-bold mb-2">Kali Linux</div>
            <div className="text-gray-400">Move mouse or press any key to wake</div>
            <div className="mt-8 text-green-400 text-lg font-mono">
              {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
          </div>
        </div>
      )}

      {/* Achievement Notification */}
      {achievementNotification && (
        <div className="fixed top-12 right-4 z-50 animate-slide-in-right">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white px-4 py-3 rounded-lg shadow-2xl border border-blue-500/50 flex items-center gap-3 min-w-[280px]">
            <span className="text-2xl">🏆</span>
            <div>
              <div className="text-xs text-gray-400">Achievement unlocked</div>
              <div className="font-semibold text-blue-300">{achievementNotification}</div>
            </div>
          </div>
        </div>
      )}

      {/* Menu Bar */}
      <MenuBar
        currentTheme={currentTheme}
        windows={windows}
        activeWindow={activeWindow}
        resetAchievements={resetAchievements}
        openSystemPreferences={openSystemPreferences}
        openAchievements={openAchievements}
        newAchievementPulse={newAchievementPulse}
        time={time}
      />

      {/* Desktop Icons */}
      <div className="absolute inset-0 pt-8 pb-28">
        {desktopIcons.map(icon => (
          <DesktopIcon
            key={icon.id}
            icon={icon}
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
            handleIconDoubleClick={handleIconDoubleClick}
            currentTheme={currentTheme}
          />
        ))}
      </div>

      {/* Windows */}
      {windows.map(win => (
        <Window
          key={win.id}
          window={win}
          isActive={activeWindow === win.id}
          onFocus={() => setActiveWindow(win.id)}
          onClose={() => closeWindow(win.id)}
          setWindows={setWindows}
          windows={windows}
          openWindow={openWindow}
          addTerminalLine={addTerminalLine}
          terminalHistory={terminalHistory}
          easterEggMode={easterEggMode}
          setEasterEggMode={setEasterEggMode}
          wallpaper={wallpaper}
          setWallpaper={setWallpaper}
          wallpapers={wallpapers}
          screensaverEnabled={screensaverEnabled}
          setScreensaverEnabled={setScreensaverEnabled}
          screensaverDelay={screensaverDelay}
          setScreensaverDelay={setScreensaverDelay}
          unlockAchievement={unlockAchievement}
          setGamesPlayed={setGamesPlayed}
          achievements={achievements}
          achievementsList={achievementsList}
          trashFilesAttempted={trashFilesAttempted}
          setTrashFilesAttempted={setTrashFilesAttempted}
          currentTheme={currentTheme}
          theme={theme}
          setTheme={setTheme}
          themes={themes}
        />
      ))}

      {/* Dock */}
      <Dock
        dockApps={dockApps}
        windows={windows}
        handleDockClick={handleDockClick}
        currentTheme={currentTheme}
      />
    </div>
  );
};

export default MacOSPortfolio;