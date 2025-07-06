"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Eye, Edit, Download, FileText, AlertTriangle, CheckCircle } from "lucide-react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"

export default function ConventionsPage() {
  const [userRole, setUserRole] = useState("rh")
  const [searchTerm, setSearchTerm] = useState("")

  const conventions = [
    {
      id: 1,
      stagiaire: "Marie Dubois",
      entreprise: "TechCorp",
      tuteur: "Jean Martin",
      dateDebut: "2024-07-01",
      dateFin: "2024-12-31",
      statut: "Signée",
      type: "Stage de fin d'études",
      duree: "6 mois",
      remuneration: "600€/mois",
      initials: "MD",
    },
    {
      id: 2,
      stagiaire: "Pierre Laurent",
      entreprise: "InnovateLab",
      tuteur: "Sophie Durand",
      dateDebut: "2024-08-01",
      dateFin: "2024-10-31",
      statut: "En attente",
      type: "Stage d'observation",
      duree: "3 mois",
      remuneration: "400€/mois",
      initials: "PL",
    },
    {
      id: 3,
      stagiaire: "Emma Bernard",
      entreprise: "DataSolutions",
      tuteur: "Marc Rousseau",
      dateDebut: "2024-09-01",
      dateFin: "2025-02-28",
      statut: "Brouillon",
      type: "Stage professionnel",
      duree: "6 mois",
      remuneration: "700€/mois",
      initials: "EB",
    },
    {
      id: 4,
      stagiaire: "Thomas Moreau",
      entreprise: "StartupTech",
      tuteur: "Claire Petit",
      dateDebut: "2024-06-15",
      dateFin: "2024-12-15",
      statut: "Expirée",
      type: "Stage de découverte",
      duree: "6 mois",
      remuneration: "500€/mois",
      initials: "TM",
    },
  ]

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "Signée":
        return "bg-green-100 text-green-800"
      case "En attente":
        return "bg-yellow-100 text-yellow-800"
      case "Brouillon":
        return "bg-blue-100 text-blue-800"
      case "Expirée":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredConventions = conventions.filter(
    (convention) =>
      convention.stagiaire.toLowerCase().includes(searchTerm.toLowerCase()) ||
      convention.entreprise.toLowerCase().includes(searchTerm.toLowerCase()) ||
      convention.tuteur.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const conventionsParStatut = {
    Signée: filteredConventions.filter((c) => c.statut === "Signée"),
    "En attente": filteredConventions.filter((c) => c.statut === "En attente"),
    Brouillon: filteredConventions.filter((c) => c.statut === "Brouillon"),
    Expirée: filteredConventions.filter((c) => c.statut === "Expirée"),
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
                  <h1 className="text-3xl font-bold text-gray-900">Gestion des conventions</h1>
                  <p className="text-gray-600">Création et suivi des conventions de stage</p>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Nouvelle convention
                </Button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher une convention..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">Filtres</Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
              </div>

              {/* Statistiques */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="text-2xl font-bold text-green-600">{conventionsParStatut["Signée"].length}</div>
                        <p className="text-sm text-gray-600">Signées</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <div>
                        <div className="text-2xl font-bold text-yellow-600">
                          {conventionsParStatut["En attente"].length}
                        </div>
                        <p className="text-sm text-gray-600">En attente</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {conventionsParStatut["Brouillon"].length}
                        </div>
                        <p className="text-sm text-gray-600">Brouillons</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div>
                        <div className="text-2xl font-bold text-red-600">{conventionsParStatut["Expirée"].length}</div>
                        <p className="text-sm text-gray-600">Expirées</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Tabs defaultValue="toutes" className="space-y-4">
              <TabsList>
                <TabsTrigger value="toutes">Toutes ({filteredConventions.length})</TabsTrigger>
                <TabsTrigger value="signees">Signées ({conventionsParStatut["Signée"].length})</TabsTrigger>
                <TabsTrigger value="attente">En attente ({conventionsParStatut["En attente"].length})</TabsTrigger>
                <TabsTrigger value="brouillons">Brouillons ({conventionsParStatut["Brouillon"].length})</TabsTrigger>
              </TabsList>

              <TabsContent value="toutes">
                <Card>
                  <CardHeader>
                    <CardTitle>Toutes les conventions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Stagiaire</TableHead>
                          <TableHead>Entreprise</TableHead>
                          <TableHead>Tuteur</TableHead>
                          <TableHead>Période</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Rémunération</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredConventions.map((convention) => (
                          <TableRow key={convention.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="text-xs">{convention.initials}</AvatarFallback>
                                </Avatar>
                                <div className="font-medium">{convention.stagiaire}</div>
                              </div>
                            </TableCell>
                            <TableCell>{convention.entreprise}</TableCell>
                            <TableCell>{convention.tuteur}</TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div>{new Date(convention.dateDebut).toLocaleDateString("fr-FR")}</div>
                                <div className="text-gray-500">
                                  au {new Date(convention.dateFin).toLocaleDateString("fr-FR")}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{convention.type}</Badge>
                            </TableCell>
                            <TableCell className="font-medium">{convention.remuneration}</TableCell>
                            <TableCell>
                              <Badge className={getStatutColor(convention.statut)}>{convention.statut}</Badge>
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
                                  <DropdownMenuItem>
                                    <Download className="h-4 w-4 mr-2" />
                                    Télécharger PDF
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
                    <CardTitle>Conventions en attente de signature</CardTitle>
                    <CardDescription>Ces conventions nécessitent une action urgente</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {conventionsParStatut["En attente"].map((convention) => (
                        <div key={convention.id} className="border rounded-lg p-4 bg-yellow-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>{convention.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{convention.stagiaire}</h3>
                                <p className="text-sm text-gray-600">
                                  {convention.entreprise} - {convention.type}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Début prévu: {new Date(convention.dateDebut).toLocaleDateString("fr-FR")}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-yellow-100 text-yellow-800">Urgent</Badge>
                              <Button size="sm">Relancer</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="brouillons">
                <Card>
                  <CardHeader>
                    <CardTitle>Brouillons de conventions</CardTitle>
                    <CardDescription>Conventions en cours de rédaction</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {conventionsParStatut["Brouillon"].map((convention) => (
                        <div key={convention.id} className="border rounded-lg p-4 bg-blue-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>{convention.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{convention.stagiaire}</h3>
                                <p className="text-sm text-gray-600">
                                  {convention.entreprise} - {convention.duree}
                                </p>
                                <p className="text-xs text-gray-500">Dernière modification: Il y a 2 jours</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4 mr-2" />
                                Continuer
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="signees">
                <Card>
                  <CardHeader>
                    <CardTitle>Conventions signées</CardTitle>
                    <CardDescription>Conventions actives et validées</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {conventionsParStatut["Signée"].map((convention) => (
                        <div key={convention.id} className="border rounded-lg p-4 bg-green-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>{convention.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{convention.stagiaire}</h3>
                                <p className="text-sm text-gray-600">
                                  {convention.entreprise} - {convention.remuneration}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Signée le {new Date(convention.dateDebut).toLocaleDateString("fr-FR")}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-green-100 text-green-800">Active</Badge>
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4 mr-2" />
                                PDF
                              </Button>
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
