"use client"

import { useState, useEffect } from "react"
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

const defaultSchedule = [
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
  const [userData, setUserData] = useState<any>(null)
  const [editForm, setEditForm] = useState<any>({})
  const [schedule, setSchedule] = useState<any[]>(defaultSchedule)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Support viewing other profiles via ID
  const [viewingProfileId, setViewingProfileId] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")
    setViewingProfileId(id)
  }, [])

  useEffect(() => {
    // Set fallback name from localStorage if available
    const storedName = localStorage.getItem("userName")
    const storedGymId = localStorage.getItem("userGymId")
    if (storedName) {
      setUserData((prev: any) => ({ ...prev, name: storedName }))
    }

    const fetchUser = async () => {
      let fetchUrl = ""
      if (viewingProfileId) {
        fetchUrl = `http://${window.location.hostname}:8080/api/users/${viewingProfileId}`
      } else {
        const email = localStorage.getItem("userEmail")
        if (email) {
          fetchUrl = `http://${window.location.hostname}:8080/api/users/email/${email}`
        }
      }

      if (fetchUrl) {
        try {
          const res = await fetch(fetchUrl)
          if (res.ok) {
            const data = await res.json()
            setUserData((prev: any) => ({ ...prev, ...data }))
            setEditForm(data)
            if (data.weeklySchedule) {
               try {
                   setSchedule(JSON.parse(data.weeklySchedule))
               } catch(e) { console.error(e) }
            }
          }
        } catch (e) {
          console.error("Failed to fetch user data:", e)
        }
      }
      setLoading(false)
    }

    if (viewingProfileId !== undefined) {
        fetchUser()
    }
  }, [viewingProfileId])

  const handleSave = async () => {
    if (!userData?.id) return
    setIsSaving(true)
    const payload = { ...editForm, weeklySchedule: JSON.stringify(schedule) }
    try {
      const res = await fetch(`http://${window.location.hostname}:8080/api/users/${userData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        if (res.ok) {
          const updated = await res.json()
          setUserData(updated)
          setIsEditing(false)
        } else {
          const errText = await res.text();
          console.error("Server error:", res.status, errText);
          alert(`Failed to save: ${res.status}`);
        }
    } catch (e: any) {
      console.error("Failed to update profile:", e);
      alert(`Network Error: ${e.message}. Is the backend running?`);
    } finally {
      setIsSaving(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditForm((prev: any) => ({ ...prev, [name]: value }))
  }

  const handlePhotoClick = () => {
    if (!isEditing) return
    const input = document.getElementById("photo-upload") as HTMLInputElement
    if (input) input.click()
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const img = new Image()
        img.src = reader.result as string
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const MAX_WIDTH = 400
          const MAX_HEIGHT = 400
          let width = img.width
          let height = img.height

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width
              width = MAX_WIDTH
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height
              height = MAX_HEIGHT
            }
          }
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx?.drawImage(img, 0, 0, width, height)
          const dataUrl = canvas.toDataURL('image/jpeg', 0.6) // Compress to 60% quality
          setEditForm((prev: any) => ({ ...prev, photoUrl: dataUrl }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleDay = (index: number) => {
     if (!isEditing) return
     const newSchedule = [...schedule]
     newSchedule[index].active = !newSchedule[index].active
     if (newSchedule[index].active && !newSchedule[index].time) {
         newSchedule[index].time = "Morning"
     }
     setSchedule(newSchedule)
  }

  const changeTime = (index: number) => {
      if (!isEditing) return
      const times = ["Morning", "Afternoon", "Evening", ""]
      const newSchedule = [...schedule]
      const currentIdx = times.indexOf(newSchedule[index].time)
      newSchedule[index].time = times[(currentIdx + 1) % times.length]
      if (!newSchedule[index].time) newSchedule[index].active = false
      setSchedule(newSchedule)
  }

  const displayData = {
    name: editForm.name || userData?.name || "Marcus Johnson",
    username: editForm.username || userData?.username || (userData?.name ? userData.name.toLowerCase().replace(/\s+/g, '_') : "marcus_lifts"),
    goal: editForm.fitnessGoal || userData?.fitnessGoal || "Powerlifting",
    experience: editForm.experience || userData?.experience || "Advanced",
    gym: editForm.homeGym || userData?.homeGym || userData?.gym?.name || "Iron Paradise Gym",
    bio: editForm.bio || userData?.bio || "No bio yet.",
    age: editForm.age?.toString() || userData?.age?.toString() || "28",
    timing: editForm.timing || userData?.timing || "Morning (5-7 AM)",
    photoUrl: editForm.photoUrl || userData?.photoUrl || "",
  }

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
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-card bg-primary/10 md:h-32 md:w-32">
                  {displayData.photoUrl ? (
                    <img src={displayData.photoUrl} alt={displayData.name} className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-14 w-14 text-primary" />
                  )}
                </div>
                {!viewingProfileId && (
                  <>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                    <button 
                      onClick={handlePhotoClick}
                      className={cn(
                        "absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110",
                        !isEditing && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                  </>
                )}
                {/* Online indicator */}
                <span className="absolute top-2 right-2 h-4 w-4 rounded-full border-2 border-card bg-green-500" />
              </div>

              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="flex-1">
                  {isEditing ? (
                    <div className="flex flex-col gap-2">
                       <input
                        name="name"
                        value={editForm.name || ""}
                        onChange={handleInputChange}
                        className="w-full bg-background/50 border border-border p-1 text-2xl font-bold uppercase"
                      />
                      <input
                        name="username"
                        value={editForm.username || ""}
                        onChange={handleInputChange}
                        className="w-full bg-background/50 border border-border p-1 text-sm text-muted-foreground"
                        placeholder="username"
                      />
                    </div>
                  ) : (
                    <>
                      <h2 className="font-[var(--font-oswald)] text-3xl font-bold uppercase text-foreground">
                        {displayData.name}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">@{displayData.username}</p>
                    </>
                  )}
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    {isEditing ? (
                      <>
                        <input name="fitnessGoal" value={editForm.fitnessGoal || ""} onChange={handleInputChange} className="rounded-sm bg-primary/10 px-2 py-1 text-xs text-primary border border-primary/20" placeholder="Goal" />
                        <input name="experience" value={editForm.experience || ""} onChange={handleInputChange} className="rounded-sm bg-secondary px-2 py-1 text-xs text-foreground border border-border" placeholder="Experience" />
                        <input name="homeGym" value={editForm.homeGym || ""} onChange={handleInputChange} className="rounded-sm bg-secondary px-2 py-1 text-xs text-muted-foreground border border-border" placeholder="Home Gym" />
                      </>
                    ) : (
                      <>
                        <span className="flex items-center gap-1.5 rounded-sm bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                          <Target className="h-3 w-3" />
                          {displayData.goal}
                        </span>
                        <span className="flex items-center gap-1.5 rounded-sm bg-secondary px-3 py-1 text-xs font-semibold text-foreground">
                          <Award className="h-3 w-3" />
                          {displayData.experience}
                        </span>
                        <span className="flex items-center gap-1.5 rounded-sm bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {displayData.gym}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {!viewingProfileId && (
                  <button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    disabled={isSaving}
                    className={cn(
                      "flex items-center gap-2 rounded-sm px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300",
                      isEditing
                        ? "bg-primary text-primary-foreground"
                        : "border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    )}
                  >
                    {isSaving ? "Saving..." : isEditing ? (
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
                )}
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
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={editForm.bio || ""}
                    onChange={handleInputChange}
                    rows={4}
                    className="mt-3 w-full bg-background/50 border border-border p-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                  />
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-foreground">
                    {displayData.bio}
                  </p>
                )}
              </div>

              {/* Weekly Schedule */}
              <div className="rounded-sm border border-border bg-card p-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Weekly Schedule
                </h3>
                <div className="mt-4 grid grid-cols-7 gap-2">
                  {schedule.map((s, idx) => (
                    <div
                      key={s.day}
                      onClick={() => isEditing ? toggleDay(idx) : null}
                      className={cn(
                        "flex flex-col items-center gap-1.5 rounded-sm border p-3 transition-all",
                        s.active
                          ? "border-primary/30 bg-primary/5 shadow-[0_0_10px_rgba(var(--primary-rgb),0.1)]"
                          : "border-border bg-secondary/30",
                        isEditing ? "cursor-pointer hover:border-primary/50" : ""
                      )}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        {s.day}
                      </span>
                      {s.active ? (
                        <>
                          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                          <span 
                            onClick={(e) => { e.stopPropagation(); changeTime(idx); }}
                            className={cn("text-[9px] text-primary", isEditing ? "underline decoration-dotted" : "")}
                          >
                            {s.time}
                          </span>
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
                  { label: "Total Sessions", value: "12", icon: Flame },
                  { label: "Partners", value: "12d", icon: User },
                  { label: "Current Streak", value: "31", icon: TrendingUp },
                  { label: "PRs Set", value: "Details", icon: Award },
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
                    { label: "Age", value: displayData.age, name: "age" },
                    { label: "Goal", value: displayData.goal, name: "fitnessGoal" },
                    { label: "Experience", value: displayData.experience, name: "experience" },
                    { label: "Timing", value: displayData.timing, name: "timing" },
                    { label: "Home Gym", value: displayData.gym, name: "homeGym" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                      {isEditing ? (
                        <input
                          name={item.name}
                          value={editForm[item.name] || ""}
                          onChange={handleInputChange}
                          className="w-1/2 bg-background/50 border border-border p-1 text-xs text-right text-foreground"
                        />
                      ) : (
                        <span className="text-sm font-medium text-foreground">{item.value}</span>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <div className="flex items-center justify-between">
                       <span className="text-xs text-muted-foreground">Photo URL</span>
                       <input
                          name="photoUrl"
                          value={editForm.photoUrl || ""}
                          onChange={handleInputChange}
                          className="w-1/2 bg-background/50 border border-border p-1 text-xs text-right text-foreground"
                          placeholder="Image URL"
                        />
                    </div>
                  )}
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
