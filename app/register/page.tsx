"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Dumbbell, Eye, EyeOff, ArrowRight, Loader2, Check } from "lucide-react"

const fitnessGoals = ["Bulking", "Cutting", "Strength", "Cardio"]
const experienceLevels = ["Beginner", "Intermediate", "Advanced"]

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    fitnessGoal: "",
    experience: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
      return
    }
    setLoading(true)
    setTimeout(() => {
      router.push("/dashboard")
    }, 1200)
  }

  return (
    <div className="flex min-h-screen">
      {/* Left - Form Side */}
      <div className="flex w-full flex-col justify-center px-8 lg:w-1/2 lg:px-20 xl:px-28">
        {/* Logo */}
        <Link href="/" className="mb-12 flex items-center gap-2 self-start">
          <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-primary">
            <Dumbbell className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-[var(--font-oswald)] text-xl font-bold uppercase tracking-wider text-foreground">
            GymRats
          </span>
        </Link>

        {/* Step indicator */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {step > 1 ? <Check className="h-4 w-4" /> : "1"}
          </div>
          <span className={`h-px w-12 ${step > 1 ? "bg-primary" : "bg-border"}`} />
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
              step >= 2
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground"
            }`}
          >
            2
          </div>
        </div>

        <div>
          <h1 className="font-[var(--font-oswald)] text-3xl font-bold uppercase text-foreground md:text-4xl">
            {step === 1 ? "Create Account" : "Your Fitness Profile"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {step === 1 ? (
              <>
                {"Join the community. Already have an account? "}
                <Link href="/login" className="text-primary transition-colors hover:text-gym-red-bright">
                  Log in
                </Link>
              </>
            ) : (
              "Help us find your perfect gym partner."
            )}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          {step === 1 ? (
            <>
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="rounded-sm border border-border bg-input px-4 py-3.5 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-gym-text-dim focus:border-primary focus:shadow-[0_0_20px_oklch(0.65_0.25_25/0.15)]"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-sm border border-border bg-input px-4 py-3.5 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-gym-text-dim focus:border-primary focus:shadow-[0_0_20px_oklch(0.65_0.25_25/0.15)]"
                  placeholder="your@email.com"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full rounded-sm border border-border bg-input px-4 py-3.5 pr-12 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-gym-text-dim focus:border-primary focus:shadow-[0_0_20px_oklch(0.65_0.25_25/0.15)]"
                    placeholder="Min 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Fitness Goal */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Fitness Goal
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {fitnessGoals.map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => setFormData({ ...formData, fitnessGoal: goal })}
                      className={`rounded-sm border px-4 py-3 text-sm font-medium transition-all duration-300 ${
                        formData.fitnessGoal === goal
                          ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_oklch(0.65_0.25_25/0.15)]"
                          : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Experience Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {experienceLevels.map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData({ ...formData, experience: level })}
                      className={`rounded-sm border px-4 py-3 text-sm font-medium transition-all duration-300 ${
                        formData.experience === level
                          ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_oklch(0.65_0.25_25/0.15)]"
                          : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="group mt-4 flex items-center justify-center gap-2 rounded-sm bg-primary px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.65_0.25_25/0.4)] disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                {step === 1 ? "Continue" : "Start Matching"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>

          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Back to previous step
            </button>
          )}
        </form>

        {step === 1 && (
          <>
            <div className="mt-6 flex items-center gap-4">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs uppercase tracking-wider text-muted-foreground">or</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 rounded-sm border border-border px-4 py-3 text-sm text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:text-foreground">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 rounded-sm border border-border px-4 py-3 text-sm text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:text-foreground">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </button>
            </div>
          </>
        )}
      </div>

      {/* Right - Image Side */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <Image
          src="/images/partner-workout.jpg"
          alt="Training partners working out"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background" />

        <div className="absolute bottom-16 right-16 z-10 text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Join the pack
          </p>
          <h2 className="mt-2 font-[var(--font-oswald)] text-4xl font-bold uppercase leading-tight text-foreground xl:text-5xl">
            Stronger<br />
            <span className="text-primary">together</span>
          </h2>
        </div>

        <div className="absolute top-0 left-0 h-full w-px bg-border/50" />
      </div>
    </div>
  )
}
