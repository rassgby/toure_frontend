"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  CheckSquare,
  Calendar,
  AlertTriangle,
  Users,
  FileText,
  Award,
  Target,
  Clock,
  MessageSquare,
} from "lucide-react"

interface UpcomingTasksProps {
  userRole: string
}

export default function UpcomingTasks({ userRole }: UpcomingTasksProps) {
  const tasksData = {
    rh: [
      {
        title: "Traiter candidature - Alice Martin",
        deadline: "Aujourd'hui",
        priority: "high",
        type: "Candidature",
        icon: Users,
      },
      {
        title: "Finaliser convention - Pierre Dubois",
        deadline: "Demain",
        priority: "high",
        type: "Convention",
        icon: FileText,
      },
      {
        title: "Entretien - Emma Rousseau",
        deadline: "Jeudi 14h",
        priority: "medium",
        type: "Entretien",
        icon: Calendar,
      },
      {
        title: "Rapport mensuel stages",
        deadline: "Fin de semaine",
        priority: "medium",
        type: "Rapport",
        icon: FileText,
      },
    ],
    tuteur: [
      {
        title: "Évaluation mi-parcours - Marie",
        deadline: "Aujourd'hui",
        priority: "high",
        type: "Évaluation",
        icon: Award,
      },
      {
        title: "Valider rapport - Thomas",
        deadline: "Demain",
        priority: "medium",
        type: "Validation",
        icon: CheckSquare,
      },
      {
        title: "RDV suivi - Pierre Laurent",
        deadline: "Mercredi 15h",
        priority: "medium",
        type: "Rendez-vous",
        icon: Calendar,
      },
      {
        title: "Feedback projet - Emma",
        deadline: "Vendredi",
        priority: "low",
        type: "Feedback",
        icon: MessageSquare,
      },
    ],
    stagiaire: [
      {
        title: "Rapport hebdomadaire",
        deadline: "Vendredi",
        priority: "high",
        type: "Rapport",
        icon: FileText,
      },
      {
        title: "RDV avec tuteur",
        deadline: "Lundi 14h",
        priority: "medium",
        type: "Rendez-vous",
        icon: Calendar,
      },
      {
        title: "Finaliser projet React",
        deadline: "Mercredi",
        priority: "high",
        type: "Projet",
        icon: Target,
      },
      {
        title: "Préparer présentation",
        deadline: "Semaine prochaine",
        priority: "medium",
        type: "Présentation",
        icon: Users,
      },
    ],
    direction: [
      {
        title: "Revue budget Q3",
        deadline: "Cette semaine",
        priority: "high",
        type: "Budget",
        icon: FileText,
      },
      {
        title: "Comité de pilotage",
        deadline: "Jeudi 10h",
        priority: "high",
        type: "Réunion",
        icon: Calendar,
      },
      {
        title: "Validation stratégie 2025",
        deadline: "Fin du mois",
        priority: "medium",
        type: "Stratégie",
        icon: Target,
      },
      {
        title: "Rapport conseil administration",
        deadline: "15 juillet",
        priority: "medium",
        type: "Rapport",
        icon: FileText,
      },
    ],
  }

  const tasks = tasksData[userRole as keyof typeof tasksData] || tasksData.rh

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-3 w-3" />
      case "medium":
        return <Clock className="h-3 w-3" />
      case "low":
        return <CheckSquare className="h-3 w-3" />
      default:
        return <CheckSquare className="h-3 w-3" />
    }
  }

  const getActionLabel = (userRole: string) => {
    switch (userRole) {
      case "rh":
        return "Voir toutes les tâches RH"
      case "tuteur":
        return "Voir mon planning"
      case "stagiaire":
        return "Voir mes échéances"
      case "direction":
        return "Voir le planning direction"
      default:
        return "Voir toutes les tâches"
    }
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <CheckSquare className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="truncate">
            {userRole === "rh" && "Tâches RH prioritaires"}
            {userRole === "tuteur" && "Mes tâches pédagogiques"}
            {userRole === "stagiaire" && "Mes prochaines échéances"}
            {userRole === "direction" && "Agenda direction"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                <div className="flex items-start gap-2 min-w-0 flex-1">
                  <task.icon className="h-4 w-4 mt-0.5 text-gray-600 flex-shrink-0" />
                  <h4 className="text-sm font-medium leading-tight break-words">{task.title}</h4>
                </div>
                <Badge className={`text-xs flex items-center gap-1 ${getPriorityColor(task.priority)} flex-shrink-0`}>
                  {getPriorityIcon(task.priority)}
                  <span className="hidden sm:inline">{task.priority}</span>
                </Badge>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between ml-6 gap-2">
                <span className="text-xs text-gray-500">{task.deadline}</span>
                <Badge variant="outline" className="text-xs w-fit">
                  {task.type}
                </Badge>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full mt-4 bg-transparent text-sm">
            {getActionLabel(userRole)}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
