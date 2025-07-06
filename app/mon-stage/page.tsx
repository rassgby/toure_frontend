"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Target,
  Calendar,
  FileText,
  Award,
  MessageSquare,
  Clock,
  CheckCircle,
  TrendingUp,
  Building,
} from "lucide-react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"

export default function MonStagePage() {
  const [userRole, setUserRole] = useState("stagiaire")

  const stageInfo = {
    entreprise: "TechCorp Solutions",
    service: "Développement Web",
    tuteur: "Jean Martin",
    dateDebut: "2024-01-15",
    dateFin: "2024-07-15",
    dureeTotal: 180, // jours
    joursEcoules: 135,
    progression: 75,
    noteActuelle: 16.5,
    prochainRendezVous: "2024-07-20",
  }

  const objectifs = [
    {
      id: 1,
      titre: "Maîtriser React et Next.js",
      description: "Développer des compétences avancées en React et Next.js",
      progression: 90,
      statut: "En cours",
      dateEcheance: "2024-06-30",
      priorite: "Haute",
    },
    {
      id: 2,
      titre: "Réaliser un projet complet",
      description: "Concevoir et développer une application web complète",
      progression: 70,
      statut: "En cours",
      dateEcheance: "2024-07-10",
      priorite: "Haute",
    },
    {
      id: 3,
      titre: "Présentation finale",
      description: "Préparer et présenter le projet devant l'équipe",
      progression: 30,
      statut: "À venir",
      dateEcheance: "2024-07-15",
      priorite: "Moyenne",
    },
    {
      id: 4,
      titre: "Documentation technique",
      description: "Rédiger la documentation complète du projet",
      progression: 50,
      statut: "En cours",
      dateEcheance: "2024-07-12",
      priorite: "Moyenne",
    },
  ]

  const evaluations = [
    {
      id: 1,
      type: "Évaluation initiale",
      date: "2024-02-15",
      note: 14.5,
      commentaire: "Bon potentiel, motivation évidente",
      competences: {
        technique: 14,
        communication: 15,
        autonomie: 13,
        initiative: 16,
      },
    },
    {
      id: 2,
      type: "Évaluation mi-parcours",
      date: "2024-05-15",
      note: 16.5,
      commentaire: "Excellente progression, très impliqué dans les projets",
      competences: {
        technique: 17,
        communication: 16,
        autonomie: 16,
        initiative: 17,
      },
    },
  ]

  const rapports = [
    { id: 1, titre: "Rapport semaine 1-2", date: "2024-01-29", statut: "Validé" },
    { id: 2, titre: "Rapport semaine 3-4", date: "2024-02-12", statut: "Validé" },
    { id: 3, titre: "Rapport semaine 5-6", date: "2024-02-26", statut: "Validé" },
    { id: 4, titre: "Rapport semaine 7-8", date: "2024-03-12", statut: "En attente" },
  ]

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "Terminé":
        return "bg-green-100 text-green-800"
      case "En cours":
        return "bg-blue-100 text-blue-800"
      case "À venir":
        return "bg-gray-100 text-gray-800"
      case "En retard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPrioriteColor = (priorite: string) => {
    switch (priorite) {
      case "Haute":
        return "bg-red-100 text-red-800"
      case "Moyenne":
        return "bg-yellow-100 text-yellow-800"
      case "Basse":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const joursRestants = stageInfo.dureeTotal - stageInfo.joursEcoules

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userRole={userRole} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userRole={userRole} setUserRole={setUserRole} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Mon Stage</h1>
                  <p className="text-gray-600">Suivi de votre parcours de stage</p>
                </div>
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  {stageInfo.progression}% complété
                </Badge>
              </div>

              {/* Informations générales */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Informations du stage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <p className="text-sm text-gray-600">Entreprise</p>
                      <p className="font-semibold">{stageInfo.entreprise}</p>
                      <p className="text-sm text-gray-500">{stageInfo.service}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tuteur</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">JM</AvatarFallback>
                        </Avatar>
                        <p className="font-semibold">{stageInfo.tuteur}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Période</p>
                      <p className="font-semibold">{new Date(stageInfo.dateDebut).toLocaleDateString("fr-FR")}</p>
                      <p className="text-sm text-gray-500">
                        au {new Date(stageInfo.dateFin).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Progression</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={stageInfo.progression} className="flex-1" />
                        <span className="text-sm font-medium">{stageInfo.progression}%</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{joursRestants} jours restants</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Métriques rapides */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {objectifs.filter((o) => o.statut === "Terminé").length}/{objectifs.length}
                        </div>
                        <p className="text-sm text-gray-600">Objectifs atteints</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="text-2xl font-bold text-green-600">{stageInfo.noteActuelle}/20</div>
                        <p className="text-sm text-gray-600">Note actuelle</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="text-2xl font-bold text-purple-600">
                          {rapports.filter((r) => r.statut === "Validé").length}/{rapports.length}
                        </div>
                        <p className="text-sm text-gray-600">Rapports validés</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="text-2xl font-bold text-orange-600">{joursRestants}</div>
                        <p className="text-sm text-gray-600">Jours restants</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Tabs defaultValue="objectifs" className="space-y-6">
              <TabsList>
                <TabsTrigger value="objectifs">Mes Objectifs</TabsTrigger>
                <TabsTrigger value="evaluations">Évaluations</TabsTrigger>
                <TabsTrigger value="rapports">Rapports</TabsTrigger>
                <TabsTrigger value="planning">Planning</TabsTrigger>
              </TabsList>

              <TabsContent value="objectifs">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {objectifs.map((objectif) => (
                    <Card key={objectif.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{objectif.titre}</CardTitle>
                            <CardDescription className="mt-1">{objectif.description}</CardDescription>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Badge className={getStatutColor(objectif.statut)} size="sm">
                              {objectif.statut}
                            </Badge>
                            <Badge className={getPrioriteColor(objectif.priorite)} size="sm">
                              {objectif.priorite}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Progression</span>
                              <span className="text-sm text-gray-600">{objectif.progression}%</span>
                            </div>
                            <Progress value={objectif.progression} className="h-2" />
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Échéance</span>
                            <span className="font-medium">
                              {new Date(objectif.dateEcheance).toLocaleDateString("fr-FR")}
                            </span>
                          </div>
                          {objectif.progression === 100 && (
                            <div className="flex items-center gap-2 text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm font-medium">Objectif atteint !</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="evaluations">
                <div className="space-y-6">
                  {evaluations.map((evaluation) => (
                    <Card key={evaluation.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{evaluation.type}</CardTitle>
                            <CardDescription>
                              Évaluée le {new Date(evaluation.date).toLocaleDateString("fr-FR")}
                            </CardDescription>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-blue-600">{evaluation.note}/20</div>
                            <div className="text-sm text-gray-500">Note globale</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium mb-3">Détail des compétences</h4>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Compétences techniques</span>
                                <div className="flex items-center gap-2">
                                  <Progress value={(evaluation.competences.technique / 20) * 100} className="w-16" />
                                  <span className="text-sm font-medium w-8">{evaluation.competences.technique}/20</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Communication</span>
                                <div className="flex items-center gap-2">
                                  <Progress
                                    value={(evaluation.competences.communication / 20) * 100}
                                    className="w-16"
                                  />
                                  <span className="text-sm font-medium w-8">
                                    {evaluation.competences.communication}/20
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Autonomie</span>
                                <div className="flex items-center gap-2">
                                  <Progress value={(evaluation.competences.autonomie / 20) * 100} className="w-16" />
                                  <span className="text-sm font-medium w-8">{evaluation.competences.autonomie}/20</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Initiative</span>
                                <div className="flex items-center gap-2">
                                  <Progress value={(evaluation.competences.initiative / 20) * 100} className="w-16" />
                                  <span className="text-sm font-medium w-8">
                                    {evaluation.competences.initiative}/20
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-3">Commentaire du tuteur</h4>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-sm text-gray-700">{evaluation.commentaire}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="rapports">
                <Card>
                  <CardHeader>
                    <CardTitle>Mes Rapports de Stage</CardTitle>
                    <CardDescription>Suivi de vos rapports hebdomadaires</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {rapports.map((rapport) => (
                        <div key={rapport.id} className="border rounded-lg p-4 hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FileText className="h-8 w-8 text-blue-600" />
                              <div>
                                <h4 className="font-medium">{rapport.titre}</h4>
                                <p className="text-sm text-gray-600">
                                  Soumis le {new Date(rapport.date).toLocaleDateString("fr-FR")}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                className={
                                  rapport.statut === "Validé"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {rapport.statut}
                              </Badge>
                              <Button size="sm" variant="outline">
                                Voir
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button className="w-full bg-transparent" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Nouveau rapport
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="planning">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Prochains rendez-vous
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border rounded-lg p-4 bg-blue-50">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Suivi avec tuteur</h4>
                              <p className="text-sm text-gray-600">Point mensuel sur la progression</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                {new Date(stageInfo.prochainRendezVous).toLocaleDateString("fr-FR")}
                              </p>
                              <p className="text-sm text-gray-600">14:00 - 15:00</p>
                            </div>
                          </div>
                        </div>
                        <Button className="w-full bg-transparent" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contacter mon tuteur
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Évolution de mes notes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <TrendingUp className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                          <p className="text-gray-600">Graphique d'évolution</p>
                          <p className="text-sm text-gray-500 mt-2">Progression positive !</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
