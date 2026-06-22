import { createContext, useContext, useEffect, useState } from 'react'
import { chatbots as seed } from '../data/mockData.js'

// Shared chatbot list across the whole app so creating a bot on one page shows
// up everywhere (list, dashboard, install, flow). Persisted to localStorage so
// new bots survive a refresh. Frontend-only.
const ChatbotsContext = createContext(null)
const STORAGE_KEY = 'vartabot-chatbots'

function loadInitial() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch (e) {
    /* ignore */
  }
  return seed
}

export function ChatbotsProvider({ children }) {
  const [chatbots, setChatbots] = useState(loadInitial)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chatbots))
    } catch (e) {
      /* ignore */
    }
  }, [chatbots])

  const addChatbot = (bot) => {
    const newBot = {
      id: bot.id || `bot_${Date.now()}`,
      name: bot.name?.trim() || 'Untitled Chatbot',
      description: bot.description || '',
      status: bot.status || 'active',
      themeColor: bot.themeColor || '#4f46e5',
      welcomeMessage: bot.welcomeMessage || 'Hi there! 👋',
      rules: 0,
      conversations: 0,
      leads: 0,
      updatedAt: '2026-06-18',
      website: '—',
      ...bot,
    }
    setChatbots((list) => [newBot, ...list])
    return newBot
  }

  const updateChatbot = (id, patch) =>
    setChatbots((list) => list.map((b) => (b.id === id ? { ...b, ...patch } : b)))

  const deleteChatbot = (id) => setChatbots((list) => list.filter((b) => b.id !== id))

  const cloneChatbot = (id) =>
    setChatbots((list) => {
      const src = list.find((b) => b.id === id)
      if (!src) return list
      const copy = {
        ...src,
        id: `bot_${Date.now()}`,
        name: `${src.name} (Copy)`,
        status: 'draft',
        conversations: 0,
        leads: 0,
        updatedAt: '2026-06-18',
      }
      return [copy, ...list]
    })

  const toggleChatbot = (id) =>
    setChatbots((list) =>
      list.map((b) => (b.id === id ? { ...b, status: b.status === 'active' ? 'paused' : 'active' } : b))
    )

  return (
    <ChatbotsContext.Provider
      value={{ chatbots, addChatbot, updateChatbot, deleteChatbot, cloneChatbot, toggleChatbot }}
    >
      {children}
    </ChatbotsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useChatbots() {
  return useContext(ChatbotsContext)
}
