"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  Download,
  FileText,
  TrendingUp,
  Users,
  Calendar,
  Target,
  Award,
  DollarSign,
  Activity,
} from "lucide-react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"

export default function RapportsPage() {
  const [userRole, setUserRole] = useState("rh")
  const [periode, setPeriode] = useState("mois")

  const rapportsDisponibles = [
    {
      id: 1,
      titre: "Rapport mensuel des stages",
      description: "Vue d'ensemble des activités du mois",
      type: "Mensuel",
      dateGeneration: "2024-07-01",
      statut: "Disponible",
      taille: "2.4 MB",
      format: "PDF",
    },
    {
      id: 2,
      titre: "Analyse des performances",
      description: "Évaluation des stagiaires et tuteurs",
      type: "Trimestriel",
      dateGeneration: "2024-06-30",
      statut: "Disponible",
      taille: "1.8 MB",
      format: "Excel",
    },
    {
      id: 3,
      titre: "Rapport financier",
      description: "Coûts et budget des stages",
      type: "Annuel",
      dateGeneration: "2024-06-15",
      statut: "En cours",
      taille: "-",
      format: "PDF",
    },
  ]

  const metriques = {
    mois: {
      stagiaires: { valeur: 42, evolution: "+12%" },
      satisfaction: { valeur: "94%", evolution: "+2%" },
      cout: { valeur: "103,000€", evolution: "-5%" },
      conversion: { valeur: "68%", evolution: "+8%" },
    },
    trimestre: {
      stagiaires: { valeur: 156, evolution: "+23%" },
      satisfaction: { valeur: "92%", evolution: "+1%" },
      cout: { valeur: "312,000€", evolution: "-3%" },
      conversion: { valeur: "71%", evolution: "+12%" },
    },
    annee: {
      stagiaires: { valeur: 624, evolution: "+18%" },
      satisfaction: { valeur: "91%", evolution: "+4%" },
      cout: { valeur: "1,248,000€", evolution: "-2%" },
      conversion: { valeur: "69%", evolution: "+15%" },
    },
  }

  const donneesPeriode = metriques[periode as keyof typeof metriques]

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
                  <h1 className="text-3xl font-bold text-gray-900">Rapports et Analytics</h1>
                  <p className="text-gray-600">Analyse des données et génération de rapports</p>
                </div>
                <div className="flex items-center gap-4">
                  <Select value={periode} onValueChange={setPeriode}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mois">Ce mois</SelectItem>
                      <SelectItem value="trimestre">Ce trimestre</SelectItem>
                      <SelectItem value="annee">Cette année</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Exporter
                  </Button>
                </div>
              </div>

              {/* Métriques principales */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Stagiaires actifs</p>
                        <p className="text-2xl font-bold text-blue-600">{donneesPeriode.stagiaires.valeur}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <Users className="h-8 w-8 text-blue-600 mb-2" />
                        <Badge className="bg-blue-100 text-blue-800">{donneesPeriode.stagiaires.evolution}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Satisfaction</p>
                        <p className="text-2xl font-bold text-green-600">{donneesPeriode.satisfaction.valeur}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <Award className="h-8 w-8 text-green-600 mb-2" />
                        <Badge className="bg-green-100 text-green-800">{donneesPeriode.satisfaction.evolution}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Coût total</p>
                        <p className="text-2xl font-bold text-purple-600">{donneesPeriode.cout.valeur}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <DollarSign className="h-8 w-8 text-purple-600 mb-2" />
                        <Badge className="bg-purple-100 text-purple-800">{donneesPeriode.cout.evolution}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Taux conversion</p>
                        <p className="text-2xl font-bold text-orange-600">{donneesPeriode.conversion.valeur}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <Target className="h-8 w-8 text-orange-600 mb-2" />
                        <Badge className="bg-orange-100 text-orange-800">{donneesPeriode.conversion.evolution}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Tabs defaultValue="dashboard" className="space-y-6">
              <TabsList>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="rapports">Rapports</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="exports">Exports</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Évolution des stages
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <BarChart3 className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                          <p className="text-gray-600">Graphique d'évolution</p>
                          <p className="text-sm text-gray-500 mt-2">Tendance positive sur 6 mois</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        Répartition par service
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Informatique</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                            </div>
                            <span className="text-sm font-medium">45%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Marketing</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div className="bg-green-600 h-2 rounded-full" style={{ width: "30%" }}></div>
                            </div>
                            <span className="text-sm font-medium">30%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">RH</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div className="bg-purple-600 h-2 rounded-full" style={{ width: "15%" }}></div>
                            </div>
                            <span className="text-sm font-medium">15%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Finance</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div className="bg-orange-600 h-2 rounded-full" style={{ width: "10%" }}></div>
                            </div>
                            <span className="text-sm font-medium">10%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Top Performances
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div>
                            <p className="font-medium">Marie Dubois</p>
                            <p className="text-sm text-gray-600">Développement Web</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">18.5/20</p>
                            <p className="text-xs text-gray-500">Excellent</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <div>
                            <p className="font-medium">Thomas Moreau</p>
                            <p className="text-sm text-gray-600">Data Analysis</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-blue-600">17.8/20</p>
                            <p className="text-xs text-gray-500">Très bien</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                          <div>
                            <p className="font-medium">Emma Bernard</p>
                            <p className="text-sm text-gray-600">Marketing Digital</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-purple-600">17.2/20</p>
                            <p className="text-xs text-gray-500">Très bien</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Activité récente
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm">Convention signée - Pierre Laurent</p>
                            <p className="text-xs text-gray-500">Il y a 2 heures</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm">Évaluation complétée - Marie Dubois</p>
                            <p className="text-xs text-gray-500">Il y a 4 heures</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm">Nouveau candidat - Sophie Martin</p>
                            <p className="text-xs text-gray-500">Il y a 6 heures</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm">Rapport soumis - Thomas Moreau</p>
                            <p className="text-xs text-gray-500">Il y a 1 jour</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="rapports">
                <Card>
                  <CardHeader>
                    <CardTitle>Rapports disponibles</CardTitle>
                    <CardDescription>Téléchargez et consultez les rapports générés</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {rapportsDisponibles.map((rapport) => (
                        <div key={rapport.id} className="border rounded-lg p-4 hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FileText className="h-6 w-6 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-medium">{rapport.titre}</h3>
                                <p className="text-sm text-gray-600">{rapport.description}</p>
                                <div className="flex items-center gap-4 mt-1">
                                  <span className="text-xs text-gray-500">
                                    Généré le {new Date(rapport.dateGeneration).toLocaleDateString("fr-FR")}
                                  </span>
                                  <span className="text-xs text-gray-500">{rapport.taille}</span>
                                  <Badge variant="outline" size="sm">
                                    {rapport.format}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                className={
                                  rapport.statut === "Disponible"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {rapport.statut}
                              </Badge>
                              {rapport.statut === "Disponible" && (
                                <Button size="sm" variant="outline">
                                  <Download className="h-4 w-4 mr-2" />
                                  Télécharger
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Analyse prédictive</CardTitle>
                      <CardDescription>Tendances et prévisions basées sur l'IA</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Activity className="h-12 w-12 text-green-500 mx-auto mb-4" />
                          <p className="text-gray-600">Modèles prédictifs</p>
                          <p className="text-sm text-gray-500 mt-2">Prévision de succès: 87%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Insights automatiques</CardTitle>
                      <CardDescription>Recommandations basées sur les données</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm font-medium text-blue-800">💡 Recommandation</p>
                          <p className="text-sm text-blue-700 mt-1">
                            Augmenter la durée des stages en informatique pour améliorer les résultats de 15%
                          </p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-sm font-medium text-green-800">📈 Tendance positive</p>
                          <p className="text-sm text-green-700 mt-1">
                            Le taux de satisfaction augmente de 2% chaque trimestre
                          </p>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg">
                          <p className="text-sm font-medium text-orange-800">⚠️ Point d'attention</p>
                          <p className="text-sm text-orange-700 mt-1">
                            Pic de candidatures prévu en septembre, prévoir plus de ressources
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="exports">
                <Card>
                  <CardHeader>
                    <CardTitle>Exports personnalisés</CardTitle>
                    <CardDescription>Créez et téléchargez des rapports sur mesure</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Button variant="outline" className="h-24 flex-col bg-transparent">
                        <FileText className="h-6 w-6 mb-2" />
                        <span>Export PDF</span>
                        <span className="text-xs text-gray-500">Rapport complet</span>
                      </Button>
                      <Button variant="outline" className="h-24 flex-col bg-transparent">
                        <BarChart3 className="h-6 w-6 mb-2" />
                        <span>Export Excel</span>
                        <span className="text-xs text-gray-500">Données brutes</span>
                      </Button>
                      <Button variant="outline" className="h-24 flex-col bg-transparent">
                        <Download className="h-6 w-6 mb-2" />
                        <span>Export CSV</span>
                        <span className="text-xs text-gray-500">Import externe</span>
                      </Button>
                      <Button variant="outline" className="h-24 flex-col bg-transparent">
                        <Users className="h-6 w-6 mb-2" />
                        <span>Liste stagiaires</span>
                        <span className="text-xs text-gray-500">Contacts</span>
                      </Button>
                      <Button variant="outline" className="h-24 flex-col bg-transparent">
                        <Award className="h-6 w-6 mb-2" />
                        <span>Évaluations</span>
                        <span className="text-xs text-gray-500">Notes détaillées</span>
                      </Button>
                      <Button variant="outline" className="h-24 flex-col bg-transparent">
                        <Calendar className="h-6 w-6 mb-2" />
                        <span>Planning</span>
                        <span className="text-xs text-gray-500">Calendrier</span>
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
