"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProgressItem {
  label: string
  value: number
  maxValue?: number
  color?: string
}

interface ProgressCardProps {
  title: string
  items: ProgressItem[]
}

export default function ProgressCard({ title, items }: ProgressCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{item.label}</span>
                <span className="font-medium">
                  {item.maxValue ? `${item.value}/${item.maxValue}` : `${item.value}%`}
                </span>
              </div>
              <Progress value={item.maxValue ? (item.value / item.maxValue) * 100 : item.value} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
