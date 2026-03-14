"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { MessageCircle, Construction } from "lucide-react"

export default function ChatPage() {
  return (
    <DashboardShell activeTab="Messages">
      <div className="flex h-[calc(100vh-8rem)] flex-col items-center justify-center gap-6 rounded-sm border border-border bg-card p-8 text-center">
        <div className="relative">
          <div className="absolute -inset-4 animate-pulse rounded-full bg-primary/20" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 shadow-[0_0_30px_oklch(0.65_0.25_25/0.2)]">
            <MessageCircle className="h-10 w-10 text-primary" />
          </div>
          <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-card bg-primary">
            <Construction className="h-4 w-4 text-primary-foreground" />
          </div>
        </div>
        
        <div className="max-w-md">
          <h2 className="font-[var(--font-oswald)] text-3xl font-bold uppercase tracking-wider text-foreground">
            Coming Soon
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            We are actively building the ultimate messaging experience for you and your gym partners. 
            Soon, you will be able to share PRs, coordinate gym sessions, and sync up instantly.
          </p>
          <div className="mt-8 overflow-hidden rounded-sm bg-secondary h-1.5 w-full max-w-[200px] mx-auto">
             <div className="h-full bg-primary w-1/3 animate-[pulse_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
