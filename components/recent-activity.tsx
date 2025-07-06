"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, Users, FileText, Award, Calendar, MessageSquare, CheckCircle, AlertTriangle } from "lucide-react"

interface RecentActivityProps {
  userRole?: string
}

export default function RecentActivity({ userRole = "rh" }: RecentActivityProps) {
  const activitiesData = {
    rh: [
      {
        user: "Alice Martin",
        action: "a soumis sa candidature",
        time: "Il y a 1h",
        type: "candidature",
        initials: "AM",
        icon: Users,
      },
      {
        user: "Convention TechCorp",
        action: "a été signée",
        time: "Il y a 2h",
        type: "convention",
        initials: "TC",
        icon: FileText,
      },
      {
        user: "Pierre Dubois",
        action: "entretien programmé",
        time: "Il y a 3h",
        type: "entretien",
        initials: "PD",
        icon: Calendar,
      },
      {
        user: "Emma Rousseau",
        action: "dossier validé",
        time: "Il y a 4h",
        type: "validation",
        initials: "ER",
        icon: CheckCircle,
      },
    ],
    tuteur: [
      {
        user: "Marie Dubois",
        action: "a soumis son rapport",
        time: "Il y a 30min",
        type: "rapport",
        initials: "MD",
        icon: FileText,
      },
      {
        user: "Thomas Moreau",
        action: "évaluation complétée",
        time: "Il y a 2h",
        type: "evaluation",
        initials: "TM",
        icon: Award,
      },
      {
        user: "Pierre Laurent",
        action: "a envoyé un message",
        time: "Il y a 3h",
        type: "message",
        initials: "PL",
        icon: MessageSquare,
      },
      {
        user: "Emma Bernard",
        action: "objectif atteint",
        time: "Il y a 5h",
        type: "objectif",
        initials: "EB",
        icon: CheckCircle,
      },
    ],
    stagiaire: [
      {
        user: "Jean Martin",
        action: "a validé votre rapport",
        time: "Il y a 1h",
        type: "validation",
        initials: "JM",
        icon: CheckCircle,
      },
      {
        user: "Système",
        action: "rappel: rapport à rendre",
        time: "Il y a 2h",
        type: "rappel",
        initials: "SYS",
        icon: AlertTriangle,
      },
      {
        user: "Sophie Durand",
        action: "a programmé un RDV",
        time: "Il y a 4h",
        type: "rdv",
        initials: "SD",
        icon: Calendar,
      },
      {
        user: "Évaluation",
        action: "mi-parcours disponible",
        time: "Il y a 6h",
        type: "evaluation",
        initials: "EVAL",
        icon: Award,
      },
    ],
    direction: [
      {
        user: "Service RH",
        action: "rapport mensuel publié",
        time: "Il y a 2h",
        type: "rapport",
        initials: "RH",
        icon: FileText,
      },
      {
        user: "Budget Q3",
        action: "objectifs atteints à 94%",
        time: "Il y a 4h",
        type: "budget",
        initials: "BUD",
        icon: CheckCircle,
      },
      {
        user: "Partenariat",
        action: "nouvel accord École Centrale",
        time: "Il y a 1j",
        type: "partenariat",
        initials: "PART",
        icon: Users,
      },
      {
        user: "Innovation",
        action: "3 brevets déposés",
        time: "Il y a 2j",
        type: "innovation",
        initials: "INNO",
        icon: Award,
      },
    ],
  }

  const activities = activitiesData[userRole as keyof typeof activitiesData] || activitiesData.rh

  const getTypeColor = (type: string) => {
    switch (type) {
      case "candidature":
      case "rapport":
        return "bg-blue-100 text-blue-800"
      case "evaluation":
      case "validation":
        return "bg-green-100 text-green-800"
      case "convention":
      case "budget":
        return "bg-purple-100 text-purple-800"
      case "entretien":
      case "rdv":
        return "bg-orange-100 text-orange-800"
      case "message":
        return "bg-yellow-100 text-yellow-800"
      case "rappel":
        return "bg-red-100 text-red-800"
      case "objectif":
      case "partenariat":
        return "bg-green-100 text-green-800"
      case "innovation":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTitleByRole = (role: string) => {
    switch (role) {
      case "rh":
        return "Activité RH récente"
      case "tuteur":
        return "Activité de mes stagiaires"
      case "stagiaire":
        return "Mes notifications"
      case "direction":
        return "Activité stratégique"
      default:
        return "Activité récente"
    }
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="truncate">{getTitleByRole(userRole)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs bg-gray-100">{activity.initials}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center border border-gray-200">
                  <activity.icon className="h-2.5 w-2.5 text-gray-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-tight">
                  <span className="font-medium">{activity.user}</span>{" "}
                  <span className="break-words">{activity.action}</span>
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
              <Badge className={`text-xs flex-shrink-0 ${getTypeColor(activity.type)}`}>{activity.type}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
