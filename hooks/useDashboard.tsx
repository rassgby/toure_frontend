"use client"

import { useState, useEffect } from "react"
import apiService from "@/lib/api"

interface DashboardMetrics {
  candidatures?: number
  conventions?: number
  entretiens?: number
  tauxPlacement?: number
  stagiaires?: number
  evaluations?: number
  moyenne?: number
  rapports?: number
  progression?: number
  note?: number
  joursRestants?: number
  roi?: number
  budget?: string
  conversion?: number
  satisfaction?: number
}

interface DashboardData {
  metrics: DashboardMetrics
  activities: any[]
  loading: boolean
  error: string | null
  refreshData: () => void
}

export function useDashboard(userRole: string): DashboardData {
  const [metrics, setMetrics] = useState<DashboardMetrics>({})
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Appel API pour récupérer les statistiques du dashboard
      const [statsResponse, activitiesResponse] = await Promise.all([
        apiService.getDashboardStats(),
        apiService.getDashboardActivities(),
      ])

      setMetrics(statsResponse.stats || {})
      setActivities(activitiesResponse.activities || [])
    } catch (err: any) {
      console.error("Erreur dashboard:", err)
      setError(err.message || "Erreur lors du chargement des données")

      // Données de fallback en cas d'erreur
      const fallbackData = {
        rh: {
          candidatures: 47,
          conventions: 8,
          entretiens: 15,
          tauxPlacement: 89,
        },
        tuteur: {
          stagiaires: 5,
          evaluations: 3,
          moyenne: 16.8,
          rapports: 18,
        },
        stagiaire: {
          progression: 75,
          note: 16.5,
          rapports: 8,
          joursRestants: 45,
        },
        direction: {
          roi: 156,
          budget: "847K€",
          conversion: 68,
          satisfaction: 94,
        },
      }

      setMetrics(fallbackData[userRole as keyof typeof fallbackData] || fallbackData.rh)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userRole) {
      fetchDashboardData()
    }
  }, [userRole])

  const refreshData = () => {
    fetchDashboardData()
  }

  return {
    metrics,
    activities,
    loading,
    error,
    refreshData,
  }
}
