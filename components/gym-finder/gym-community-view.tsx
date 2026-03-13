"use client"

import { useState, useEffect } from "react"
import { X, Users, Dumbbell, Clock, Target, ShieldCheck, MapPin, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { JoinCommunityModal } from "./join-community-modal"

interface Member {
    id: string
    name: string
    goal: "Cutting" | "Bulking" | "Strength" | "Endurance"
    timing: "Morning" | "Evening"
    specific_time?: string
    details: string
}

interface Gym {
    id: string
    name: string
    lat: number
    lng: number
    rating?: number
    address?: string
    photo?: string
    openNow?: boolean
    trainer?: string
    members?: Member[]
}

interface GymCommunityViewProps {
    gym: Gym
    onClose: () => void
}

export function GymCommunityView({ gym, onClose }: GymCommunityViewProps) {
    const [members, setMembers] = useState<Member[]>([])
    const [loading, setLoading] = useState(true)
    const [showJoinModal, setShowJoinModal] = useState(false)

    const fetchMembers = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('gym_members')
                .select('*')
                .eq('gym_id', gym.id)
                .order('created_at', { ascending: false })
            
            if (error) throw error
            if (data) setMembers(data)
        } catch (error) {
            console.error('Error fetching members:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMembers()
    }, [gym.id])

    const handleJoin = async (newMember: Omit<Member, 'id'>) => {
        try {
            const { error } = await supabase
                .from('gym_members')
                .insert([{
                    gym_id: gym.id,
                    name: newMember.name,
                    goal: newMember.goal,
                    timing: newMember.timing,
                    specific_time: newMember.specific_time,
                    details: newMember.details
                }])
            
            if (error) throw error
            setShowJoinModal(false)
            fetchMembers()
        } catch (error) {
            console.error('Error joining community:', error)
            alert('Failed to join. Please try again.')
        }
    }

    if (!gym) return null

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-sm border border-border/50 bg-background shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 rounded-full bg-background/50 p-2 text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="flex flex-col md:flex-row h-full">
                    {/* Left Side: Gym Info */}
                    <div className="w-full md:w-1/3 border-r border-border/50 bg-secondary/20 p-8">
                        <div className="flex flex-col gap-6">
                            <div className="h-16 w-16 rounded-sm bg-primary flex items-center justify-center">
                                <Dumbbell className="h-8 w-8 text-primary-foreground" />
                            </div>

                            <div>
                                <h2 className="font-[var(--font-oswald)] text-3xl font-bold uppercase tracking-tight text-foreground">{gym.name}</h2>
                                <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <p className="text-sm font-medium">{gym.address}</p>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">
                                <div className="rounded-sm border border-primary/20 bg-primary/5 p-4">
                                    <div className="flex items-center gap-2 text-primary">
                                        <ShieldCheck className="h-4 w-4" />
                                        <span className="text-xs font-bold uppercase tracking-widest">Head Trainer</span>
                                    </div>
                                    <p className="mt-1 text-lg font-bold text-foreground">{gym.trainer || "Not Assigned"}</p>
                                </div>

                                <div className="flex items-center justify-between px-2">
                                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Active Members</span>
                                    <span className="text-lg font-black text-primary">{members.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Community Members */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="p-8 border-b border-border/50">
                            <h3 className="flex items-center gap-2 text-xl font-bold uppercase tracking-widest text-foreground">
                                <Users className="h-5 w-5 text-primary" />
                                Community Members
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">People currently training or registered at this location.</p>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                            {loading ? (
                                <div className="flex h-full items-center justify-center py-20">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                </div>
                            ) : members.length > 0 ? (
                                members.map((member) => (
                                    <div key={member.id} className="group flex items-start gap-4 rounded-sm border border-border/50 bg-card p-4 transition-all hover:border-primary/50 hover:bg-secondary/20">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary">
                                            <span className="text-lg font-bold text-primary italic uppercase">{member.name.charAt(0)}</span>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-bold text-foreground text-sm uppercase tracking-wide">{member.name}</h4>
                                                <div className="flex flex-col items-end gap-1">
                                                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-muted-foreground bg-secondary/30 px-2 py-0.5 rounded-full">
                                                        <Clock className="h-3 w-3" />
                                                        {member.timing}
                                                    </span>
                                                    {member.specific_time && (
                                                        <span className="text-[9px] font-medium text-primary/80 tracking-widest uppercase">
                                                            {member.specific_time}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="flex items-center gap-1 rounded-sm bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary italic border border-primary/20">
                                                    <Target className="h-3 w-3" />
                                                    {member.goal}
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground leading-relaxed italic opacity-80">"{member.details}"</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex h-full flex-col items-center justify-center text-center opacity-50 py-20">
                                    <Users className="h-12 w-12 mb-4 text-primary" />
                                    <p className="font-bold uppercase tracking-[0.2em] text-sm">No members yet</p>
                                    <p className="text-[10px] mt-1 italic tracking-widest">BE THE FIRST ONE TO JOIN RANA GYM</p>
                                </div>
                            )}
                        </div>

                        <div className="p-8 bg-secondary/10 border-t border-border/50 flex justify-end">
                            <button 
                                onClick={() => setShowJoinModal(true)}
                                className="rounded-sm bg-primary px-8 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20"
                            >
                                Join This Community
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showJoinModal && (
                <JoinCommunityModal 
                    gymName={gym.name}
                    onClose={() => setShowJoinModal(false)}
                    onJoin={handleJoin}
                />
            )}
        </div>
    )
}
