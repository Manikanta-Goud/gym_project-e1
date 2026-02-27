"use client"

import { useState } from "react"
import {
  User,
  Camera,
  Clock,
  Target,
  Calendar,
  Flame,
  MapPin,
  Award,
  Edit3,
  Check,
  TrendingUp,
} from "lucide-react"
import { DashboardShell } from "@/components/dashboard-shell"
import { cn } from "@/lib/utils"

const schedule = [
  { day: "Mon", active: true, time: "Morning" },
  { day: "Tue", active: true, time: "Morning" },
  { day: "Wed", active: false, time: "" },
  { day: "Thu", active: true, time: "Evening" },
  { day: "Fri", active: true, time: "Morning" },
  { day: "Sat", active: true, time: "Afternoon" },
  { day: "Sun", active: false, time: "" },
]

const achievements = [
  { label: "First Match", icon: "lightning", unlocked: true },
  { label: "10 Sessions", icon: "fire", unlocked: true },
  { label: "PR Breaker", icon: "trophy", unlocked: true },
  { label: "Social Butterfly", icon: "users", unlocked: false },
  { label: "Iron Veteran", icon: "medal", unlocked: false },
  { label: "Travel Rat", icon: "globe", unlocked: false },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <DashboardShell activeTab="Profile">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-6">
          {/* Profile Header Card */}
          <div className="relative overflow-hidden rounded-sm border border-border bg-card">
            {/* Banner */}
            <div className="relative h-32 bg-gradient-to-r from-primary/20 via-primary/5 to-transparent md:h-40">
              <div className="absolute inset-0" style={{
                backgroundImage: "linear-gradient(135deg, oklch(0.65 0.25 25 / 0.1) 25%, transparent 25%, transparent 50%, oklch(0.65 0.25 25 / 0.1) 50%, oklch(0.65 0.25 25 / 0.1) 75%, transparent 75%)",
                backgroundSize: "20px 20px",
              }} />
            </div>

            <div className="relative px-6 pb-6 md:px-8">
              {/* Avatar */}
              <div className="relative -mt-16 mb-4 inline-block">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-card bg-primary/10 md:h-32 md:w-32">
                  <User className="h-14 w-14 text-primary" />
                </div>
                <button className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110">
                  <Camera className="h-4 w-4" />
                </button>
                {/* Online indicator */}
                <span className="absolute top-2 right-2 h-4 w-4 rounded-full border-2 border-card bg-green-500" />
              </div>

              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-[var(--font-oswald)] text-3xl font-bold uppercase text-foreground">
                    Marcus Johnson
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">@marcus_lifts</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1.5 rounded-sm bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      <Target className="h-3 w-3" />
                      Powerlifting
                    </span>
                    <span className="flex items-center gap-1.5 rounded-sm bg-secondary px-3 py-1 text-xs font-semibold text-foreground">
                      <Award className="h-3 w-3" />
                      Advanced
                    </span>
                    <span className="flex items-center gap-1.5 rounded-sm bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      Iron Paradise Gym
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={cn(
                    "flex items-center gap-2 rounded-sm px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300",
                    isEditing
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  )}
                >
                  {isEditing ? (
                    <>
                      <Check className="h-3 w-3" />
                      Save Profile
                    </>
                  ) : (
                    <>
                      <Edit3 className="h-3 w-3" />
                      Edit Profile
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column */}
            <div className="flex flex-col gap-6 lg:col-span-2">
              {/* Bio */}
              <div className="rounded-sm border border-border bg-card p-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  About
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  Competitive powerlifter chasing the 1500 total. 5 years of training experience.
                  Looking for a dedicated training partner who takes the sport seriously.
                  I train at Iron Paradise Gym, mornings before work. Let us push some heavy weight together.
                </p>
              </div>

              {/* Weekly Schedule */}
              <div className="rounded-sm border border-border bg-card p-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Weekly Schedule
                </h3>
                <div className="mt-4 grid grid-cols-7 gap-2">
                  {schedule.map((s) => (
                    <div
                      key={s.day}
                      className={cn(
                        "flex flex-col items-center gap-1.5 rounded-sm border p-3 transition-all",
                        s.active
                          ? "border-primary/30 bg-primary/5"
                          : "border-border bg-secondary/30"
                      )}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        {s.day}
                      </span>
                      {s.active ? (
                        <>
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span className="text-[9px] text-primary">{s.time}</span>
                        </>
                      ) : (
                        <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  { label: "Total Sessions", value: "247", icon: Flame },
                  { label: "Partners", value: "12", icon: User },
                  { label: "Current Streak", value: "12d", icon: TrendingUp },
                  { label: "PRs Set", value: "31", icon: Award },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center rounded-sm border border-border bg-card p-5 text-center"
                  >
                    <stat.icon className="h-5 w-5 text-primary" />
                    <span className="mt-2 font-[var(--font-oswald)] text-2xl font-bold text-foreground">
                      {stat.value}
                    </span>
                    <span className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
              {/* Quick Info */}
              <div className="rounded-sm border border-border bg-card p-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Details
                </h3>
                <div className="mt-4 flex flex-col gap-4">
                  {[
                    { label: "Age", value: "28" },
                    { label: "Goal", value: "Powerlifting" },
                    { label: "Experience", value: "5 Years" },
                    { label: "Timing", value: "Morning (5-7 AM)" },
                    { label: "Home Gym", value: "Iron Paradise" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                      <span className="text-sm font-medium text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="rounded-sm border border-border bg-card p-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Achievements
                </h3>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {achievements.map((a) => (
                    <div
                      key={a.label}
                      className={cn(
                        "flex flex-col items-center gap-1.5 rounded-sm border p-3 text-center transition-all",
                        a.unlocked
                          ? "border-primary/20 bg-primary/5"
                          : "border-border bg-secondary/30 opacity-40"
                      )}
                    >
                      <div className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full",
                        a.unlocked ? "bg-primary/20" : "bg-secondary"
                      )}>
                        <Award className={cn("h-4 w-4", a.unlocked ? "text-primary" : "text-muted-foreground")} />
                      </div>
                      <span className="text-[9px] font-semibold uppercase leading-tight text-muted-foreground">
                        {a.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
