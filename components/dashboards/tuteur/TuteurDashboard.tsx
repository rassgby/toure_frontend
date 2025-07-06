"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, Award, Star, FileText, BookOpen, Calendar, RefreshCw, AlertTriangle } from "lucide-react"
import MetricCard from "../shared/MetricCard"
import ActionCard from "../shared/ActionCard"
import ProgressCard from "../shared/ProgressCard"
import LoadingDashboard from "../shared/LoadingDashboard"
import { useDashboard } from "@/hooks/useDashboard"

export default function TuteurDashboard() {
  const { metrics, loading, error, refreshData } = useDashboard("tuteur")
  const [stagiaires, setStagiaires] = useState([])
  const [loadingStagiaires, setLoadingStagiaires] = useState(true)

  useEffect(() => {
    fetchStagiaires()
  }, [])

  const fetchStagiaires = async () => {
    try {
      setLoadingStagiaires(true)
      // Simuler l'appel API pour récupérer les stagiaires du tuteur
      const mockStagiaires = [
        {
          id: 1,
          nom: "Marie Dubois",
          progression: 85,
          note: 17.5,
          statut: "Excellent",
          prochainRdv: "2024-07-20",
        },
        {
          id: 2,
          nom: "Pierre Laurent",
          progression: 72,
          note: 15.2,
          statut: "Bien",
          prochainRdv: "2024-07-22",
        },
        {
          id: 3,
          nom: "Thomas Moreau",
          progression: 95,
          note: 18.1,
          statut: "Terminé",
          prochainRdv: null,
        },
        {
          id: 4,
          nom: "Emma Bernard",
          progression: 45,
          note: 14.8,
          statut: "En cours",
          prochainRdv: "2024-07-25",
        },
        {
          id: 5,
          nom: "Lucas Martin",
          progression: 68,
          note: 16.0,
          statut: "Bien",
          prochainRdv: "2024-07-23",
        },
      ]
      setStagiaires(mockStagiaires)
    } catch (error) {
      console.error("Erreur stagiaires:", error)
    } finally {
      setLoadingStagiaires(false)
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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Espace Tuteur</h1>
          <p className="text-gray-600 text-sm sm:text-base">Accompagnement et suivi pédagogique</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={refreshData} className="flex items-center gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            Actualiser
          </Button>
          <Badge className="bg-green-600 text-white">Tuteur</Badge>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Métriques Tuteur */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <MetricCard
          title="Mes stagiaires"
          value={metrics.stagiaires || 0}
          icon={<Users className="h-full w-full" />}
          color="blue"
          trend="neutral"
          trendValue="Actifs"
        />
        <MetricCard
          title="Évaluations à faire"
          value={metrics.evaluations || 0}
          icon={<Award className="h-full w-full" />}
          color="orange"
          trend="neutral"
          trendValue="Cette semaine"
        />
        <MetricCard
          title="Moyenne générale"
          value={`${metrics.moyenne || 0}/20`}
          icon={<Star className="h-full w-full" />}
          color="green"
          trend="up"
          trendValue="Excellent niveau"
        />
        <MetricCard
          title="Rapports reçus"
          value={metrics.rapports || 0}
          icon={<FileText className="h-full w-full" />}
          color="purple"
          trend="up"
          trendValue="Ce mois"
        />
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Mes stagiaires - Progression */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Mes stagiaires - Progression</CardTitle>
            <CardDescription className="text-sm">Suivi de la progression de chaque stagiaire</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingStagiaires ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded w-24"></div>
                      </div>
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {stagiaires.map((stagiaire: any) => (
                  <div key={stagiaire.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarFallback>
                            {stagiaire.nom
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm sm:text-base">{stagiaire.nom}</p>
                          <p className="text-xs sm:text-sm text-gray-600">Note: {stagiaire.note}/20</p>
                        </div>
                      </div>
                      <Badge
                        className={
                          stagiaire.statut === "Excellent"
                            ? "bg-green-100 text-green-800"
                            : stagiaire.statut === "Bien"
                              ? "bg-blue-100 text-blue-800"
                              : stagiaire.statut === "Terminé"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                        }
                      >
                        {stagiaire.statut}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <Progress value={stagiaire.progression} className="flex-1" />
                      <span className="text-sm font-medium w-12 text-right">{stagiaire.progression}%</span>
                    </div>
                    {stagiaire.prochainRdv && (
                      <p className="text-xs text-gray-500">
                        Prochain RDV: {new Date(stagiaire.prochainRdv).toLocaleDateString("fr-FR")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Tâches pédagogiques */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tâches pédagogiques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <ActionCard
                  icon={<Award className="h-4 w-4" />}
                  title="3 évaluations urgentes"
                  description="Mi-parcours à finaliser"
                  priority="high"
                />
                <ActionCard
                  icon={<BookOpen className="h-4 w-4" />}
                  title="5 rapports à valider"
                  description="Rapports hebdomadaires"
                  priority="medium"
                />
                <ActionCard
                  icon={<Calendar className="h-4 w-4" />}
                  title="4 RDV programmés"
                  description="Cette semaine"
                  priority="low"
                />
              </div>
            </CardContent>
          </Card>

          {/* Performance de l'équipe */}
          <ProgressCard
            title="Performance de l'équipe"
            items={[
              { label: "Progression moyenne", value: 73 },
              { label: "Note moyenne", value: 81.5 },
              { label: "Objectifs atteints", value: 85 },
            ]}
          />
        </div>
      </div>
    </div>
  )
}
