"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import RHDashboard from "@/components/dashboards/rh/RHDashboard"
import TuteurDashboard from "@/components/dashboards/tuteur/TuteurDashboard"
import StagiaireDashboard from "@/components/dashboards/stagiaire/StagiaireDashboard"
import DirectionDashboard from "@/components/dashboards/direction/DirectionDashboard"

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [userRole, setUserRole] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const storedRole = localStorage.getItem("userRole")
    const roleFromURL = searchParams.get("role")

    if (!isAuthenticated) {
      router.push("/connexion")
      return
    }

    const finalRole = roleFromURL || storedRole || "rh"
    setUserRole(finalRole)
    setIsLoading(false)

    if (roleFromURL && roleFromURL !== storedRole) {
      localStorage.setItem("userRole", roleFromURL)
    }
  }, [router, searchParams])

  const renderDashboard = () => {
    switch (userRole) {
      case "rh":
        return <RHDashboard />
      case "tuteur":
        return <TuteurDashboard />
      case "stagiaire":
        return <StagiaireDashboard />
      case "direction":
        return <DirectionDashboard />
      default:
        return <RHDashboard />
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userRole={userRole} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userRole={userRole} setUserRole={setUserRole} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:pl-0">
          <div className="max-w-7xl mx-auto">{renderDashboard()}</div>
        </main>
      </div>
    </div>
  )
}
