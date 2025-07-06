"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Plus, Users, MapPin, Bell } from "lucide-react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"

export default function PlanningPage() {
  const [userRole, setUserRole] = useState("rh")

  const evenements = [
    {
      id: 1,
      titre: "Entretien - Marie Dubois",
      type: "Entretien",
      date: "2024-07-15",
      heure: "14:00",
      duree: "1h",
      participants: ["Marie Dubois", "Jean Martin"],
      lieu: "Salle de réunion A",
      statut: "Confirmé",
      description: "Entretien de recrutement pour stage développement",
    },
    {
      id: 2,
      titre: "Réunion de suivi - Pierre Laurent",
      type: "Suivi",
      date: "2024-07-16",
      heure: "10:30",
      duree: "30min",
      participants: ["Pierre Laurent", "Sophie Durand"],
      lieu: "Visioconférence",
      statut: "En attente",
      description: "Point mensuel sur l'avancement du stage",
    },
    {
      id: 3,
      titre: "Évaluation mi-parcours - Thomas Moreau",
      type: "Évaluation",
      date: "2024-07-17",
      heure: "15:00",
      duree: "45min",
      participants: ["Thomas Moreau", "Claire Petit", "RH"],
      lieu: "Bureau direction",
      statut: "Programmé",
      description: "Évaluation des compétences et progression",
    },
    {
      id: 4,
      titre: "Présentation finale - Emma Bernard",
      type: "Présentation",
      date: "2024-07-18",
      heure: "16:00",
      duree: "2h",
      participants: ["Emma Bernard", "Équipe projet", "Direction"],
      lieu: "Amphithéâtre",
      statut: "Confirmé",
      description: "Soutenance du projet de fin de stage",
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Entretien":
        return "bg-blue-100 text-blue-800"
      case "Suivi":
        return "bg-green-100 text-green-800"
      case "Évaluation":
        return "bg-purple-100 text-purple-800"
      case "Présentation":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "Confirmé":
        return "bg-green-100 text-green-800"
      case "En attente":
        return "bg-yellow-100 text-yellow-800"
      case "Programmé":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const aujourdhui = new Date().toISOString().split("T")[0]
  const evenementsAujourdhui = evenements.filter((e) => e.date === aujourdhui)
  const prochainEvenements = evenements.filter((e) => e.date > aujourdhui).slice(0, 5)

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
                  <h1 className="text-3xl font-bold text-gray-900">Planning</h1>
                  <p className="text-gray-600">Gestion des rendez-vous et événements</p>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Nouvel événement
                </Button>
              </div>

              {/* Vue d'ensemble */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{evenementsAujourdhui.length}</div>
                        <p className="text-sm text-gray-600">Aujourd'hui</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="text-2xl font-bold text-green-600">{prochainEvenements.length}</div>
                        <p className="text-sm text-gray-600">À venir</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="text-2xl font-bold text-purple-600">
                          {evenements.filter((e) => e.type === "Entretien").length}
                        </div>
                        <p className="text-sm text-gray-600">Entretiens</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="text-2xl font-bold text-orange-600">
                          {evenements.filter((e) => e.statut === "En attente").length}
                        </div>
                        <p className="text-sm text-gray-600">En attente</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Tabs defaultValue="semaine" className="space-y-4">
              <TabsList>
                <TabsTrigger value="semaine">Cette semaine</TabsTrigger>
                <TabsTrigger value="mois">Ce mois</TabsTrigger>
                <TabsTrigger value="liste">Vue liste</TabsTrigger>
              </TabsList>

              <TabsContent value="semaine">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Calendrier principal */}
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          Calendrier de la semaine
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <Calendar className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                            <p className="text-gray-600 text-lg">Vue calendrier interactive</p>
                            <p className="text-sm text-gray-500 mt-2">Intégration avec Google Calendar à venir</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Événements du jour */}
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Clock className="h-5 w-5" />
                          Aujourd'hui
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {evenementsAujourdhui.length > 0 ? (
                            evenementsAujourdhui.map((evenement) => (
                              <div key={evenement.id} className="border rounded-lg p-3 hover:bg-gray-50">
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="font-medium text-sm">{evenement.titre}</h4>
                                  <Badge className={getTypeColor(evenement.type)} size="sm">
                                    {evenement.type}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                  <Clock className="h-3 w-3" />
                                  {evenement.heure} ({evenement.duree})
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <MapPin className="h-3 w-3" />
                                  {evenement.lieu}
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 text-center py-4">Aucun événement aujourd'hui</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Bell className="h-5 w-5" />
                          Prochains événements
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {prochainEvenements.map((evenement) => (
                            <div key={evenement.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                              <div className="text-center min-w-[50px]">
                                <div className="text-xs text-gray-500">
                                  {new Date(evenement.date).toLocaleDateString("fr-FR", {
                                    day: "2-digit",
                                    month: "short",
                                  })}
                                </div>
                                <div className="text-xs font-medium">{evenement.heure}</div>
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">{evenement.titre}</p>
                                <p className="text-xs text-gray-500">{evenement.lieu}</p>
                              </div>
                              <Badge className={getStatutColor(evenement.statut)} size="sm">
                                {evenement.statut}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="liste">
                <Card>
                  <CardHeader>
                    <CardTitle>Tous les événements</CardTitle>
                    <CardDescription>Liste complète des rendez-vous et événements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {evenements.map((evenement) => (
                        <div key={evenement.id} className="border rounded-lg p-4 hover:bg-gray-50">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="text-center min-w-[60px]">
                                <div className="text-sm font-medium">
                                  {new Date(evenement.date).toLocaleDateString("fr-FR", {
                                    day: "2-digit",
                                    month: "short",
                                  })}
                                </div>
                                <div className="text-xs text-gray-500">{evenement.heure}</div>
                              </div>
                              <div>
                                <h3 className="font-medium">{evenement.titre}</h3>
                                <p className="text-sm text-gray-600">{evenement.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getTypeColor(evenement.type)}>{evenement.type}</Badge>
                              <Badge className={getStatutColor(evenement.statut)}>{evenement.statut}</Badge>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {evenement.lieu}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {evenement.duree}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex -space-x-2">
                                {evenement.participants.slice(0, 3).map((participant, index) => (
                                  <Avatar key={index} className="h-6 w-6 border-2 border-white">
                                    <AvatarFallback className="text-xs">
                                      {participant
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                              </div>
                              {evenement.participants.length > 3 && (
                                <span className="text-xs">+{evenement.participants.length - 3}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mois">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Vue mensuelle
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Calendar className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <p className="text-gray-600 text-lg">Calendrier mensuel</p>
                        <p className="text-sm text-gray-500 mt-2">Vue d'ensemble du mois en cours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
