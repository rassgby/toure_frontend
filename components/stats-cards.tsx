"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  FileText,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Award,
  Target,
  DollarSign,
  Building,
  Star,
} from "lucide-react"

interface StatsCardsProps {
  userRole: string
}

export default function StatsCards({ userRole }: StatsCardsProps) {
  // Statistiques spécialisées par rôle
  const statsData = {
    rh: [
      {
        title: "Nouvelles candidatures",
        value: "23",
        change: "+15%",
        icon: Users,
        color: "text-blue-600",
        description: "Cette semaine",
      },
      {
        title: "Conventions à traiter",
        value: "8",
        change: "Urgent",
        icon: FileText,
        color: "text-orange-600",
        description: "Action requise",
      },
      {
        title: "Entretiens planifiés",
        value: "15",
        change: "+5",
        icon: Calendar,
        color: "text-green-600",
        description: "Cette semaine",
      },
      {
        title: "Taux de placement",
        value: "89%",
        change: "+3%",
        icon: TrendingUp,
        color: "text-purple-600",
        description: "Vs mois dernier",
      },
    ],
    tuteur: [
      {
        title: "Stagiaires encadrés",
        value: "5",
        change: "Actifs",
        icon: Users,
        color: "text-blue-600",
        description: "En cours",
      },
      {
        title: "Évaluations en retard",
        value: "3",
        change: "Urgent",
        icon: AlertCircle,
        color: "text-red-600",
        description: "À finaliser",
      },
      {
        title: "Rapports validés",
        value: "18",
        change: "+6",
        icon: CheckCircle,
        color: "text-green-600",
        description: "Ce mois",
      },
      {
        title: "Note moyenne équipe",
        value: "16.8/20",
        change: "+0.5",
        icon: Award,
        color: "text-purple-600",
        description: "Excellent",
      },
    ],
    stagiaire: [
      {
        title: "Progression stage",
        value: "75%",
        change: "+5%",
        icon: Target,
        color: "text-blue-600",
        description: "En bonne voie",
      },
      {
        title: "Rapports soumis",
        value: "8/10",
        change: "2 restants",
        icon: FileText,
        color: "text-orange-600",
        description: "À rendre",
      },
      {
        title: "Note actuelle",
        value: "16.5/20",
        change: "+1.0",
        icon: Award,
        color: "text-green-600",
        description: "Très bien",
      },
      {
        title: "Jours restants",
        value: "45",
        change: "25%",
        icon: Clock,
        color: "text-purple-600",
        description: "Du stage",
      },
    ],
    direction: [
      {
        title: "ROI des stages",
        value: "156%",
        change: "+23%",
        icon: TrendingUp,
        color: "text-blue-600",
        description: "Vs année N-1",
      },
      {
        title: "Budget consommé",
        value: "847K€",
        change: "84%",
        icon: DollarSign,
        color: "text-green-600",
        description: "Du budget total",
      },
      {
        title: "Partenariats actifs",
        value: "28",
        change: "+3",
        icon: Building,
        color: "text-purple-600",
        description: "Établissements",
      },
      {
        title: "Satisfaction globale",
        value: "94%",
        change: "+2%",
        icon: Star,
        color: "text-orange-600",
        description: "Excellent",
      },
    ],
  }

  const stats = statsData[userRole as keyof typeof statsData] || statsData.rh

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-600 leading-tight">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.color} flex-shrink-0`} />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl sm:text-2xl font-bold mb-2">{stat.value}</div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <Badge
                variant={
                  stat.change.includes("+")
                    ? "default"
                    : stat.change.includes("-")
                      ? "destructive"
                      : stat.change === "Urgent"
                        ? "destructive"
                        : "secondary"
                }
                className="text-xs w-fit"
              >
                {stat.change}
              </Badge>
              <span className="text-xs text-gray-500 truncate">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
