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
import { Progress } from "@/components/ui/progress"
import {
  Eye,
  EyeOff,
  UserPlus,
  AlertCircle,
  User,
  Mail,
  Lock,
  Users,
  Phone,
  Building,
  Briefcase,
  ArrowLeft,
  Sparkles,
} from "lucide-react"
import apiService from "@/lib/api"

export default function InscriptionPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    phone: "",
    organization: "",
    department: "",
    position: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Validation côté client
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.role) {
        throw new Error("Tous les champs obligatoires doivent être remplis")
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error("Les mots de passe ne correspondent pas")
      }

      if (formData.password.length < 6) {
        throw new Error("Le mot de passe doit contenir au moins 6 caractères")
      }

      // Préparer les données pour l'API
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        ...(formData.phone && { phone: formData.phone }),
        ...(formData.organization && { organization: formData.organization }),
        ...(formData.department && { department: formData.department }),
        ...(formData.position && { position: formData.position }),
      }

      const response = await apiService.register(userData)

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
      console.error("Erreur d'inscription:", error)
      setError(error.message || "Erreur lors de l'inscription. Veuillez réessayer.")
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

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceedStep1 = formData.firstName && formData.lastName && formData.email
  const canProceedStep2 = formData.password && formData.confirmPassword && formData.role

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

  const renderStep1 = () => (
    <div className="space-y-5 animate-slideIn">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Informations personnelles</h3>
        <p className="text-sm text-gray-600">Commençons par vos informations de base</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="form-group">
          <Label htmlFor="firstName" className="form-label flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            Prénom *
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Votre prénom"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            required
            disabled={loading}
            className="form-input focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="form-group">
          <Label htmlFor="lastName" className="form-label flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            Nom *
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Votre nom"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            required
            disabled={loading}
            className="form-input focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="form-group">
        <Label htmlFor="email" className="form-label flex items-center gap-2">
          <Mail className="w-4 h-4 text-blue-600" />
          Adresse email *
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

      <Button
        type="button"
        onClick={nextStep}
        disabled={!canProceedStep1 || loading}
        className="w-full hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg bg-blue-600"
      >
        Continuer
      </Button>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-5 animate-slideIn">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Sécurité et rôle</h3>
        <p className="text-sm text-gray-600">Définissez votre mot de passe et votre rôle</p>
      </div>

      <div className="form-group">
        <Label htmlFor="role" className="form-label flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-600" />
          Votre rôle *
        </Label>
        <Select value={formData.role} onValueChange={(value) => handleChange("role", value)} disabled={loading}>
          <SelectTrigger className="form-input">
            <SelectValue placeholder="Sélectionnez votre rôle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rh">
              <div className="flex items-center gap-2">
                <span>👥</span>
                Ressources Humaines
              </div>
            </SelectItem>
            <SelectItem value="tuteur">
              <div className="flex items-center gap-2">
                <span>🎓</span>
                Tuteur
              </div>
            </SelectItem>
            <SelectItem value="stagiaire">
              <div className="flex items-center gap-2">
                <span>📚</span>
                Stagiaire
              </div>
            </SelectItem>
            <SelectItem value="direction">
              <div className="flex items-center gap-2">
                <span>🏢</span>
                Direction
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="form-group">
          <Label htmlFor="password" className="form-label flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-600" />
            Mot de passe *
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
              {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
            </Button>
          </div>
        </div>

        <div className="form-group">
          <Label htmlFor="confirmPassword" className="form-label flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-600" />
            Confirmer *
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmez le mot de passe"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              required
              disabled={loading}
              className="form-input focus:ring-blue-500 focus:border-blue-500 pr-12"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={loading}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          className="flex-1 py-3 bg-transparent"
          disabled={loading}
        >
          Retour
        </Button>
        <Button
          type="button"
          onClick={nextStep}
          disabled={!canProceedStep2 || loading}
          className="flex-1 bg-gradient-primary hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg bg-blue-600"
        >
          Continuer
        </Button>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-5 animate-slideIn">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Informations professionnelles</h3>
        <p className="text-sm text-gray-600">Complétez votre profil (optionnel)</p>
      </div>

      <div className="form-group">
        <Label htmlFor="phone" className="form-label flex items-center gap-2">
          <Phone className="w-4 h-4 text-blue-600" />
          Téléphone
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="Votre numéro de téléphone"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          disabled={loading}
          className="form-input focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="form-group">
          <Label htmlFor="organization" className="form-label flex items-center gap-2">
            <Building className="w-4 h-4 text-blue-600" />
            Organisation
          </Label>
          <Input
            id="organization"
            type="text"
            placeholder="Votre organisation"
            value={formData.organization}
            onChange={(e) => handleChange("organization", e.target.value)}
            disabled={loading}
            className="form-input focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="form-group">
          <Label htmlFor="department" className="form-label flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            Département
          </Label>
          <Input
            id="department"
            type="text"
            placeholder="Votre département"
            value={formData.department}
            onChange={(e) => handleChange("department", e.target.value)}
            disabled={loading}
            className="form-input focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="form-group">
        <Label htmlFor="position" className="form-label flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-blue-600" />
          Poste
        </Label>
        <Input
          id="position"
          type="text"
          placeholder="Votre poste"
          value={formData.position}
          onChange={(e) => handleChange("position", e.target.value)}
          disabled={loading}
          className="form-input focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          className="flex-1 py-3 bg-transparent"
          disabled={loading}
        >
          Retour
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-gradient-primary hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg bg-blue-600"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Création...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <UserPlus className="h-5 w-5" />
              Créer mon compte
            </div>
          )}
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10 animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-2xl mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 gradient-text">Inscription</h1>
          <p className="text-gray-600 text-sm sm:text-base">Créez votre compte Jàng-Tëkki en quelques étapes</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Étape {currentStep} sur {totalSteps}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Main Card */}
        <Card className="glass-card border-0 shadow-2xl">
          <CardHeader className="space-y-1 pb-6 text-center">
            <CardTitle className="text-2xl font-semibold text-gray-900">
              {currentStep === 1 && "Informations personnelles"}
              {currentStep === 2 && "Sécurité et rôle"}
              {currentStep === 3 && "Finalisation"}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {currentStep === 1 && "Commençons par vos informations de base"}
              {currentStep === 2 && "Définissez votre mot de passe et votre rôle"}
              {currentStep === 3 && "Complétez votre profil professionnel"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              {error && (
                <Alert variant="destructive" className="mb-6 animate-slideIn">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
            </form>

            {/* Links */}
            <div className="mt-8 text-center space-y-4">
              <div className="flex items-center">
                <div className="flex-1 border-t border-gray-300"></div>
                <div className="px-4 text-sm text-gray-500">ou</div>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              <div className="text-sm text-gray-600">
                Déjà un compte ?{" "}
                <Link
                  href="/connexion"
                  className="text-blue-600 hover:text-blue-800 hover:underline font-semibold transition-colors duration-200"
                >
                  Se connecter
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
