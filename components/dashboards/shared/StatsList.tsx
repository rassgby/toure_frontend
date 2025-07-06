"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface StatsItem {
  label: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
}

interface StatsListProps {
  title: string
  items: StatsItem[]
}

export default function StatsList({ title, items }: StatsListProps) {
  const getChangeColor = (type?: string) => {
    switch (type) {
      case "positive":
        return "bg-green-100 text-green-800"
      case "negative":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                <p className="text-lg font-bold text-gray-700">{item.value}</p>
              </div>
              {item.change && <Badge className={getChangeColor(item.changeType)}>{item.change}</Badge>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
