"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Search, Settings, LogOut, User, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

interface HeaderProps {
  userRole: string
  setUserRole: (role: string) => void
}

export default function Header({ userRole, setUserRole }: HeaderProps) {
  const router = useRouter()
  const [notifications] = useState(3)

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userRole")
    router.push("/connexion")
  }

  const getRoleInfo = (role: string) => {
    switch (role) {
      case "rh":
        return { label: "Ressources Humaines", color: "bg-blue-600", emoji: "👥" }
      case "tuteur":
        return { label: "Tuteur", color: "bg-green-600", emoji: "🎓" }
      case "stagiaire":
        return { label: "Stagiaire", color: "bg-purple-600", emoji: "📚" }
      case "direction":
        return { label: "Direction", color: "bg-red-600", emoji: "🏢" }
      default:
        return { label: "Utilisateur", color: "bg-gray-600", emoji: "👤" }
    }
  }

  const roleInfo = getRoleInfo(userRole)

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Search Bar - Hidden on mobile, shown on tablet+ */}
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 w-full bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Mobile Search Button */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="h-5 w-5" />
        </Button>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Role Badge - Hidden on small mobile */}
          <div className="hidden sm:block">
            <Badge className={`${roleInfo.color} text-white px-3 py-1 text-xs font-medium`}>
              <span className="mr-1">{roleInfo.emoji}</span>
              <span className="hidden lg:inline">{roleInfo.label}</span>
            </Badge>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2 sm:px-3 py-2 hover:bg-gray-100">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-semibold">
                    {roleInfo.emoji}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900">Utilisateur</p>
                  <p className="text-xs text-gray-500">{roleInfo.label}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400 hidden sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex items-center gap-2">
                <span>{roleInfo.emoji}</span>
                <div>
                  <p className="font-medium">Mon compte</p>
                  <p className="text-xs text-gray-500">{roleInfo.label}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Role Switching */}
              <DropdownMenuLabel className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Changer de rôle
              </DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  setUserRole("rh")
                  localStorage.setItem("userRole", "rh")
                  router.push("/dashboard?role=rh")
                }}
                className="flex items-center gap-2"
              >
                <span>👥</span>
                <span>Ressources Humaines</span>
                {userRole === "rh" && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    Actuel
                  </Badge>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setUserRole("tuteur")
                  localStorage.setItem("userRole", "tuteur")
                  router.push("/dashboard?role=tuteur")
                }}
                className="flex items-center gap-2"
              >
                <span>🎓</span>
                <span>Tuteur</span>
                {userRole === "tuteur" && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    Actuel
                  </Badge>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setUserRole("stagiaire")
                  localStorage.setItem("userRole", "stagiaire")
                  router.push("/dashboard?role=stagiaire")
                }}
                className="flex items-center gap-2"
              >
                <span>📚</span>
                <span>Stagiaire</span>
                {userRole === "stagiaire" && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    Actuel
                  </Badge>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setUserRole("direction")
                  localStorage.setItem("userRole", "direction")
                  router.push("/dashboard?role=direction")
                }}
                className="flex items-center gap-2"
              >
                <span>🏢</span>
                <span>Direction</span>
                {userRole === "direction" && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    Actuel
                  </Badge>
                )}
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Paramètres</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-600">
                <LogOut className="h-4 w-4" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Search Bar - Shown when search is active */}
      <div className="md:hidden mt-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Rechercher..."
            className="pl-10 pr-4 py-2 w-full bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </header>
  )
}
