"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Users,
  FileText,
  Calendar,
  BarChart3,
  Settings,
  MessageSquare,
  BookOpen,
  ClipboardList,
  Award,
  Home,
  Target,
  Activity,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

interface SidebarProps {
  userRole: string
}

export default function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = {
    rh: [
      { icon: Home, label: "Tableau de bord", href: "/dashboard", active: pathname === "/dashboard" },
      { icon: Users, label: "Stagiaires", href: "/stagiaires", active: pathname === "/stagiaires" },
      { icon: ClipboardList, label: "Candidatures", href: "/candidatures", active: pathname === "/candidatures" },
      { icon: FileText, label: "Conventions", href: "/conventions", active: pathname === "/conventions" },
      { icon: Calendar, label: "Planification", href: "/planning", active: pathname === "/planning" },
      { icon: Award, label: "Évaluations", href: "/evaluations", active: pathname === "/evaluations" },
      { icon: BarChart3, label: "Rapports", href: "/rapports", active: pathname === "/rapports" },
      { icon: MessageSquare, label: "Messages", href: "/messages", active: pathname === "/messages" },
      { icon: Settings, label: "Paramètres", href: "/parametres", active: pathname === "/parametres" },
    ],
    tuteur: [
      { icon: Home, label: "Tableau de bord", href: "/dashboard", active: pathname === "/dashboard" },
      { icon: Users, label: "Mes stagiaires", href: "/mes-stagiaires", active: pathname === "/mes-stagiaires" },
      {
        icon: BookOpen,
        label: "Suivi pédagogique",
        href: "/suivi-pedagogique",
        active: pathname === "/suivi-pedagogique",
      },
      { icon: Award, label: "Évaluations", href: "/evaluations", active: pathname === "/evaluations" },
      { icon: Calendar, label: "Planning", href: "/planning", active: pathname === "/planning" },
      { icon: MessageSquare, label: "Messages", href: "/messages", active: pathname === "/messages" },
      { icon: Settings, label: "Paramètres", href: "/parametres", active: pathname === "/parametres" },
    ],
    stagiaire: [
      { icon: Home, label: "Mon espace", href: "/dashboard", active: pathname === "/dashboard" },
      { icon: Target, label: "Mon stage", href: "/mon-stage", active: pathname === "/mon-stage" },
      { icon: FileText, label: "Documents", href: "/documents", active: pathname === "/documents" },
      { icon: Award, label: "Évaluations", href: "/evaluations", active: pathname === "/evaluations" },
      { icon: Calendar, label: "Planning", href: "/planning", active: pathname === "/planning" },
      { icon: MessageSquare, label: "Messages", href: "/messages", active: pathname === "/messages" },
      { icon: Settings, label: "Paramètres", href: "/parametres", active: pathname === "/parametres" },
    ],
    direction: [
      { icon: Home, label: "Tableau de bord", href: "/dashboard", active: pathname === "/dashboard" },
      { icon: BarChart3, label: "Statistiques", href: "/statistiques", active: pathname === "/statistiques" },
      { icon: Activity, label: "Performance", href: "/performance", active: pathname === "/performance" },
      { icon: Users, label: "Vue d'ensemble", href: "/vue-ensemble", active: pathname === "/vue-ensemble" },
      { icon: FileText, label: "Rapports", href: "/rapports", active: pathname === "/rapports" },
      { icon: Settings, label: "Administration", href: "/administration", active: pathname === "/administration" },
    ],
  }

  const items = menuItems[userRole as keyof typeof menuItems] || menuItems.rh

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={cn("bg-white shadow-sm border-r border-gray-200", mobile ? "h-full" : "w-64")}>
      <div className="p-6">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">JT</span>
          </div>
          <span className="font-bold text-lg">JÀNG-TËKKI</span>
        </Link>

        {/* Navigation */}
        <nav className="space-y-2">
          {items.map((item, index) => (
            <Link key={index} href={item.href} onClick={() => mobile && setIsOpen(false)}>
              <Button
                variant={item.active ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 transition-all duration-200",
                  item.active
                    ? "bg-blue-600 text-white hover:opacity-90 shadow-md"
                    : "hover:bg-gray-100 hover:translate-x-1",
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="font-medium">{item.label}</span>
              </Button>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-4 left-4 z-50 bg-white shadow-md hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-semibold text-lg">Menu</span>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <SidebarContent mobile />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
