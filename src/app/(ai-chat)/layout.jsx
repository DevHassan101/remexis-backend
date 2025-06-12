"use client"

import Sidebar from '../../components/partials/ai-chat/SIdeBar'
import { ThemeProvider } from '../../context/ThemeContext';
import React, { useState } from 'react'

function AiChatLayout({ children }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <ThemeProvider>
            <div className="flex h-screen bg-gray-50 relative">
                <Sidebar
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                />
                {children}

            </div>
        </ThemeProvider>
    )
}

export default AiChatLayout
