"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import {
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Search,
  Smile,
  Check,
  CheckCheck,
  ArrowLeft,
  Dumbbell,
  Clock,
  Flame,
} from "lucide-react"
import { DashboardShell } from "@/components/dashboard-shell"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  sender: "me" | "them"
  text: string
  time: string
  read: boolean
}

interface Conversation {
  id: number
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  status: string
  messages: Message[]
}

const conversations: Conversation[] = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "/images/avatar-2.jpg",
    lastMessage: "See you at 6 AM tomorrow! Leg day 🔥",
    time: "2m ago",
    unread: 2,
    online: true,
    status: "Training at Iron Paradise",
    messages: [
      { id: 1, sender: "them", text: "Hey! Saw we matched. Your numbers are solid 💪", time: "10:30 AM", read: true },
      { id: 2, sender: "me", text: "Thanks! Yours too. You train mornings right?", time: "10:32 AM", read: true },
      { id: 3, sender: "them", text: "Yeah always. 5:30-7:30 AM before work. Iron Paradise.", time: "10:33 AM", read: true },
      { id: 4, sender: "me", text: "Same gym! I'm usually there by 6. We should do a session together.", time: "10:35 AM", read: true },
      { id: 5, sender: "them", text: "For sure. Tomorrow is my leg day, you in?", time: "10:36 AM", read: true },
      { id: 6, sender: "me", text: "Always down for legs. What's your split looking like?", time: "10:38 AM", read: true },
      { id: 7, sender: "them", text: "Heavy squats, Romanian deadlifts, leg press, walking lunges, then some calf work", time: "10:39 AM", read: true },
      { id: 8, sender: "me", text: "Perfect. I'll be warmed up by 6:15. Squat rack?", time: "10:41 AM", read: true },
      { id: 9, sender: "them", text: "See you at 6 AM tomorrow! Leg day 🔥", time: "10:42 AM", read: false },
    ],
  },
  {
    id: 2,
    name: "Jake Rivera",
    avatar: "/images/avatar-1.jpg",
    lastMessage: "Just hit a new bench PR! 325 lbs",
    time: "1h ago",
    unread: 0,
    online: true,
    status: "Just finished training",
    messages: [
      { id: 1, sender: "them", text: "Bro you gotta try this new pre-workout. It's insane.", time: "9:00 AM", read: true },
      { id: 2, sender: "me", text: "What brand? I'm running low on mine", time: "9:15 AM", read: true },
      { id: 3, sender: "them", text: "Gorilla Mode. Seriously hits different", time: "9:16 AM", read: true },
      { id: 4, sender: "me", text: "I'll check it out. How was your session today?", time: "9:20 AM", read: true },
      { id: 5, sender: "them", text: "Just hit a new bench PR! 325 lbs", time: "9:22 AM", read: true },
    ],
  },
  {
    id: 3,
    name: "Mike Torres",
    avatar: "/images/avatar-3.jpg",
    lastMessage: "Down for a strongman session Saturday?",
    time: "3h ago",
    unread: 1,
    online: false,
    status: "Last seen 2 hours ago",
    messages: [
      { id: 1, sender: "them", text: "Yo I heard Iron Paradise got atlas stones now", time: "7:00 AM", read: true },
      { id: 2, sender: "me", text: "Wait fr? That's sick", time: "7:30 AM", read: true },
      { id: 3, sender: "them", text: "Down for a strongman session Saturday?", time: "7:31 AM", read: false },
    ],
  },
  {
    id: 4,
    name: "Aisha Williams",
    avatar: "/images/avatar-4.jpg",
    lastMessage: "Can you teach me proper clean form?",
    time: "1d ago",
    unread: 0,
    online: false,
    status: "Last seen yesterday",
    messages: [
      { id: 1, sender: "them", text: "Hey! Your profile says you know Olympic lifts?", time: "Yesterday", read: true },
      { id: 2, sender: "me", text: "Yeah I've been doing them for about 3 years now", time: "Yesterday", read: true },
      { id: 3, sender: "them", text: "Can you teach me proper clean form?", time: "Yesterday", read: true },
    ],
  },
]

export default function ChatPage() {
  const [activeConvoId, setActiveConvoId] = useState(1)
  const [showConvoList, setShowConvoList] = useState(true)
  const [message, setMessage] = useState("")
  const [chatMessages, setChatMessages] = useState<Record<number, Message[]>>(
    Object.fromEntries(conversations.map((c) => [c.id, c.messages]))
  )
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const activeConvo = conversations.find((c) => c.id === activeConvoId)!
  const activeMessages = chatMessages[activeConvoId] || []

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeMessages])

  const handleSend = () => {
    if (!message.trim()) return

    const newMsg: Message = {
      id: Date.now(),
      sender: "me",
      text: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
    }

    setChatMessages((prev) => ({
      ...prev,
      [activeConvoId]: [...(prev[activeConvoId] || []), newMsg],
    }))
    setMessage("")

    // Simulate typing + reply
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const replies = [
        "Let's go! 💪",
        "That's what I like to hear",
        "See you at the gym",
        "No excuses, only gains",
        "PRs don't hit themselves",
        "Heavy weight, light work",
      ]
      const reply: Message = {
        id: Date.now() + 1,
        sender: "them",
        text: replies[Math.floor(Math.random() * replies.length)],
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: false,
      }
      setChatMessages((prev) => ({
        ...prev,
        [activeConvoId]: [...(prev[activeConvoId] || []), reply],
      }))
    }, 1500 + Math.random() * 1500)
  }

  const selectConvo = (id: number) => {
    setActiveConvoId(id)
    setShowConvoList(false)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  return (
    <DashboardShell activeTab="Messages">
      <div className="mx-auto h-[calc(100vh-8rem)] max-w-5xl overflow-hidden rounded-sm border border-border bg-card">
        <div className="flex h-full">
          {/* Conversation List */}
          <div
            className={cn(
              "flex w-full flex-col border-r border-border md:w-80 md:flex-shrink-0",
              !showConvoList && "hidden md:flex"
            )}
          >
            {/* List Header */}
            <div className="flex items-center justify-between border-b border-border p-4">
              <h3 className="font-[var(--font-oswald)] text-lg font-bold uppercase tracking-wider text-foreground">
                Messages
              </h3>
              <div className="flex items-center gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Quick filters */}
            <div className="flex gap-2 border-b border-border p-3">
              {["All", "Unread", "Online"].map((filter, i) => (
                <button
                  key={filter}
                  className={cn(
                    "rounded-sm px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-all",
                    i === 0
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Conversation Items */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((convo) => (
                <button
                  key={convo.id}
                  onClick={() => selectConvo(convo.id)}
                  className={cn(
                    "flex w-full items-center gap-3 border-b border-border/50 p-4 text-left transition-all duration-200",
                    activeConvoId === convo.id
                      ? "bg-primary/5 border-l-2 border-l-primary"
                      : "hover:bg-secondary/50"
                  )}
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src={convo.avatar}
                        alt={convo.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {convo.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-green-500" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">{convo.name}</span>
                      <span className="text-[10px] text-muted-foreground">{convo.time}</span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">{convo.lastMessage}</p>
                  </div>

                  {/* Unread badge */}
                  {convo.unread > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                      {convo.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div
            className={cn(
              "flex flex-1 flex-col",
              showConvoList && "hidden md:flex"
            )}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-border p-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowConvoList(true)}
                  className="text-muted-foreground md:hidden"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={activeConvo.avatar}
                    alt={activeConvo.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{activeConvo.name}</h4>
                  <p className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    {activeConvo.online ? (
                      <>
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        {activeConvo.status}
                      </>
                    ) : (
                      activeConvo.status
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button className="flex h-9 w-9 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                  <Phone className="h-4 w-4" />
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                  <Video className="h-4 w-4" />
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Workout Quick-Share Bar */}
              <div className="mb-6 flex items-center gap-3 overflow-x-auto rounded-sm border border-border/50 bg-secondary/30 p-3">
                <span className="flex-shrink-0 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Quick:</span>
                {[
                  { icon: Dumbbell, label: "Share Workout" },
                  { icon: Clock, label: "Set Time" },
                  { icon: Flame, label: "PR Alert" },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="flex flex-shrink-0 items-center gap-1.5 rounded-sm border border-border bg-card px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
                  >
                    <action.icon className="h-3 w-3" />
                    {action.label}
                  </button>
                ))}
              </div>

              {/* Message bubbles */}
              <div className="flex flex-col gap-3">
                {activeMessages.map((msg, i) => {
                  const isMe = msg.sender === "me"
                  const showAvatar = !isMe && (i === 0 || activeMessages[i - 1]?.sender !== msg.sender)

                  return (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex items-end gap-2",
                        isMe ? "justify-end" : "justify-start"
                      )}
                    >
                      {!isMe && (
                        <div className="w-7 flex-shrink-0">
                          {showAvatar && (
                            <div className="h-7 w-7 overflow-hidden rounded-full">
                              <Image
                                src={activeConvo.avatar}
                                alt={activeConvo.name}
                                width={28}
                                height={28}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      )}
                      <div
                        className={cn(
                          "group relative max-w-[70%] rounded-sm px-4 py-2.5",
                          isMe
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-foreground"
                        )}
                      >
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                        <div className={cn(
                          "mt-1 flex items-center gap-1 text-[9px]",
                          isMe ? "justify-end text-primary-foreground/60" : "text-muted-foreground"
                        )}>
                          <span>{msg.time}</span>
                          {isMe && (
                            msg.read
                              ? <CheckCheck className="h-3 w-3" />
                              : <Check className="h-3 w-3" />
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-end gap-2">
                    <div className="h-7 w-7 overflow-hidden rounded-full">
                      <Image
                        src={activeConvo.avatar}
                        alt={activeConvo.name}
                        width={28}
                        height={28}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="rounded-sm bg-secondary px-4 py-3">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0ms" }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "150ms" }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-border p-4">
              <div className="flex items-center gap-3">
                <button className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                  <Paperclip className="h-5 w-5" />
                </button>
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    className="w-full rounded-sm border border-border bg-input py-3 pl-4 pr-12 text-sm text-foreground outline-none transition-all placeholder:text-gym-text-dim focus:border-primary/50"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground">
                    <Smile className="h-5 w-5" />
                  </button>
                </div>
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className={cn(
                    "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm transition-all duration-300",
                    message.trim()
                      ? "bg-primary text-primary-foreground shadow-[0_0_20px_oklch(0.65_0.25_25/0.3)] hover:shadow-[0_0_30px_oklch(0.65_0.25_25/0.5)]"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
