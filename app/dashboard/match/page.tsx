"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import {
  X,
  Heart,
  Dumbbell,
  MapPin,
  Clock,
  Target,
  Zap,
  ChevronLeft,
  ChevronRight,
  Star,
  Shield,
  Flame,
} from "lucide-react"
import { DashboardShell } from "@/components/dashboard-shell"
import { cn } from "@/lib/utils"

const partners = [
  {
    id: 1,
    name: "Sarah Chen",
    age: 26,
    image: "/images/avatar-2.jpg",
    gym: "Iron Paradise",
    distance: "0.5 mi",
    goal: "Powerlifting",
    experience: "3 Years",
    schedule: "Mornings (6-8 AM)",
    matchScore: 94,
    bio: "Competitive powerlifter. Currently prepping for my first meet. Looking for a dedicated spotter and someone to push each other on heavy days.",
    stats: { squat: "275 lb", bench: "155 lb", deadlift: "315 lb" },
    tags: ["Powerlifting", "Competition", "Morning Lifter"],
    verified: true,
  },
  {
    id: 2,
    name: "Jake Rivera",
    age: 29,
    image: "/images/avatar-1.jpg",
    gym: "Iron Paradise",
    distance: "1.2 mi",
    goal: "Hypertrophy",
    experience: "5 Years",
    schedule: "Evenings (6-8 PM)",
    matchScore: 87,
    bio: "Bodybuilding enthusiast training for classic physique. Need a training partner who understands the grind. Consistency is everything.",
    stats: { squat: "405 lb", bench: "315 lb", deadlift: "495 lb" },
    tags: ["Bodybuilding", "Classic Physique", "Experienced"],
    verified: true,
  },
  {
    id: 3,
    name: "Mike Torres",
    age: 31,
    image: "/images/avatar-3.jpg",
    gym: "FitZone Gym",
    distance: "2.1 mi",
    goal: "Strength",
    experience: "7 Years",
    schedule: "Mornings (5-7 AM)",
    matchScore: 82,
    bio: "Strongman competitor turned general strength athlete. Training partner flaked, looking for someone consistent who can handle heavy weight.",
    stats: { squat: "500 lb", bench: "365 lb", deadlift: "585 lb" },
    tags: ["Strongman", "Heavy Lifter", "Early Bird"],
    verified: false,
  },
  {
    id: 4,
    name: "Aisha Williams",
    age: 24,
    image: "/images/avatar-4.jpg",
    gym: "Iron Paradise",
    distance: "0.3 mi",
    goal: "CrossFit",
    experience: "2 Years",
    schedule: "Afternoons (3-5 PM)",
    matchScore: 78,
    bio: "CrossFit athlete looking to improve my Olympic lifts. Would love a partner who can coach and be coached. Team mentality all the way.",
    stats: { squat: "225 lb", bench: "135 lb", deadlift: "275 lb" },
    tags: ["CrossFit", "Olympic Lifting", "Team Player"],
    verified: true,
  },
]

export default function MatchPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)
  const [matches, setMatches] = useState<number[]>([])
  const [showMatch, setShowMatch] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const currentPartner = partners[currentIndex % partners.length]

  const handleSwipe = useCallback((direction: "left" | "right") => {
    setSwipeDirection(direction)
    if (direction === "right") {
      setMatches((prev) => [...prev, currentPartner.id])
      if (Math.random() > 0.4) {
        setTimeout(() => setShowMatch(true), 400)
      }
    }
    setTimeout(() => {
      setSwipeDirection(null)
      setCurrentIndex((prev) => prev + 1)
      setDragOffset(0)
    }, 400)
  }, [currentPartner.id])

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStart.current = e.clientX
    setIsDragging(true)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    const diff = e.clientX - dragStart.current
    setDragOffset(diff)
  }

  const handlePointerUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    if (Math.abs(dragOffset) > 120) {
      handleSwipe(dragOffset > 0 ? "right" : "left")
    } else {
      setDragOffset(0)
    }
  }

  const getCardStyle = () => {
    const offset = swipeDirection === "left" ? -600 : swipeDirection === "right" ? 600 : dragOffset
    const rotate = offset * 0.05
    const opacity = swipeDirection ? 0 : 1
    return {
      transform: `translateX(${offset}px) rotate(${rotate}deg)`,
      opacity,
      transition: swipeDirection || !isDragging ? "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
    }
  }

  return (
    <DashboardShell activeTab="Match">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        {/* Header Stats */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-[var(--font-oswald)] text-2xl font-bold uppercase tracking-wider text-foreground">
              Find Your Partner
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Swipe right to match, left to skip
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-sm border border-border bg-card px-4 py-2">
              <Heart className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">{matches.length}</span>
              <span className="text-xs text-muted-foreground">matches</span>
            </div>
            <div className="flex items-center gap-2 rounded-sm border border-border bg-card px-4 py-2">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-semibold text-foreground">{currentIndex}</span>
              <span className="text-xs text-muted-foreground">viewed</span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Card Area */}
          <div className="relative flex items-center justify-center lg:col-span-2">
            <div className="relative h-[600px] w-full max-w-md">
              {/* Background ghost card */}
              <div className="absolute inset-4 rounded-sm border border-border/50 bg-card/50" />

              {/* Main Card */}
              <div
                ref={cardRef}
                style={getCardStyle()}
                className="absolute inset-0 cursor-grab select-none overflow-hidden rounded-sm border border-border bg-card shadow-2xl active:cursor-grabbing"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
              >
                {/* Image */}
                <div className="relative h-[55%] overflow-hidden">
                  <Image
                    src={currentPartner.image}
                    alt={currentPartner.name}
                    fill
                    className="object-cover"
                    draggable={false}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

                  {/* Match score */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-sm bg-background/80 px-3 py-1.5 backdrop-blur-sm">
                    <Zap className="h-3.5 w-3.5 text-primary" />
                    <span className="text-sm font-bold text-primary">{currentPartner.matchScore}%</span>
                  </div>

                  {/* Verified badge */}
                  {currentPartner.verified && (
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-sm bg-blue-500/20 px-2.5 py-1 backdrop-blur-sm">
                      <Shield className="h-3 w-3 text-blue-400" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400">Verified</span>
                    </div>
                  )}

                  {/* Swipe indicators */}
                  {dragOffset > 60 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-green-500/10">
                      <div className="rounded-sm border-2 border-green-500 px-6 py-2 text-xl font-bold uppercase text-green-500"
                        style={{ transform: `rotate(-15deg)` }}>
                        Match
                      </div>
                    </div>
                  )}
                  {dragOffset < -60 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-red-500/10">
                      <div className="rounded-sm border-2 border-red-400 px-6 py-2 text-xl font-bold uppercase text-red-400"
                        style={{ transform: `rotate(15deg)` }}>
                        Skip
                      </div>
                    </div>
                  )}

                  {/* Name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="font-[var(--font-oswald)] text-2xl font-bold uppercase text-foreground">
                          {currentPartner.name}, {currentPartner.age}
                        </h3>
                        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {currentPartner.gym} &middot; {currentPartner.distance}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex h-[45%] flex-col p-5">
                  <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {currentPartner.bio}
                  </p>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {currentPartner.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Quick Stats */}
                  <div className="mt-auto grid grid-cols-3 gap-3 border-t border-border pt-4">
                    <div className="text-center">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Goal</div>
                      <div className="mt-0.5 text-xs font-semibold text-foreground">{currentPartner.goal}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Experience</div>
                      <div className="mt-0.5 text-xs font-semibold text-foreground">{currentPartner.experience}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Schedule</div>
                      <div className="mt-0.5 text-xs font-semibold text-foreground">{currentPartner.schedule.split(" ")[0]}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="absolute -bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4">
              <button
                onClick={() => handleSwipe("left")}
                className="group flex h-14 w-14 items-center justify-center rounded-full border-2 border-border bg-card shadow-lg transition-all duration-300 hover:border-red-500 hover:bg-red-500/10 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]"
              >
                <X className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-red-500" />
              </button>
              <button
                onClick={() => handleSwipe("right")}
                className="group flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10 shadow-lg transition-all duration-300 hover:bg-primary hover:shadow-[0_0_40px_oklch(0.65_0.25_25/0.4)]"
              >
                <Heart className="h-7 w-7 text-primary transition-colors group-hover:text-primary-foreground" />
              </button>
              <button className="group flex h-14 w-14 items-center justify-center rounded-full border-2 border-border bg-card shadow-lg transition-all duration-300 hover:border-blue-500 hover:bg-blue-500/10 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                <Star className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-blue-500" />
              </button>
            </div>
          </div>

          {/* Right Panel - Detailed Stats */}
          <div className="flex flex-col gap-4">
            {/* Lift Stats */}
            <div className="rounded-sm border border-border bg-card p-5">
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Lift Numbers
              </h4>
              <div className="mt-4 flex flex-col gap-3">
                {Object.entries(currentPartner.stats).map(([lift, weight]) => (
                  <div key={lift}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium capitalize text-foreground">{lift}</span>
                      <span className="font-[var(--font-oswald)] text-sm font-bold text-primary">{weight}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-1000"
                        style={{ width: `${Math.min((parseInt(weight) / 600) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="rounded-sm border border-border bg-card p-5">
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Preferred Schedule
              </h4>
              <div className="mt-3 flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">{currentPartner.schedule}</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">{currentPartner.goal}</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Dumbbell className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">{currentPartner.experience}</span>
              </div>
            </div>

            {/* Compatibility */}
            <div className="rounded-sm border border-primary/20 bg-primary/5 p-5">
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                Compatibility Score
              </h4>
              <div className="mt-3 flex items-end gap-2">
                <span className="font-[var(--font-oswald)] text-4xl font-bold text-primary">
                  {currentPartner.matchScore}
                </span>
                <span className="mb-1 text-sm text-primary/60">/ 100</span>
              </div>
              <div className="mt-3 flex flex-col gap-2">
                {[
                  { label: "Goal Match", value: 92 },
                  { label: "Schedule Overlap", value: 85 },
                  { label: "Experience Level", value: 78 },
                  { label: "Location", value: 96 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-semibold text-foreground">{item.value}%</span>
                    </div>
                    <div className="mt-1 h-1 overflow-hidden rounded-full bg-background">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-1000"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation hint */}
            <div className="flex items-center justify-center gap-6 py-2">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ChevronLeft className="h-3 w-3" />
                <span>Skip</span>
              </div>
              <div className="text-xs text-gym-text-dim">or drag card</div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span>Match</span>
                <ChevronRight className="h-3 w-3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Match Popup */}
      {showMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md">
          <div className="animate-scale-in flex flex-col items-center gap-6 text-center">
            <div className="animate-pulse-glow flex h-24 w-24 items-center justify-center rounded-full bg-primary/20">
              <Zap className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h2 className="font-[var(--font-oswald)] text-4xl font-bold uppercase text-foreground">
                {"It's a Match!"}
              </h2>
              <p className="mt-2 text-muted-foreground">
                You and {currentPartner.name} are ready to train together
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowMatch(false)}
                className="rounded-sm border border-border px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-all hover:border-foreground hover:text-foreground"
              >
                Keep Swiping
              </button>
              <button
                onClick={() => setShowMatch(false)}
                className="rounded-sm bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-[0_0_30px_oklch(0.65_0.25_25/0.4)]"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
