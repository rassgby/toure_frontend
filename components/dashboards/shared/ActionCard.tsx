"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface ActionCardProps {
  icon: React.ReactNode
  title: string
  description: string
  priority?: "high" | "medium" | "low"
  onClick?: () => void
}

export default function ActionCard({ icon, title, description, priority = "medium", onClick }: ActionCardProps) {
  const priorityColors = {
    high: "bg-red-50 border-red-200",
    medium: "bg-orange-50 border-orange-200",
    low: "bg-blue-50 border-blue-200",
  }

  const iconColors = {
    high: "text-red-500",
    medium: "text-orange-500",
    low: "text-blue-500",
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border transition-all duration-200",
        priorityColors[priority],
        onClick && "cursor-pointer hover:shadow-md",
      )}
      onClick={onClick}
    >
      <div className={cn("h-4 w-4 flex-shrink-0", iconColors[priority])}>{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
        <p className="text-xs text-gray-600 truncate">{description}</p>
      </div>
    </div>
  )
}
