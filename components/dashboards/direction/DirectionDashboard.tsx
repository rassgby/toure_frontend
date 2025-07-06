"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TrendingUp, DollarSign, Target, Star, RefreshCw, AlertTriangle } from "lucide-react"
import MetricCard from "../shared/MetricCard"
import ProgressCard from "../shared/ProgressCard"
import LoadingDashboard from "../shared/LoadingDashboard"
import { useDashboard } from "@/hooks/useDashboard"

export default function DirectionDashboard() {
  const { metrics, loading, error, refreshData } = useDashboard("direction")
  const [services, setServices] = useState([])

  useEffect(() => {
    // Simuler le chargement des données par service
    const mockServices = [
      {
        service: "Informatique",
        stagiaires: 28,
        budget: "245K€",
        satisfaction: 96,
        performance: 92,
      },
      {
        service: "Marketing",
        stagiaires: 18,
        budget: "156K€",
        satisfaction: 94,
        performance: 88,
      },
      {
        service: "Finance",
        stagiaires: 12,
        budget: "98K€",
        satisfaction: 91,
        performance: 85,
      },
      {
        service: "RH",
        stagiaires: 8,
        budget: "67K€",
        satisfaction: 97,
        performance: 90,
      },
      {
        service: "R&D",
        stagiaires: 15,
        budget: "189K€",
        satisfaction: 93,
        performance: 94,
      },
    ]
    setServices(mockServices)
  }, [])

  if (loading) {
    return <LoadingDashboard />
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Direction</h1>
          <p className="text-gray-600 text-sm sm:text-base">Pilotage stratégique et performance globale</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={refreshData} className="flex items-center gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            Actualiser
          </Button>
          <Badge className="bg-red-600 text-white">Direction</Badge>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Métriques Direction */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <MetricCard
          title="ROI des stages"
          value={`${metrics.roi || 0}%`}
          icon={<TrendingUp className="h-full w-full" />}
          color="blue"
          trend="up"
          trendValue="+23% vs N-1"
        />
        <MetricCard
          title="Budget utilisé"
          value={metrics.budget || "0€"}
          icon={<DollarSign className="h-full w-full" />}
          color="green"
          trend="neutral"
          trendValue="84% du budget"
        />
        <MetricCard
          title="Taux de conversion"
          value={`${metrics.conversion || 0}%`}
          icon={<Target className="h-full w-full" />}
          color="purple"
          trend="up"
          trendValue="+8% vs objectif"
        />
        <MetricCard
          title="Satisfaction globale"
          value={`${metrics.satisfaction || 0}%`}
          icon={<Star className="h-full w-full" />}
          color="orange"
          trend="up"
          trendValue="Excellent"
        />
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Performance par service */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Performance par service</CardTitle>
            <CardDescription className="text-sm">Analyse comparative des différents services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.map((service: any, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-3">
                    <div>
                      <h4 className="font-medium text-sm sm:text-base">{service.service}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {service.stagiaires} stagiaires • {service.budget}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-sm font-medium">Performance: {service.performance}%</p>
                      <p className="text-xs text-gray-500">Satisfaction: {service.satisfaction}%</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Performance</span>
                        <span>{service.performance}%</span>
                      </div>
                      <Progress value={service.performance} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Satisfaction</span>
                        <span>{service.satisfaction}%</span>
                      </div>
                      <Progress value={service.satisfaction} className="h-1.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Indicateurs clés */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Indicateurs clés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-green-50 rounded-lg gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Recrutements post-stage</p>
                    <p className="text-xs text-gray-500">42 embauches cette année</p>
                  </div>
                  <Badge className="bg-green-600 text-white w-fit">+15%</Badge>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-blue-50 rounded-lg gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Partenariats écoles</p>
                    <p className="text-xs text-gray-500">28 établissements</p>
                  </div>
                  <Badge className="bg-blue-600 text-white w-fit">+3</Badge>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-purple-50 rounded-lg gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Innovation projets</p>
                    <p className="text-xs text-gray-500">12 brevets déposés</p>
                  </div>
                  <Badge className="bg-purple-600 text-white w-fit">+200%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Objectifs stratégiques */}
          <ProgressCard
            title="Objectifs stratégiques"
            items={[
              { label: "Croissance stages", value: 156, maxValue: 180 },
              { label: "Réduction coûts", value: 80 },
              { label: "Satisfaction 95%", value: 99 },
            ]}
          />
        </div>
      </div>
    </div>
  )
}
