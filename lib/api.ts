const API_BASE_URL = "https://toure-backend.onrender.com/api/"

class ApiService {
  private token: string | null = null

  constructor() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("token")
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("API request failed:", error)

      // Handle network errors
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("Erreur de connexion au serveur. Vérifiez votre connexion internet.")
      }

      throw error
    }
  }

  // Méthodes d'authentification
  async login(credentials: {
    email: string
    password: string
    role: string
  }) {
    const response = await this.request<{
      token: string
      user: any
      message: string
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })

    this.token = response.token
    if (typeof window !== "undefined") {
      localStorage.setItem("token", response.token)
      localStorage.setItem("user", JSON.stringify(response.user))
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("userRole", response.user.role)
    }

    return response
  }

  async register(userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    role: string
    phone?: string
    organization?: string
    department?: string
    position?: string
  }) {
    const response = await this.request<{
      token: string
      user: any
      message: string
    }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })

    this.token = response.token
    if (typeof window !== "undefined") {
      localStorage.setItem("token", response.token)
      localStorage.setItem("user", JSON.stringify(response.user))
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("userRole", response.user.role)
    }

    return response
  }

  async getProfile() {
    return this.request<{ user: any }>("/auth/me")
  }

  async updateProfile(profileData: any) {
    return this.request<{ user: any; message: string }>("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    })
  }

  async changePassword(passwordData: {
    currentPassword: string
    newPassword: string
  }) {
    return this.request<{ message: string }>("/auth/change-password", {
      method: "POST",
      body: JSON.stringify(passwordData),
    })
  }

  logout() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      localStorage.removeItem("isAuthenticated")
      localStorage.removeItem("userRole")
    }
  }

  // Méthodes pour les stages
  async getStages(params?: {
    page?: number
    limit?: number
    statut?: string
    search?: string
  }) {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString())
        }
      })
    }

    const endpoint = `/stages${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
    return this.request<{
      stages: any[]
      pagination: {
        current: number
        pages: number
        total: number
      }
    }>(endpoint)
  }

  async getStage(id: string) {
    return this.request<{ stage: any }>(`/stages/${id}`)
  }

  async createStage(stageData: any) {
    return this.request<{ stage: any; message: string }>("/stages", {
      method: "POST",
      body: JSON.stringify(stageData),
    })
  }

  async updateStage(id: string, stageData: any) {
    return this.request<{ stage: any; message: string }>(`/stages/${id}`, {
      method: "PUT",
      body: JSON.stringify(stageData),
    })
  }

  async deleteStage(id: string) {
    return this.request<{ message: string }>(`/stages/${id}`, {
      method: "DELETE",
    })
  }

  // Méthodes pour les candidatures
  async getCandidatures(params?: {
    page?: number
    limit?: number
    statut?: string
    search?: string
  }) {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString())
        }
      })
    }

    const endpoint = `/candidatures${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
    return this.request<{
      candidatures: any[]
      pagination: any
    }>(endpoint)
  }

  async createCandidature(candidatureData: any) {
    return this.request<{ candidature: any; message: string }>("/candidatures", {
      method: "POST",
      body: JSON.stringify(candidatureData),
    })
  }

  async updateCandidature(id: string, candidatureData: any) {
    return this.request<{ candidature: any; message: string }>(`/candidatures/${id}`, {
      method: "PUT",
      body: JSON.stringify(candidatureData),
    })
  }

  // Méthodes pour les utilisateurs
  async getUsers(params?: {
    role?: string
    search?: string
    page?: number
    limit?: number
  }) {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString())
        }
      })
    }

    const endpoint = `/users${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
    return this.request<{
      users: any[]
      pagination: any
    }>(endpoint)
  }

  async getTuteurs() {
    return this.request<{ tuteurs: any[] }>("/users/tuteurs")
  }

  // Méthodes pour le dashboard
  async getDashboardStats() {
    try {
      return await this.request<any>("/dashboard/stats")
    } catch (error) {
      // Fallback avec données mockées si l'API n'est pas disponible
      console.warn("Dashboard stats API not available, using fallback data")
      return {
        stats: {
          candidatures: 47,
          conventions: 8,
          entretiens: 15,
          tauxPlacement: 89,
          stagiaires: 5,
          evaluations: 3,
          moyenne: 16.8,
          rapports: 18,
          progression: 75,
          note: 16.5,
          joursRestants: 45,
          roi: 156,
          budget: "847K€",
          conversion: 68,
          satisfaction: 94,
        },
      }
    }
  }

  async getDashboardActivities() {
    try {
      return await this.request<{ activities: any[] }>("/dashboard/activities")
    } catch (error) {
      console.warn("Dashboard activities API not available, using fallback data")
      return { activities: [] }
    }
  }

  // Méthodes pour les évaluations
  async getEvaluations(params?: any) {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString())
        }
      })
    }

    const endpoint = `/evaluations${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
    return this.request<{
      evaluations: any[]
      pagination: any
    }>(endpoint)
  }

  async createEvaluation(evaluationData: any) {
    return this.request<{ evaluation: any; message: string }>("/evaluations", {
      method: "POST",
      body: JSON.stringify(evaluationData),
    })
  }

  async updateEvaluation(id: string, evaluationData: any) {
    return this.request<{ evaluation: any; message: string }>(`/evaluations/${id}`, {
      method: "PUT",
      body: JSON.stringify(evaluationData),
    })
  }

  // Méthodes pour les messages
  async getMessages(params?: any) {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString())
        }
      })
    }

    const endpoint = `/messages${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
    return this.request<{
      messages: any[]
      pagination: any
    }>(endpoint)
  }

  async sendMessage(messageData: {
    destinataire: string
    sujet: string
    contenu: string
    priorite?: string
  }) {
    return this.request<{ message: any }>("/messages", {
      method: "POST",
      body: JSON.stringify(messageData),
    })
  }

  async markMessageAsRead(id: string) {
    return this.request<{ message: string }>(`/messages/${id}/read`, {
      method: "PUT",
    })
  }

  // Méthodes pour les rapports
  async getRapports(params?: any) {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString())
        }
      })
    }

    const endpoint = `/rapports${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
    return this.request<{
      rapports: any[]
      pagination: any
    }>(endpoint)
  }

  async createRapport(rapportData: any) {
    return this.request<{ rapport: any; message: string }>("/rapports", {
      method: "POST",
      body: JSON.stringify(rapportData),
    })
  }

  async updateRapport(id: string, rapportData: any) {
    return this.request<{ rapport: any; message: string }>(`/rapports/${id}`, {
      method: "PUT",
      body: JSON.stringify(rapportData),
    })
  }

  // Méthodes pour les conventions
  async getConventions(params?: any) {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString())
        }
      })
    }

    const endpoint = `/conventions${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
    return this.request<{
      conventions: any[]
      pagination: any
    }>(endpoint)
  }

  async createConvention(conventionData: any) {
    return this.request<{ convention: any; message: string }>("/conventions", {
      method: "POST",
      body: JSON.stringify(conventionData),
    })
  }

  async updateConvention(id: string, conventionData: any) {
    return this.request<{ convention: any; message: string }>(`/conventions/${id}`, {
      method: "PUT",
      body: JSON.stringify(conventionData),
    })
  }

  // Vérification de l'état de l'API
  async healthCheck() {
    return this.request<{
      status: string
      message: string
      timestamp: string
    }>("/health")
  }
}

export const apiService = new ApiService()
export default apiService
