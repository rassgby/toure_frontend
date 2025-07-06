"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, FileText, Calendar, TrendingUp, AlertTriangle, Clock, MessageSquare, RefreshCw } from "lucide-react"
import MetricCard from "../shared/MetricCard"
import ActionCard from "../shared/ActionCard"
import ProgressCard from "../shared/ProgressCard"
import LoadingDashboard from "../shared/LoadingDashboard"
import { useDashboard } from "@/hooks/useDashboard"
import apiService from "@/lib/api"

export default function RHDashboard() {
  const { metrics, loading, error, refreshData } = useDashboard("rh")
  const [candidatures, setCandidatures] = useState<any[]>([])
  const [loadingCandidatures, setLoadingCandidatures] = useState(true)

  useEffect(() => {
    fetchCandidatures()
  }, [])

  const fetchCandidatures = async () => {
    try {
      setLoadingCandidatures(true)
      const response = await apiService.getCandidatures({ limit: 4 })
      setCandidatures(response.candidatures || [])
    } catch (error) {
      console.error("Erreur candidatures:", error)
    } finally {
      setLoadingCandidatures(false)
    }
  }

  if (loading) {
    return <LoadingDashboard />
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Tableau de bord RH</h1>
          <p className="text-gray-600 text-sm sm:text-base">Gestion administrative des stages</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={refreshData} className="flex items-center gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            Actualiser
          </Button>
          <Badge className="bg-blue-600 text-white">Service RH</Badge>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Métriques RH */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <MetricCard
          title="Candidatures actives"
          value={metrics.candidatures || 0}
          icon={<Users className="h-full w-full" />}
          color="blue"
          trend="up"
          trendValue="+12 cette semaine"
        />
        <MetricCard
          title="Conventions en attente"
          value={metrics.conventions || 0}
          icon={<FileText className="h-full w-full" />}
          color="orange"
          trend="neutral"
          trendValue="Action requise"
        />
        <MetricCard
          title="Entretiens programmés"
          value={metrics.entretiens || 0}
          icon={<Calendar className="h-full w-full" />}
          color="green"
          trend="up"
          trendValue="Cette semaine"
        />
        <MetricCard
          title="Taux de placement"
          value={`${metrics.tauxPlacement || 0}%`}
          icon={<TrendingUp className="h-full w-full" />}
          color="purple"
          trend="up"
          trendValue="+3% vs mois dernier"
        />
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Candidatures récentes */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Candidatures récentes</CardTitle>
            <CardDescription className="text-sm">Nouvelles candidatures à traiter</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingCandidatures ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded w-24"></div>
                      </div>
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : candidatures.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {candidatures.map((candidature: any, index) => (
                  <div
                    key={candidature.id || index}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg hover:bg-gray-50 gap-3 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarFallback className="text-xs">
                          {candidature.candidat?.firstName?.[0]}
                          {candidature.candidat?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm sm:text-base truncate">
                          {candidature.candidat?.firstName} {candidature.candidat?.lastName}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{candidature.stage?.titre}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        className={
                          candidature.statut === "En attente"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-blue-100 text-blue-800"
                        }
                      >
                        {candidature.statut}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Aucune candidature récente</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Actions urgentes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions urgentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <ActionCard
                  icon={<AlertTriangle className="h-4 w-4" />}
                  title="8 conventions expirent"
                  description="Dans les 5 prochains jours"
                  priority="high"
                />
                <ActionCard
                  icon={<Clock className="h-4 w-4" />}
                  title="15 entretiens à planifier"
                  description="Candidats en attente"
                  priority="medium"
                />
                <ActionCard
                  icon={<MessageSquare className="h-4 w-4" />}
                  title="12 messages non lus"
                  description="Tuteurs et stagiaires"
                  priority="low"
                />
              </div>
            </CardContent>
          </Card>

          {/* Statistiques du mois */}
          <ProgressCard
            title="Statistiques du mois"
            items={[
              { label: "Objectif candidatures", value: 47, maxValue: 50 },
              { label: "Taux de conversion", value: 89 },
              { label: "Satisfaction entreprises", value: 96 },
            ]}
          />
        </div>
      </div>
    </div>
  )
}
