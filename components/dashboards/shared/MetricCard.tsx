"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  color?: "blue" | "green" | "orange" | "purple" | "red"
  loading?: boolean
}

export default function MetricCard({
  title,
  value,
  icon,
  trend = "neutral",
  trendValue,
  color = "blue",
  loading = false,
}: MetricCardProps) {
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    orange: "text-orange-600",
    purple: "text-purple-600",
    red: "text-red-600",
  }

  const trendColors = {
    up: "bg-green-100 text-green-800",
    down: "bg-red-100 text-red-800",
    neutral: "bg-gray-100 text-gray-800",
  }

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus

  if (loading) {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4 sm:p-6">
          <div className="animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className={cn("text-xl sm:text-2xl font-bold", colorClasses[color])}>{value}</p>
          </div>
          <div className={cn("h-6 w-6 sm:h-8 sm:w-8", colorClasses[color])}>{icon}</div>
        </div>
        {trendValue && (
          <div className="mt-3">
            <Badge className={cn("text-xs flex items-center gap-1 w-fit", trendColors[trend])}>
              <TrendIcon className="h-3 w-3" />
              {trendValue}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
