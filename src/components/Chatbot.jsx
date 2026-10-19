import { useEffect, useRef, useState } from 'react'
import { Bot, Send, X } from 'lucide-react'
import { getAnswer, suggestedQuestions } from '../data/knowledge'

const MAX_LEN = 300

const WELCOME = `Hi! I'm Abdullah's portfolio assistant.

Ask me about his skills, projects, services, experience, education, or how to get in touch — I answer straight from his portfolio information.`

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [messages, setMessages] = useState([{ id: 'welcome', role: 'bot', text: WELCOME }])

  const bodyRef = useRef(null)
  const inputRef = useRef(null)
  const busyTimer = useRef(0)

  // Keep the newest message in view.
  useEffect(() => {
    const body = bodyRef.current
    if (body) body.scrollTop = body.scrollHeight
  }, [messages, busy])

  // Focus the input when the panel opens.
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Never leave a pending "typing" timer behind.
  useEffect(() => () => clearTimeout(busyTimer.current), [])

  const send = (raw) => {
    const text = (raw || '').trim().slice(0, MAX_LEN)
    if (!text || busy) return

    setShowSuggestions(false)
    setInput('')
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: 'user', text }])
    setBusy(true)

    // Small, honest delay so the typing indicator reflects real processing.
    busyTimer.current = setTimeout(() => {
      setMessages((prev) => [...prev, { id: `b-${Date.now()}`, role: 'bot', text: getAnswer(text) }])
      setBusy(false)
    }, 480)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    send(input)
  }

  return (
    <>
      <button
        className="chat-fab"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close Ask About Abdullah chat' : 'Ask About Abdullah — open chat'}
        aria-expanded={open}
      >
        <span className="chat-fab__pulse" aria-hidden="true" />
        {open ? <X size={24} /> : <Bot size={24} />}
      </button>

      {open && (
        <div className="chat-panel" role="dialog" aria-label="Ask About Abdullah">
          <div className="chat-panel__head">
            <span className="chat-panel__avatar" aria-hidden="true">
              AA
            </span>
            <div>
              <div className="chat-panel__title">Ask About Abdullah</div>
              <div className="chat-panel__status">Online</div>
            </div>
            <button className="chat-panel__close" onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={17} />
            </button>
          </div>

          <div className="chat-panel__body" ref={bodyRef}>
            {messages.map((m) => (
              <div key={m.id} className={`chat-msg chat-msg--${m.role === 'user' ? 'user' : 'bot'}`}>
                {m.text}
              </div>
            ))}

            {busy && (
              <div className="chat-typing" aria-label="Assistant is typing">
                <span />
                <span />
                <span />
              </div>
            )}

            {showSuggestions && !busy && (
              <div className="chat-suggestions">
                {suggestedQuestions.map((q) => (
                  <button key={q} onClick={() => send(q)}>
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form className="chat-panel__foot" onSubmit={onSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              maxLength={MAX_LEN}
              aria-label="Type your question"
            />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Send question">
              <Send size={17} />
            </button>
          </form>

          <p className="chat-note">
            Answers come from Abdullah&apos;s portfolio information. For anything not covered here, contact him
            directly.
          </p>
        </div>
      )}
    </>
  )
}
