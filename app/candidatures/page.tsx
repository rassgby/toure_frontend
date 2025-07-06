"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, Download, MoreHorizontal, Eye, Check, X, Star } from "lucide-react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"

export default function CandidaturesPage() {
  const [userRole, setUserRole] = useState("rh")
  const [searchTerm, setSearchTerm] = useState("")

  const candidatures = [
    {
      id: 1,
      nom: "Alice Martin",
      email: "alice.martin@email.com",
      formation: "Master Informatique",
      etablissement: "Université Paris-Saclay",
      service: "Développement",
      datePostulation: "2024-06-15",
      statut: "En attente",
      score: 85,
      cv: "cv_alice_martin.pdf",
      initials: "AM",
    },
    {
      id: 2,
      nom: "Lucas Dubois",
      email: "lucas.dubois@email.com",
      formation: "BTS Commerce",
      etablissement: "Lycée Jean Moulin",
      service: "Marketing",
      datePostulation: "2024-06-12",
      statut: "Accepté",
      score: 92,
      cv: "cv_lucas_dubois.pdf",
      initials: "LD",
    },
    {
      id: 3,
      nom: "Emma Rousseau",
      email: "emma.rousseau@email.com",
      formation: "Licence RH",
      etablissement: "IAE Lyon",
      service: "Ressources Humaines",
      datePostulation: "2024-06-10",
      statut: "Refusé",
      score: 65,
      cv: "cv_emma_rousseau.pdf",
      initials: "ER",
    },
    {
      id: 4,
      nom: "Hugo Leroy",
      email: "hugo.leroy@email.com",
      formation: "École d'Ingénieur",
      etablissement: "INSA Toulouse",
      service: "R&D",
      datePostulation: "2024-06-18",
      statut: "Entretien",
      score: 88,
      cv: "cv_hugo_leroy.pdf",
      initials: "HL",
    },
  ]

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "En attente":
        return "bg-yellow-100 text-yellow-800"
      case "Accepté":
        return "bg-green-100 text-green-800"
      case "Refusé":
        return "bg-red-100 text-red-800"
      case "Entretien":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const filteredCandidatures = candidatures.filter(
    (candidature) =>
      candidature.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidature.formation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidature.service.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const candidaturesParStatut = {
    "En attente": filteredCandidatures.filter((c) => c.statut === "En attente"),
    Entretien: filteredCandidatures.filter((c) => c.statut === "Entretien"),
    Accepté: filteredCandidatures.filter((c) => c.statut === "Accepté"),
    Refusé: filteredCandidatures.filter((c) => c.statut === "Refusé"),
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
                  <h1 className="text-3xl font-bold text-gray-900">Gestion des candidatures</h1>
                  <p className="text-gray-600">Tri et sélection des candidats</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exporter
                  </Button>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtres avancés
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher une candidature..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Statistiques rapides */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-yellow-600">
                      {candidaturesParStatut["En attente"].length}
                    </div>
                    <p className="text-sm text-gray-600">En attente</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-blue-600">{candidaturesParStatut["Entretien"].length}</div>
                    <p className="text-sm text-gray-600">Entretiens</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-green-600">{candidaturesParStatut["Accepté"].length}</div>
                    <p className="text-sm text-gray-600">Acceptées</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-red-600">{candidaturesParStatut["Refusé"].length}</div>
                    <p className="text-sm text-gray-600">Refusées</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Tabs defaultValue="toutes" className="space-y-4">
              <TabsList>
                <TabsTrigger value="toutes">Toutes ({filteredCandidatures.length})</TabsTrigger>
                <TabsTrigger value="attente">En attente ({candidaturesParStatut["En attente"].length})</TabsTrigger>
                <TabsTrigger value="entretien">Entretiens ({candidaturesParStatut["Entretien"].length})</TabsTrigger>
                <TabsTrigger value="accepte">Acceptées ({candidaturesParStatut["Accepté"].length})</TabsTrigger>
              </TabsList>

              <TabsContent value="toutes">
                <Card>
                  <CardHeader>
                    <CardTitle>Toutes les candidatures</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Candidat</TableHead>
                          <TableHead>Formation</TableHead>
                          <TableHead>Service demandé</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCandidatures.map((candidature) => (
                          <TableRow key={candidature.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="text-xs">{candidature.initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{candidature.nom}</div>
                                  <div className="text-sm text-gray-500">{candidature.email}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium text-sm">{candidature.formation}</div>
                                <div className="text-xs text-gray-500">{candidature.etablissement}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{candidature.service}</Badge>
                            </TableCell>
                            <TableCell>{new Date(candidature.datePostulation).toLocaleDateString("fr-FR")}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className={`font-medium ${getScoreColor(candidature.score)}`}>
                                  {candidature.score}/100
                                </span>
                                {candidature.score >= 80 && <Star className="h-4 w-4 text-yellow-500" />}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatutColor(candidature.statut)}>{candidature.statut}</Badge>
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
                                    Voir le dossier
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="h-4 w-4 mr-2" />
                                    Télécharger CV
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Check className="h-4 w-4 mr-2" />
                                    Accepter
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <X className="h-4 w-4 mr-2" />
                                    Refuser
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

              <TabsContent value="attente">
                <Card>
                  <CardHeader>
                    <CardTitle>Candidatures en attente de traitement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {candidaturesParStatut["En attente"].map((candidature) => (
                        <div key={candidature.id} className="border rounded-lg p-4 hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>{candidature.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{candidature.nom}</h3>
                                <p className="text-sm text-gray-600">{candidature.formation}</p>
                                <p className="text-xs text-gray-500">{candidature.etablissement}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{candidature.service}</Badge>
                              <span className={`font-medium ${getScoreColor(candidature.score)}`}>
                                {candidature.score}/100
                              </span>
                              <div className="flex gap-1">
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="default">
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="destructive">
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="entretien">
                <Card>
                  <CardHeader>
                    <CardTitle>Candidatures en phase d'entretien</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      {candidaturesParStatut["Entretien"].length === 0
                        ? "Aucun entretien programmé"
                        : `${candidaturesParStatut["Entretien"].length} entretien(s) programmé(s)`}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="accepte">
                <Card>
                  <CardHeader>
                    <CardTitle>Candidatures acceptées</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {candidaturesParStatut["Accepté"].map((candidature) => (
                        <div key={candidature.id} className="border rounded-lg p-4 bg-green-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>{candidature.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{candidature.nom}</h3>
                                <p className="text-sm text-gray-600">{candidature.formation}</p>
                                <Badge className="mt-1 bg-green-100 text-green-800">
                                  Accepté - Score: {candidature.score}/100
                                </Badge>
                              </div>
                            </div>
                            <Button variant="outline">Créer le dossier stagiaire</Button>
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
