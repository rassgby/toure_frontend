"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Eye, Edit, Mail } from "lucide-react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"

export default function StagiairesPage() {
  const [userRole, setUserRole] = useState("rh")
  const [searchTerm, setSearchTerm] = useState("")

  const stagiaires = [
    {
      id: 1,
      nom: "Marie Dubois",
      email: "marie.dubois@email.com",
      service: "Informatique",
      tuteur: "Jean Martin",
      dateDebut: "2024-01-15",
      dateFin: "2024-07-15",
      statut: "En cours",
      progression: 75,
      initials: "MD",
    },
    {
      id: 2,
      nom: "Pierre Laurent",
      email: "pierre.laurent@email.com",
      service: "Marketing",
      tuteur: "Sophie Durand",
      dateDebut: "2024-02-01",
      dateFin: "2024-08-01",
      statut: "En cours",
      progression: 60,
      initials: "PL",
    },
    {
      id: 3,
      nom: "Thomas Moreau",
      email: "thomas.moreau@email.com",
      service: "RH",
      tuteur: "Claire Petit",
      dateDebut: "2024-01-08",
      dateFin: "2024-07-08",
      statut: "Terminé",
      progression: 100,
      initials: "TM",
    },
    {
      id: 4,
      nom: "Emma Bernard",
      email: "emma.bernard@email.com",
      service: "Finance",
      tuteur: "Marc Rousseau",
      dateDebut: "2024-03-01",
      dateFin: "2024-09-01",
      statut: "À venir",
      progression: 0,
      initials: "EB",
    },
  ]

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "En cours":
        return "bg-blue-100 text-blue-800"
      case "Terminé":
        return "bg-green-100 text-green-800"
      case "À venir":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredStagiaires = stagiaires.filter(
    (stagiaire) =>
      stagiaire.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stagiaire.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stagiaire.tuteur.toLowerCase().includes(searchTerm.toLowerCase()),
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
                  <h1 className="text-3xl font-bold text-gray-900">Gestion des stagiaires</h1>
                  <p className="text-gray-600">Suivi et gestion de tous les stagiaires</p>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Nouveau stagiaire
                </Button>
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
                <Button variant="outline">Filtres</Button>
                <Button variant="outline">Exporter</Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Liste des stagiaires ({filteredStagiaires.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Stagiaire</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Tuteur</TableHead>
                      <TableHead>Période</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Progression</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStagiaires.map((stagiaire) => (
                      <TableRow key={stagiaire.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">{stagiaire.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{stagiaire.nom}</div>
                              <div className="text-sm text-gray-500">{stagiaire.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{stagiaire.service}</Badge>
                        </TableCell>
                        <TableCell>{stagiaire.tuteur}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{new Date(stagiaire.dateDebut).toLocaleDateString("fr-FR")}</div>
                            <div className="text-gray-500">
                              au {new Date(stagiaire.dateFin).toLocaleDateString("fr-FR")}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatutColor(stagiaire.statut)}>{stagiaire.statut}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${stagiaire.progression}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{stagiaire.progression}%</span>
                          </div>
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
                                Voir le profil
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="h-4 w-4 mr-2" />
                                Envoyer un message
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
          </div>
        </main>
      </div>
    </div>
  )
}
