import React from 'react';
import { Download } from 'lucide-react';

const PDFViewer = ({ currentTheme }) => {
    return (
        <div className="h-full flex flex-col bg-black">
            <div className="flex-1 overflow-auto p-8">
                <div className={`max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black shadow-2xl ${currentTheme.shadow} p-12 ${currentTheme.border} border rounded`}>
                    <div className={`border-b-2 ${currentTheme.border} pb-4 mb-6`}>
                        <h1 className={`text-3xl font-bold mb-2 ${currentTheme.accent}`}>RIAZ AHMAD BUTT</h1>
                        <div className={`text-sm ${currentTheme.accent} space-y-1`}>
                            <div>📧 engr.riazahmadbutt@gmail.com | 📱 +92 3360359897</div>
                            <div>📍 Islamabad, Pakistan | 💼 linkedin.com/in/riaz-ahmad-butt</div>
                        </div>
                    </div>

                    <section className="mb-6">
                        <h2 className={`text-xl font-bold mb-3 ${currentTheme.accent}`}>PROFILE</h2>
                        <p className="text-sm leading-relaxed text-gray-300">
                            Software Engineer with 2 years building scalable web applications using the MERN stack. Expert in architecting RESTful APIs (Node.js/Express) and high-performance React frontends. Proven ability to optimize database schemas, integrate third-party services, and implement secure authentication. Committed to writing clean, maintainable code that drives measurable business impact.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className={`text-xl font-bold mb-3 ${currentTheme.accent}`}>PROFESSIONAL EXPERIENCE</h2>

                        <div className="mb-4">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className={`font-bold ${currentTheme.accent}`}>Full Stack Developer</h3>
                                <span className="text-sm text-gray-400">11/2025 – Present</span>
                            </div>
                            <div className={`text-sm ${currentTheme.accent} mb-2 opacity-80`}>Aawaz AI | Islamabad</div>
                            <ul className="text-sm space-y-1 list-disc list-inside text-gray-300">
                                <li>Build AI-powered web applications using Next.js and React</li>
                                <li>Integrate OpenAI APIs and custom ML models into production features</li>
                                <li>Develop responsive, user-friendly interfaces for complex AI workflows</li>
                            </ul>
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className={`font-bold ${currentTheme.accent}`}>MERN Stack Developer</h3>
                                <span className="text-sm text-gray-400">03/2024 – 11/2025</span>
                            </div>
                            <div className={`text-sm ${currentTheme.accent} mb-2 opacity-80`}>Mexil Software Solution | Islamabad, Pakistan</div>
                            <ul className="text-sm space-y-1 list-disc list-inside text-gray-300">
                                <li>Built and maintained scalable web applications using MERN stack, Next.js, and SQL databases</li>
                                <li>Integrated third-party APIs including Meta (Facebook/Instagram) APIs</li>
                                <li>Implemented AI features to automate workflows and enhance user experience</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-6">
                        <h2 className={`text-xl font-bold mb-3 ${currentTheme.accent}`}>SKILLS</h2>
                        <div className="space-y-2 text-sm text-gray-300">
                            <div>
                                <span className={`font-semibold ${currentTheme.accent}`}>Frontend:</span> React.js, Next.js, TypeScript, JavaScript, Redux Toolkit, Zustand, TanStack Query, Material UI, Tailwind CSS, Shadcn/UI
                            </div>
                            <div>
                                <span className={`font-semibold ${currentTheme.accent}`}>Backend:</span> Node.js, Express.js, MongoDB, SQL, Sequelize, RESTful APIs, JWT, WebSockets, AWS S3, GraphQL
                            </div>
                            <div>
                                <span className={`font-semibold ${currentTheme.accent}`}>Tools:</span> Git, Docker, Postman, VS Code, Jenkins, AWS, Heroku, Agile/Scrum
                            </div>
                        </div>
                    </section>

                    <section className="mb-6">
                        <h2 className={`text-xl font-bold mb-3 ${currentTheme.accent}`}>PROJECTS</h2>

                        <div className="mb-3">
                            <h3 className={`font-bold ${currentTheme.accent}`}>TalkingMe</h3>
                            <p className="text-sm text-gray-300">AI-powered platform built with MERN stack and Gemini API for career improvement through resume, audio, and video analysis.</p>
                        </div>

                        <div className="mb-3">
                            <h3 className={`font-bold ${currentTheme.accent}`}>OmniChannel</h3>
                            <p className="text-sm text-gray-300">Communication platform integrating Meta (Facebook, Instagram, WhatsApp), Euro SMS, and Email with real-time messaging.</p>
                        </div>

                        <div className="mb-3">
                            <h3 className={`font-bold ${currentTheme.accent}`}>Clarno AI</h3>
                            <p className="text-sm text-gray-300">AI-powered SaaS platform guiding entrepreneurs through problem validation with Next.js and OpenAI APIs.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className={`text-xl font-bold mb-3 ${currentTheme.accent}`}>EDUCATION</h2>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className={`font-bold ${currentTheme.accent}`}>BSc Software Engineering</h3>
                                <p className="text-sm text-gray-300">University of Azad Jammu and Kashmir, Muzaffarabad</p>
                            </div>
                            <span className="text-sm text-gray-400">2019 – 2023</span>
                        </div>
                    </section>
                </div>
            </div>
            <div className={`${currentTheme.border} border-t p-4 bg-gradient-to-b from-gray-900 to-black flex justify-center`}>
                <button className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${currentTheme.accentBg} text-white rounded-lg hover:opacity-90 transition-all shadow-lg ${currentTheme.shadow} ${currentTheme.border} border`}>
                    <Download size={18} />
                    Download CV
                </button>
            </div>
        </div>
    );
};

export default PDFViewer;
