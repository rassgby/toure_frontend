"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Target, Award, FileText, Clock, Calendar, RefreshCw, AlertTriangle } from "lucide-react"
import MetricCard from "../shared/MetricCard"
import ActionCard from "../shared/ActionCard"
import ProgressCard from "../shared/ProgressCard"
import LoadingDashboard from "../shared/LoadingDashboard"
import { useDashboard } from "@/hooks/useDashboard"

export default function StagiaireDashboard() {
  const { metrics, loading, error, refreshData } = useDashboard("stagiaire")
  const [objectifs, setObjectifs] = useState([])

  useEffect(() => {
    // Simuler le chargement des objectifs
    const mockObjectifs = [
      {
        id: 1,
        titre: "Maîtriser React et Next.js",
        progression: 90,
        statut: "En cours",
        priorite: "Haute",
      },
      {
        id: 2,
        titre: "Réaliser un projet complet",
        progression: 70,
        statut: "En cours",
        priorite: "Haute",
      },
      {
        id: 3,
        titre: "Présentation finale",
        progression: 30,
        statut: "À venir",
        priorite: "Moyenne",
      },
      {
        id: 4,
        titre: "Documentation technique",
        progression: 50,
        statut: "En cours",
        priorite: "Moyenne",
      },
    ]
    setObjectifs(mockObjectifs)
  }, [])

  if (loading) {
    return <LoadingDashboard />
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Mon Espace Stage</h1>
          <p className="text-gray-600 text-sm sm:text-base">Suivi de votre parcours personnel</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={refreshData} className="flex items-center gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            Actualiser
          </Button>
          <Badge className="bg-purple-600 text-white">Stagiaire</Badge>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Métriques Stagiaire */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <MetricCard
          title="Progression globale"
          value={`${metrics.progression || 0}%`}
          icon={<Target className="h-full w-full" />}
          color="blue"
          trend="up"
          trendValue="En bonne voie"
        />
        <MetricCard
          title="Ma note actuelle"
          value={`${metrics.note || 0}/20`}
          icon={<Award className="h-full w-full" />}
          color="green"
          trend="up"
          trendValue="Très bien"
        />
        <MetricCard
          title="Rapports soumis"
          value={`${metrics.rapports || 0}/10`}
          icon={<FileText className="h-full w-full" />}
          color="purple"
          trend="neutral"
          trendValue="2 restants"
        />
        <MetricCard
          title="Jours restants"
          value={metrics.joursRestants || 0}
          icon={<Clock className="h-full w-full" />}
          color="orange"
          trend="neutral"
          trendValue="25% du stage"
        />
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Mes objectifs de stage */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Mes objectifs de stage</CardTitle>
            <CardDescription className="text-sm">Suivi de vos objectifs personnels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {objectifs.map((objectif: any) => (
                <div key={objectif.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                    <h4 className="font-medium text-sm sm:text-base">{objectif.titre}</h4>
                    <div className="flex gap-2 flex-wrap">
                      <Badge
                        className={
                          objectif.priorite === "Haute" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {objectif.priorite}
                      </Badge>
                      <Badge
                        className={
                          objectif.statut === "En cours" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {objectif.statut}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={objectif.progression} className="flex-1" />
                    <span className="text-sm font-medium w-12 text-right">{objectif.progression}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Mes prochaines échéances */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Mes prochaines échéances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <ActionCard
                  icon={<FileText className="h-4 w-4" />}
                  title="Rapport hebdomadaire"
                  description="À rendre vendredi"
                  priority="high"
                />
                <ActionCard
                  icon={<Calendar className="h-4 w-4" />}
                  title="RDV avec tuteur"
                  description="Lundi 14h00"
                  priority="medium"
                />
                <ActionCard
                  icon={<Award className="h-4 w-4" />}
                  title="Évaluation mi-parcours"
                  description="Dans 2 semaines"
                  priority="low"
                />
              </div>
            </CardContent>
          </Card>

          {/* Mon évolution */}
          <ProgressCard
            title="Mon évolution"
            items={[
              { label: "Compétences techniques", value: 85 },
              { label: "Communication", value: 80 },
              { label: "Autonomie", value: 75 },
              { label: "Initiative", value: 90 },
            ]}
          />
        </div>
      </div>
    </div>
  )
}
