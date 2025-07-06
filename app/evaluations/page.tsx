"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Eye, Edit, Star, Award, Clock } from "lucide-react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"

export default function EvaluationsPage() {
  const [userRole, setUserRole] = useState("rh")
  const [searchTerm, setSearchTerm] = useState("")

  const evaluations = [
    {
      id: 1,
      stagiaire: "Marie Dubois",
      tuteur: "Jean Martin",
      type: "Mi-parcours",
      date: "2024-06-15",
      statut: "Complétée",
      noteGlobale: 16.5,
      competences: {
        technique: 17,
        communication: 16,
        autonomie: 15,
        initiative: 18,
      },
      commentaire: "Excellente progression, très motivée",
      initials: "MD",
    },
    {
      id: 2,
      stagiaire: "Pierre Laurent",
      tuteur: "Sophie Durand",
      type: "Finale",
      date: "2024-06-20",
      statut: "En attente",
      noteGlobale: null,
      competences: {
        technique: null,
        communication: null,
        autonomie: null,
        initiative: null,
      },
      commentaire: "",
      initials: "PL",
    },
    {
      id: 3,
      stagiaire: "Thomas Moreau",
      tuteur: "Claire Petit",
      type: "Finale",
      date: "2024-06-10",
      statut: "Complétée",
      noteGlobale: 18.2,
      competences: {
        technique: 19,
        communication: 18,
        autonomie: 17,
        initiative: 19,
      },
      commentaire: "Stagiaire exceptionnel, recommandé pour un CDI",
      initials: "TM",
    },
    {
      id: 4,
      stagiaire: "Emma Bernard",
      tuteur: "Marc Rousseau",
      type: "Initiale",
      date: "2024-06-25",
      statut: "Programmée",
      noteGlobale: null,
      competences: {
        technique: null,
        communication: null,
        autonomie: null,
        initiative: null,
      },
      commentaire: "",
      initials: "EB",
    },
  ]

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "Complétée":
        return "bg-green-100 text-green-800"
      case "En attente":
        return "bg-yellow-100 text-yellow-800"
      case "Programmée":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Initiale":
        return "bg-blue-100 text-blue-800"
      case "Mi-parcours":
        return "bg-purple-100 text-purple-800"
      case "Finale":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getNoteColor = (note: number) => {
    if (note >= 16) return "text-green-600"
    if (note >= 12) return "text-yellow-600"
    return "text-red-600"
  }

  const filteredEvaluations = evaluations.filter(
    (evaluation) =>
      evaluation.stagiaire.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.tuteur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const evaluationsParStatut = {
    Complétée: filteredEvaluations.filter((e) => e.statut === "Complétée"),
    "En attente": filteredEvaluations.filter((e) => e.statut === "En attente"),
    Programmée: filteredEvaluations.filter((e) => e.statut === "Programmée"),
  }

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
                  <h1 className="text-3xl font-bold text-gray-900">Évaluations</h1>
                  <p className="text-gray-600">Suivi des évaluations et performances</p>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Nouvelle évaluation
                </Button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher une évaluation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Statistiques */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          {evaluationsParStatut["Complétée"].length}
                        </div>
                        <p className="text-sm text-gray-600">Complétées</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-yellow-600" />
                      <div>
                        <div className="text-2xl font-bold text-yellow-600">
                          {evaluationsParStatut["En attente"].length}
                        </div>
                        <p className="text-sm text-gray-600">En attente</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {evaluations.filter((e) => e.noteGlobale && e.noteGlobale >= 16).length}
                        </div>
                        <p className="text-sm text-gray-600">Excellentes</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 bg-purple-600 rounded"></div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">
                          {(
                            evaluations.filter((e) => e.noteGlobale).reduce((acc, e) => acc + e.noteGlobale!, 0) /
                              evaluations.filter((e) => e.noteGlobale).length || 0
                          ).toFixed(1)}
                        </div>
                        <p className="text-sm text-gray-600">Moyenne générale</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Tabs defaultValue="toutes" className="space-y-4">
              <TabsList>
                <TabsTrigger value="toutes">Toutes ({filteredEvaluations.length})</TabsTrigger>
                <TabsTrigger value="completees">Complétées ({evaluationsParStatut["Complétée"].length})</TabsTrigger>
                <TabsTrigger value="attente">En attente ({evaluationsParStatut["En attente"].length})</TabsTrigger>
                <TabsTrigger value="programmees">Programmées ({evaluationsParStatut["Programmée"].length})</TabsTrigger>
              </TabsList>

              <TabsContent value="toutes">
                <Card>
                  <CardHeader>
                    <CardTitle>Toutes les évaluations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Stagiaire</TableHead>
                          <TableHead>Tuteur</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Note globale</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredEvaluations.map((evaluation) => (
                          <TableRow key={evaluation.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="text-xs">{evaluation.initials}</AvatarFallback>
                                </Avatar>
                                <div className="font-medium">{evaluation.stagiaire}</div>
                              </div>
                            </TableCell>
                            <TableCell>{evaluation.tuteur}</TableCell>
                            <TableCell>
                              <Badge className={getTypeColor(evaluation.type)}>{evaluation.type}</Badge>
                            </TableCell>
                            <TableCell>{new Date(evaluation.date).toLocaleDateString("fr-FR")}</TableCell>
                            <TableCell>
                              {evaluation.noteGlobale ? (
                                <div className="flex items-center gap-2">
                                  <span className={`font-bold ${getNoteColor(evaluation.noteGlobale)}`}>
                                    {evaluation.noteGlobale}/20
                                  </span>
                                  {evaluation.noteGlobale >= 16 && <Star className="h-4 w-4 text-yellow-500" />}
                                </div>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatutColor(evaluation.statut)}>{evaluation.statut}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Voir détails
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Modifier
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="completees">
                <div className="grid gap-6">
                  {evaluationsParStatut["Complétée"].map((evaluation) => (
                    <Card key={evaluation.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>{evaluation.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{evaluation.stagiaire}</CardTitle>
                              <p className="text-sm text-gray-600">Évalué par {evaluation.tuteur}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getTypeColor(evaluation.type)}>{evaluation.type}</Badge>
                            <div className="text-right">
                              <div className={`text-2xl font-bold ${getNoteColor(evaluation.noteGlobale!)}`}>
                                {evaluation.noteGlobale}/20
                              </div>
                              <div className="text-xs text-gray-500">
                                {new Date(evaluation.date).toLocaleDateString("fr-FR")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Technique</p>
                            <div className="flex items-center gap-2">
                              <Progress value={(evaluation.competences.technique! / 20) * 100} className="flex-1" />
                              <span className="text-sm font-medium">{evaluation.competences.technique}/20</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Communication</p>
                            <div className="flex items-center gap-2">
                              <Progress value={(evaluation.competences.communication! / 20) * 100} className="flex-1" />
                              <span className="text-sm font-medium">{evaluation.competences.communication}/20</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Autonomie</p>
                            <div className="flex items-center gap-2">
                              <Progress value={(evaluation.competences.autonomie! / 20) * 100} className="flex-1" />
                              <span className="text-sm font-medium">{evaluation.competences.autonomie}/20</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Initiative</p>
                            <div className="flex items-center gap-2">
                              <Progress value={(evaluation.competences.initiative! / 20) * 100} className="flex-1" />
                              <span className="text-sm font-medium">{evaluation.competences.initiative}/20</span>
                            </div>
                          </div>
                        </div>
                        {evaluation.commentaire && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-gray-600 mb-1">Commentaire du tuteur :</p>
                            <p className="text-sm">{evaluation.commentaire}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="attente">
                <Card>
                  <CardHeader>
                    <CardTitle>Évaluations en attente de saisie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {evaluationsParStatut["En attente"].map((evaluation) => (
                        <div key={evaluation.id} className="border rounded-lg p-4 bg-yellow-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>{evaluation.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{evaluation.stagiaire}</h3>
                                <p className="text-sm text-gray-600">Tuteur: {evaluation.tuteur}</p>
                                <Badge className={getTypeColor(evaluation.type)} size="sm">
                                  {evaluation.type}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-right mr-4">
                                <p className="text-sm text-gray-600">Date prévue</p>
                                <p className="font-medium">{new Date(evaluation.date).toLocaleDateString("fr-FR")}</p>
                              </div>
                              <Button>Saisir l'évaluation</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="programmees">
                <Card>
                  <CardHeader>
                    <CardTitle>Évaluations programmées</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {evaluationsParStatut["Programmée"].map((evaluation) => (
                        <div key={evaluation.id} className="border rounded-lg p-4 bg-blue-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>{evaluation.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{evaluation.stagiaire}</h3>
                                <p className="text-sm text-gray-600">Tuteur: {evaluation.tuteur}</p>
                                <Badge className={getTypeColor(evaluation.type)} size="sm">
                                  {evaluation.type}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Programmée pour le</p>
                              <p className="font-medium">{new Date(evaluation.date).toLocaleDateString("fr-FR")}</p>
                            </div>
                          </div>
                        </div>
                      ))}
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
