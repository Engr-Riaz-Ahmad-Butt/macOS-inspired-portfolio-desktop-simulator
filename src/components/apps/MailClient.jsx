import React from 'react';

const MailClient = ({ currentTheme }) => {
    const emails = [
        { from: 'Hiring Manager', subject: 'Impressed by your portfolio!', preview: 'Your macOS-style portfolio really caught my attention. The attention to detail and technical implementation is outstanding...', date: 'Today' },
        { from: 'Tech Recruiter', subject: 'Full Stack Position', preview: 'Your experience with MERN stack and AI integration aligns perfectly with what we\'re looking for...', date: 'Yesterday' },
        { from: 'Senior Developer', subject: 'Love the creativity', preview: 'As a fellow developer, I have to say this is one of the most creative portfolios I\'ve seen. The Terminal easter eggs are genius...', date: '2 days ago' }
    ];

    return (
        <div className="h-full flex bg-black">
            <div className={`w-64 bg-gray-900 ${currentTheme.border} border-r p-4`}>
                <div className={`font-semibold mb-4 ${currentTheme.accent}`}>Mailboxes</div>
                <div className="space-y-1">
                    <div className={`px-3 py-2 ${currentTheme.accentBg} ${currentTheme.accent} rounded-md ${currentTheme.border} border`}>Inbox (3)</div>
                    <div className={`px-3 py-2 text-gray-400 hover:bg-gray-800 rounded-md cursor-pointer ${currentTheme.border} border border-transparent hover:${currentTheme.border}`}>Sent</div>
                    <div className={`px-3 py-2 text-gray-400 hover:bg-gray-800 rounded-md cursor-pointer ${currentTheme.border} border border-transparent hover:${currentTheme.border}`}>Drafts</div>
                </div>
            </div>
            <div className="flex-1">
                <div className={`${currentTheme.border} border-b p-4 font-semibold ${currentTheme.accent} bg-gray-900`}>Testimonials</div>
                <div className={`divide-y ${currentTheme.border}`}>
                    {emails.map((email, i) => (
                        <div key={i} className="p-4 hover:bg-gray-900 cursor-pointer transition-colors">
                            <div className="flex justify-between items-start mb-1">
                                <span className={`font-semibold ${currentTheme.accent}`}>{email.from}</span>
                                <span className="text-xs text-gray-500">{email.date}</span>
                            </div>
                            <div className={`text-sm font-medium mb-1 ${currentTheme.accent} opacity-80`}>{email.subject}</div>
                            <div className="text-sm text-gray-400">{email.preview}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MailClient;
