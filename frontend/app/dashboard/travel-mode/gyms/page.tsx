"use client"

import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import TravelModeMap from "@/components/gym-finder/travel-mode-map"

export default function TravelModeGymsPage() {
  const router = useRouter()

  return (
    <DashboardShell activeTab="Travel Mode">
      <div className="h-[calc(100vh-140px)] min-h-[520px]">
        <TravelModeMap
          initialView="gyms"
          onBack={() => router.push("/dashboard/travel-mode")}
          onOpenMap={() => router.push("/dashboard/travel-mode/map")}
          onOpenGyms={() => {}}
        />
      </div>
    </DashboardShell>
  )
}
