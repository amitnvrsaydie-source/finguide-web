'use client'

import { useState, useRef, useEffect } from 'react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED_QUESTIONS = [
  "Which package is right for me?",
  "I'm an NRI — what do I need?",
  "How does booking work?",
  "What's fee-based advisory?",
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm the ZeroBias Assistant. I can help you find the right financial package, understand our advisors, or answer any questions. What's on your mind?",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open, messages])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return
    setShowSuggestions(false)

    const userMessage: Message = { role: 'user', content: text.trim() }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json()
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I couldn't process that. Please try again!" }])
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Network error. Please check your connection and try again." }])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* ── CHAT BUBBLE BUTTON ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open chat"
        className="fixed bottom-6 right-6 z-50 h-12 bg-emerald-500 hover:bg-emerald-400 rounded-full shadow-2xl flex items-center gap-2.5 px-4 transition-all duration-200 hover:scale-105 active:scale-95"
      >
        {open ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
            <span className="text-black text-sm font-bold">Close</span>
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
            <span className="text-black text-sm font-bold">Ask ZeroBias</span>
            {/* Unread dot */}
            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
          </>
        )}
      </button>

      {/* ── CHAT WINDOW ── */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] flex flex-col bg-[#111118] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden"
          style={{ height: '480px' }}>

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#0d1117] border-b border-gray-800 shrink-0">
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold leading-tight">ZeroBias Assistant</p>
              <p className="text-emerald-400 text-xs flex items-center gap-1.5">
                <svg width="7" height="7" viewBox="0 0 7 7"><circle cx="3.5" cy="3.5" r="3.5" fill="#34d399"/></svg>
                Online — typically replies instantly
              </p>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-600 hover:text-gray-400 transition-colors p-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-emerald-500 text-black font-medium rounded-br-sm'
                    : 'bg-[#1a1a24] text-gray-200 border border-gray-800/60 rounded-bl-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#1a1a24] border border-gray-800/60 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}

            {/* Suggested questions */}
            {showSuggestions && messages.length === 1 && (
              <div className="space-y-2 pt-1">
                <p className="text-gray-600 text-xs px-1">Quick questions:</p>
                <div className="flex flex-col gap-1.5">
                  {SUGGESTED_QUESTIONS.map(q => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-left text-xs text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/50 hover:bg-emerald-500/5 rounded-xl px-3 py-2 transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 py-3 border-t border-gray-800 bg-[#0d1117] shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything about ZeroBias..."
              disabled={loading}
              className="flex-1 bg-[#111118] border border-gray-800 hover:border-gray-700 focus:border-emerald-500 text-white text-sm rounded-xl px-3.5 py-2.5 outline-none transition-colors placeholder-gray-600 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-9 h-9 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl flex items-center justify-center shrink-0 transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-700 text-xs py-1.5 bg-[#0d1117] border-t border-gray-800/50 shrink-0">
            Powered by <span className="text-emerald-600">ZeroBias</span> · Not financial advice
          </p>
        </div>
      )}
    </>
  )
}
