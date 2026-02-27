"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Play,
  ChevronRight,
  Flame,
  Target,
  Clock,
  AlertTriangle,
  CheckCircle2,
  X,
  Dumbbell,
} from "lucide-react"
import { DashboardShell } from "@/components/dashboard-shell"
import { cn } from "@/lib/utils"

const muscleGroups = ["All", "Chest", "Back", "Shoulders", "Legs", "Arms", "Core"]

const exercises = [
  {
    id: 1,
    name: "Barbell Bench Press",
    muscle: "Chest",
    secondary: "Triceps, Shoulders",
    level: "Intermediate",
    instructions: [
      "Lie flat on bench with feet firmly on the floor",
      "Grip the bar slightly wider than shoulder-width",
      "Unrack the bar and lower it to mid-chest",
      "Press the bar back up to full arm extension",
      "Keep your back flat and core engaged throughout",
    ],
    mistakes: ["Flaring elbows too wide", "Bouncing bar off chest", "Lifting hips off bench"],
    tips: "Focus on a controlled descent. Squeeze your shoulder blades together for stability.",
  },
  {
    id: 2,
    name: "Barbell Back Squat",
    muscle: "Legs",
    secondary: "Glutes, Core",
    level: "Intermediate",
    instructions: [
      "Position the bar on your upper traps",
      "Stand with feet shoulder-width apart",
      "Descend by bending knees and pushing hips back",
      "Go to parallel or below, then drive back up",
      "Keep your chest up and knees tracking over toes",
    ],
    mistakes: ["Knees caving inward", "Rounding lower back", "Not hitting depth"],
    tips: "Brace your core hard before each rep. Think about pushing the floor away.",
  },
  {
    id: 3,
    name: "Conventional Deadlift",
    muscle: "Back",
    secondary: "Hamstrings, Glutes",
    level: "Advanced",
    instructions: [
      "Stand with feet hip-width, bar over mid-foot",
      "Hinge at hips and grip the bar just outside knees",
      "Flatten your back and engage your lats",
      "Drive through your feet and stand tall",
      "Reverse the motion to lower the bar under control",
    ],
    mistakes: ["Rounding the lower back", "Jerking the bar off the floor", "Bar drifting away from body"],
    tips: "Think of it as pushing the floor away, not pulling the bar up.",
  },
  {
    id: 4,
    name: "Overhead Press",
    muscle: "Shoulders",
    secondary: "Triceps, Core",
    level: "Intermediate",
    instructions: [
      "Start with bar at collarbone height",
      "Grip slightly wider than shoulder-width",
      "Press the bar overhead to full lockout",
      "Move your head forward once bar passes",
      "Lower under control back to starting position",
    ],
    mistakes: ["Excessive back lean", "Not locking out at top", "Pressing in front instead of overhead"],
    tips: "Squeeze your glutes and brace your core to prevent excessive lean.",
  },
  {
    id: 5,
    name: "Barbell Curl",
    muscle: "Arms",
    secondary: "Forearms",
    level: "Beginner",
    instructions: [
      "Stand with feet shoulder-width apart",
      "Grip bar at shoulder width with underhand grip",
      "Curl the bar up towards your shoulders",
      "Squeeze biceps hard at the top",
      "Lower slowly back to starting position",
    ],
    mistakes: ["Swinging the body", "Using momentum", "Not controlling the negative"],
    tips: "Keep your elbows pinned to your sides. Control the weight on the way down.",
  },
  {
    id: 6,
    name: "Hanging Leg Raise",
    muscle: "Core",
    secondary: "Hip Flexors",
    level: "Advanced",
    instructions: [
      "Hang from a pull-up bar with straight arms",
      "Keep legs straight or slightly bent",
      "Raise legs until they are parallel to ground or higher",
      "Hold briefly at the top",
      "Lower legs slowly under control",
    ],
    mistakes: ["Swinging for momentum", "Not engaging core", "Dropping legs too fast"],
    tips: "Initiate the movement from your lower abs, not your hip flexors.",
  },
]

const workoutPlans = [
  {
    name: "Beginner Foundation",
    level: "Beginner",
    days: 3,
    description: "Full body workouts to build a solid base",
    exercises: 15,
  },
  {
    name: "Intermediate Push/Pull/Legs",
    level: "Intermediate",
    days: 5,
    description: "Classic PPL split for muscle growth",
    exercises: 30,
  },
  {
    name: "Advanced Powerbuilding",
    level: "Advanced",
    days: 6,
    description: "Strength meets hypertrophy for experienced lifters",
    exercises: 42,
  },
]

export default function ExercisesPage() {
  const [selectedGroup, setSelectedGroup] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedExercise, setSelectedExercise] = useState<typeof exercises[0] | null>(null)
  const [activeTab, setActiveTab] = useState<"exercises" | "plans">("exercises")

  const filtered = exercises.filter((e) => {
    const matchesGroup = selectedGroup === "All" || e.muscle === selectedGroup
    const matchesSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesGroup && matchesSearch
  })

  return (
    <DashboardShell activeTab="Exercises">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-[var(--font-oswald)] text-2xl font-bold uppercase text-foreground md:text-3xl">
              Exercise Library
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Master your form. Maximize your gains.
            </p>
          </div>

          {/* Tab toggle */}
          <div className="flex rounded-sm border border-border">
            <button
              onClick={() => setActiveTab("exercises")}
              className={cn(
                "px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all",
                activeTab === "exercises"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Exercises
            </button>
            <button
              onClick={() => setActiveTab("plans")}
              className={cn(
                "px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all",
                activeTab === "plans"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Workout Plans
            </button>
          </div>
        </div>

        {activeTab === "exercises" ? (
          <>
            {/* Search & Filters */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search exercises (e.g., Bench Press, Squat...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-sm border border-border bg-input py-3 pl-10 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-gym-text-dim focus:border-primary/50 focus:shadow-[0_0_20px_oklch(0.65_0.25_25/0.1)]"
                />
              </div>
            </div>

            {/* Muscle Group Filter */}
            <div className="flex flex-wrap gap-2">
              {muscleGroups.map((group) => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={cn(
                    "rounded-sm border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300",
                    selectedGroup === group
                      ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_oklch(0.65_0.25_25/0.15)]"
                      : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  )}
                >
                  {group}
                </button>
              ))}
            </div>

            {/* Exercise Grid */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((exercise) => (
                <button
                  key={exercise.id}
                  onClick={() => setSelectedExercise(exercise)}
                  className="group relative flex flex-col overflow-hidden rounded-sm border border-border bg-card p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_4px_20px_oklch(0_0_0/0.3)]"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary/10">
                      <Dumbbell className="h-5 w-5 text-primary" />
                    </div>
                    <span
                      className={cn(
                        "rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                        exercise.level === "Beginner"
                          ? "bg-green-500/10 text-green-400"
                          : exercise.level === "Intermediate"
                          ? "bg-yellow-500/10 text-yellow-400"
                          : "bg-primary/10 text-primary"
                      )}
                    >
                      {exercise.level}
                    </span>
                  </div>

                  <h3 className="mt-4 font-[var(--font-oswald)] text-lg font-semibold uppercase text-foreground">
                    {exercise.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="rounded-sm bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase text-primary">
                      {exercise.muscle}
                    </span>
                    <span className="text-xs text-muted-foreground">{exercise.secondary}</span>
                  </div>

                  <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {exercise.tips}
                  </p>

                  {/* Hover accent */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                </button>
              ))}
            </div>
          </>
        ) : (
          /* Workout Plans */
          <div className="grid gap-6 md:grid-cols-3">
            {workoutPlans.map((plan) => (
              <div
                key={plan.name}
                className="group relative overflow-hidden rounded-sm border border-border bg-card transition-all duration-500 hover:border-primary/30"
              >
                {/* Header bar */}
                <div
                  className={cn(
                    "p-6",
                    plan.level === "Beginner"
                      ? "bg-green-500/5 border-b border-green-500/20"
                      : plan.level === "Intermediate"
                      ? "bg-yellow-500/5 border-b border-yellow-500/20"
                      : "bg-primary/5 border-b border-primary/20"
                  )}
                >
                  <span
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-[0.3em]",
                      plan.level === "Beginner"
                        ? "text-green-400"
                        : plan.level === "Intermediate"
                        ? "text-yellow-400"
                        : "text-primary"
                    )}
                  >
                    {plan.level}
                  </span>
                  <h3 className="mt-2 font-[var(--font-oswald)] text-xl font-bold uppercase text-foreground">
                    {plan.name}
                  </h3>
                </div>

                <div className="p-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">{plan.description}</p>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{plan.days} days/week</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{plan.exercises} exercises</span>
                    </div>
                  </div>

                  <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-sm bg-primary/10 py-3 text-xs font-semibold uppercase tracking-wider text-primary transition-all hover:bg-primary/20">
                    View Full Plan
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedExercise(null)}>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <div
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-sm border border-border bg-card p-8 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedExercise(null)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-primary/10">
                <Dumbbell className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-[var(--font-oswald)] text-2xl font-bold uppercase text-foreground">
                  {selectedExercise.name}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="rounded-sm bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    {selectedExercise.muscle}
                  </span>
                  <span className="text-xs text-muted-foreground">{selectedExercise.secondary}</span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-8">
              <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Step-by-Step Instructions
              </h4>
              <div className="mt-4 flex flex-col gap-3">
                {selectedExercise.instructions.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="mt-8">
              <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                Common Mistakes
              </h4>
              <div className="mt-4 flex flex-col gap-2">
                {selectedExercise.mistakes.map((mistake, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-sm border border-yellow-500/10 bg-yellow-500/5 px-4 py-2.5">
                    <X className="h-3 w-3 shrink-0 text-yellow-400" />
                    <p className="text-sm text-muted-foreground">{mistake}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Tips */}
            <div className="mt-8 rounded-sm border border-primary/20 bg-primary/5 p-5">
              <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <Flame className="h-4 w-4" />
                Pro Tip
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {selectedExercise.tips}
              </p>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
