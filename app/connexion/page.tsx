"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, LogIn, AlertCircle, Mail, Lock, Users, ArrowLeft, Sparkles } from "lucide-react"
import apiService from "@/lib/api"

export default function ConnexionPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (!formData.email || !formData.password || !formData.role) {
        throw new Error("Tous les champs sont requis")
      }

      const response = await apiService.login(formData)

      // Redirection selon le rôle
      switch (formData.role) {
        case "rh":
          router.push("/dashboard?role=rh")
          break
        case "tuteur":
          router.push("/dashboard?role=tuteur")
          break
        case "stagiaire":
          router.push("/dashboard?role=stagiaire")
          break
        case "direction":
          router.push("/dashboard?role=direction")
          break
        default:
          router.push("/dashboard")
      }
    } catch (error: any) {
      console.error("Erreur de connexion:", error)
      setError(error.message || "Erreur de connexion. Vérifiez vos identifiants.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (error) setError("")
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "rh":
        return "👥"
      case "tuteur":
        return "🎓"
      case "stagiaire":
        return "📚"
      case "direction":
        return "🏢"
      default:
        return "👤"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg bg-blue-600 text-white">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 gradient-text">Connexion</h1>
          <p className="text-gray-600 text-sm sm:text-base">Accédez à votre espace Jàng-Tëkki</p>
        </div>

        {/* Main Card */}
        <Card className="glass-card border-0 shadow-2xl animate-slideIn">
          <CardHeader className="space-y-1 pb-6 text-center">
            <CardTitle className="text-2xl font-semibold text-gray-900">Bienvenue !</CardTitle>
            <CardDescription className="text-gray-600">Entrez vos identifiants pour continuer</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <Alert variant="destructive" className="animate-slideIn">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Email Field */}
              <div className="form-group">
                <Label htmlFor="email" className="form-label flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  Adresse email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@gmail.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  disabled={loading}
                  className="form-input focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Password Field */}
              <div className="form-group">
                <Label htmlFor="password" className="form-label flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-600" />
                  Mot de passe
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Votre mot de passe"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    required
                    disabled={loading}
                    className="form-input focus:ring-blue-500 focus:border-blue-500 pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Role Field */}
              <div className="form-group">
                <Label htmlFor="role" className="form-label flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  Votre rôle
                </Label>
                <Select value={formData.role} onValueChange={(value) => handleChange("role", value)} disabled={loading}>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Sélectionnez votre rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rh" className="flex items-center gap-2">
                      <span className="mr-2">👥</span>
                      Ressources Humaines
                    </SelectItem>
                    <SelectItem value="tuteur" className="flex items-center gap-2">
                      <span className="mr-2">🎓</span>
                      Tuteur
                    </SelectItem>
                    <SelectItem value="stagiaire" className="flex items-center gap-2">
                      <span className="mr-2">📚</span>
                      Stagiaire
                    </SelectItem>
                    <SelectItem value="direction" className="flex items-center gap-2">
                      <span className="mr-2">🏢</span>
                      Direction
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg bg-blue-600"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connexion en cours...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <LogIn className="h-5 w-5" />
                    Se connecter
                  </div>
                )}
              </Button>
            </form>

            {/* Links */}
            <div className="space-y-4 text-center">
              <Link
                href="/mot-de-passe-oublie"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 block"
              >
                Mot de passe oublié ?
              </Link>

              <div className="flex items-center">
                <div className="flex-1 border-t border-gray-300"></div>
                <div className="px-4 text-sm text-gray-500">ou</div>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              <div className="text-sm text-gray-600">
                Pas encore de compte ?{" "}
                <Link
                  href="/inscription"
                  className="text-blue-600 hover:text-blue-800 hover:underline font-semibold transition-colors duration-200"
                >
                  Créer un compte
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            href="/accueil"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 hover:underline transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
