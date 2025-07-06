"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MessageSquare, Calendar, Award, FileText, TrendingUp, Clock } from "lucide-react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"

export default function MesStagiairesPage() {
  const [userRole, setUserRole] = useState("tuteur")
  const [searchTerm, setSearchTerm] = useState("")

  const stagiaires = [
    {
      id: 1,
      nom: "Marie Dubois",
      email: "marie.dubois@email.com",
      formation: "Master Informatique",
      dateDebut: "2024-01-15",
      dateFin: "2024-07-15",
      progression: 85,
      noteActuelle: 16.5,
      prochainRendezVous: "2024-07-20",
      statut: "Excellent",
      objectifs: [
        { titre: "Maîtriser React", progres: 90, statut: "En cours" },
        { titre: "Projet final", progres: 70, statut: "En cours" },
        { titre: "Présentation", progres: 30, statut: "À venir" },
      ],
      rapports: 8,
      rapportsAttendus: 10,
      initials: "MD",
    },
    {
      id: 2,
      nom: "Pierre Laurent",
      email: "pierre.laurent@email.com",
      formation: "BTS Commerce",
      dateDebut: "2024-02-01",
      dateFin: "2024-08-01",
      progression: 65,
      noteActuelle: 14.2,
      prochainRendezVous: "2024-07-22",
      statut: "Bien",
      objectifs: [
        { titre: "Étude de marché", progres: 80, statut: "En cours" },
        { titre: "Stratégie marketing", progres: 50, statut: "En cours" },
        { titre: "Campagne publicitaire", progres: 20, statut: "À venir" },
      ],
      rapports: 5,
      rapportsAttendus: 7,
      initials: "PL",
    },
    {
      id: 3,
      nom: "Thomas Moreau",
      email: "thomas.moreau@email.com",
      formation: "École d'Ingénieur",
      dateDebut: "2024-01-08",
      dateFin: "2024-07-08",
      progression: 95,
      noteActuelle: 18.1,
      prochainRendezVous: null,
      statut: "Terminé",
      objectifs: [
        { titre: "Analyse de données", progres: 100, statut: "Terminé" },
        { titre: "Machine Learning", progres: 100, statut: "Terminé" },
        { titre: "Soutenance", progres: 100, statut: "Terminé" },
      ],
      rapports: 12,
      rapportsAttendus: 12,
      initials: "TM",
    },
  ]

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "Excellent":
        return "bg-green-100 text-green-800"
      case "Bien":
        return "bg-blue-100 text-blue-800"
      case "Terminé":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getObjectifColor = (statut: string) => {
    switch (statut) {
      case "Terminé":
        return "bg-green-100 text-green-800"
      case "En cours":
        return "bg-blue-100 text-blue-800"
      case "À venir":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredStagiaires = stagiaires.filter((stagiaire) =>
    stagiaire.nom.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
                  <h1 className="text-3xl font-bold text-gray-900">Mes Stagiaires</h1>
                  <p className="text-gray-600">Suivi et accompagnement personnalisé</p>
                </div>
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  {filteredStagiaires.length} stagiaire{filteredStagiaires.length > 1 ? "s" : ""}
                </Badge>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher un stagiaire..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Vue d'ensemble */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {(
                            filteredStagiaires.reduce((acc, s) => acc + s.progression, 0) / filteredStagiaires.length
                          ).toFixed(0)}
                          %
                        </div>
                        <p className="text-sm text-gray-600">Progression moyenne</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          {(
                            filteredStagiaires.reduce((acc, s) => acc + s.noteActuelle, 0) / filteredStagiaires.length
                          ).toFixed(1)}
                          /20
                        </div>
                        <p className="text-sm text-gray-600">Note moyenne</p>
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
                          {filteredStagiaires.reduce((acc, s) => acc + s.rapports, 0)}
                        </div>
                        <p className="text-sm text-gray-600">Rapports reçus</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="text-2xl font-bold text-orange-600">
                          {filteredStagiaires.filter((s) => s.prochainRendezVous).length}
                        </div>
                        <p className="text-sm text-gray-600">RDV programmés</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Tabs defaultValue="vue-ensemble" className="space-y-6">
              <TabsList>
                <TabsTrigger value="vue-ensemble">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="progression">Progression</TabsTrigger>
                <TabsTrigger value="evaluations">Évaluations</TabsTrigger>
                <TabsTrigger value="planning">Planning</TabsTrigger>
              </TabsList>

              <TabsContent value="vue-ensemble">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredStagiaires.map((stagiaire) => (
                    <Card key={stagiaire.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="text-lg">{stagiaire.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{stagiaire.nom}</h3>
                              <p className="text-sm text-gray-600">{stagiaire.formation}</p>
                            </div>
                          </div>
                          <Badge className={getStatutColor(stagiaire.statut)}>{stagiaire.statut}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Progression globale</span>
                            <span className="text-sm text-gray-600">{stagiaire.progression}%</span>
                          </div>
                          <Progress value={stagiaire.progression} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Note actuelle</p>
                            <p className="font-semibold text-lg">{stagiaire.noteActuelle}/20</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Rapports</p>
                            <p className="font-semibold text-lg">
                              {stagiaire.rapports}/{stagiaire.rapportsAttendus}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600 mb-2">Période de stage</p>
                          <p className="text-sm">
                            {new Date(stagiaire.dateDebut).toLocaleDateString("fr-FR")} -{" "}
                            {new Date(stagiaire.dateFin).toLocaleDateString("fr-FR")}
                          </p>
                        </div>

                        {stagiaire.prochainRendezVous && (
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-blue-800">Prochain RDV</p>
                            <p className="text-sm text-blue-700">
                              {new Date(stagiaire.prochainRendezVous).toLocaleDateString("fr-FR")}
                            </p>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Calendar className="h-4 w-4 mr-2" />
                            RDV
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="progression">
                <div className="space-y-6">
                  {filteredStagiaires.map((stagiaire) => (
                    <Card key={stagiaire.id}>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{stagiaire.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{stagiaire.nom}</CardTitle>
                            <CardDescription>Suivi des objectifs et progression</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {stagiaire.objectifs.map((objectif, index) => (
                            <div key={index} className="border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{objectif.titre}</h4>
                                <Badge className={getObjectifColor(objectif.statut)} size="sm">
                                  {objectif.statut}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-3">
                                <Progress value={objectif.progres} className="flex-1" />
                                <span className="text-sm font-medium w-12">{objectif.progres}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="evaluations">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredStagiaires.map((stagiaire) => (
                    <Card key={stagiaire.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{stagiaire.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{stagiaire.nom}</CardTitle>
                              <CardDescription>Évaluations et notes</CardDescription>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">{stagiaire.noteActuelle}/20</div>
                            <div className="text-xs text-gray-500">Note actuelle</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm">Compétences techniques</span>
                            <span className="font-medium">17/20</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm">Communication</span>
                            <span className="font-medium">16/20</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm">Autonomie</span>
                            <span className="font-medium">15/20</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm">Initiative</span>
                            <span className="font-medium">18/20</span>
                          </div>
                        </div>
                        <Button className="w-full mt-4 bg-transparent" variant="outline">
                          <Award className="h-4 w-4 mr-2" />
                          Nouvelle évaluation
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="planning">
                <Card>
                  <CardHeader>
                    <CardTitle>Planning des rendez-vous</CardTitle>
                    <CardDescription>Gérez vos rendez-vous avec vos stagiaires</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredStagiaires
                        .filter((s) => s.prochainRendezVous)
                        .map((stagiaire) => (
                          <div key={stagiaire.id} className="border rounded-lg p-4 hover:bg-gray-50">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarFallback>{stagiaire.initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium">{stagiaire.nom}</h4>
                                  <p className="text-sm text-gray-600">Suivi mensuel</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">
                                  {new Date(stagiaire.prochainRendezVous!).toLocaleDateString("fr-FR")}
                                </p>
                                <p className="text-sm text-gray-600">14:00 - 15:00</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      <Button className="w-full bg-transparent" variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Programmer un nouveau RDV
                      </Button>
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
