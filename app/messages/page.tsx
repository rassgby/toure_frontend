"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Send, Plus, Paperclip, MoreHorizontal, Star, Archive } from "lucide-react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"

export default function MessagesPage() {
  const [userRole, setUserRole] = useState("rh")
  const [selectedConversation, setSelectedConversation] = useState(1)
  const [newMessage, setNewMessage] = useState("")

  const conversations = [
    {
      id: 1,
      nom: "Marie Dubois",
      role: "Stagiaire",
      dernierMessage: "Merci pour votre retour sur mon rapport !",
      heure: "14:30",
      nonLu: 0,
      statut: "en_ligne",
      initials: "MD",
    },
    {
      id: 2,
      nom: "Jean Martin",
      role: "Tuteur",
      dernierMessage: "Pouvons-nous programmer une réunion ?",
      heure: "12:15",
      nonLu: 2,
      statut: "absent",
      initials: "JM",
    },
    {
      id: 3,
      nom: "Sophie Durand",
      role: "Tuteur",
      dernierMessage: "L'évaluation de Pierre est prête",
      heure: "10:45",
      nonLu: 1,
      statut: "en_ligne",
      initials: "SD",
    },
    {
      id: 4,
      nom: "Direction",
      role: "Administration",
      dernierMessage: "Rapport mensuel disponible",
      heure: "09:30",
      nonLu: 0,
      statut: "absent",
      initials: "DIR",
    },
  ]

  const messages = {
    1: [
      {
        id: 1,
        expediteur: "Marie Dubois",
        contenu: "Bonjour, j'ai une question concernant mon rapport de stage.",
        heure: "14:00",
        type: "recu",
      },
      {
        id: 2,
        expediteur: "Vous",
        contenu: "Bonjour Marie, je suis à votre disposition. Quelle est votre question ?",
        heure: "14:05",
        type: "envoye",
      },
      {
        id: 3,
        expediteur: "Marie Dubois",
        contenu: "Je ne suis pas sûre de la structure à adopter pour la partie analyse.",
        heure: "14:10",
        type: "recu",
      },
      {
        id: 4,
        expediteur: "Vous",
        contenu:
          "Je vous conseille de suivre le modèle que nous avons vu ensemble. Commencez par le contexte, puis l'analyse des données, et enfin vos recommandations.",
        heure: "14:20",
        type: "envoye",
      },
      {
        id: 5,
        expediteur: "Marie Dubois",
        contenu: "Merci pour votre retour sur mon rapport !",
        heure: "14:30",
        type: "recu",
      },
    ],
    2: [
      {
        id: 1,
        expediteur: "Jean Martin",
        contenu: "Bonjour, j'aimerais faire le point sur les stagiaires de mon équipe.",
        heure: "12:00",
        type: "recu",
      },
      {
        id: 2,
        expediteur: "Jean Martin",
        contenu: "Pouvons-nous programmer une réunion ?",
        heure: "12:15",
        type: "recu",
      },
    ],
  }

  const conversationActive = conversations.find((c) => c.id === selectedConversation)
  const messagesActifs = messages[selectedConversation as keyof typeof messages] || []

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Logique d'envoi de message
      setNewMessage("")
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userRole={userRole} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userRole={userRole} setUserRole={setUserRole} />

        <main className="flex-1 overflow-hidden bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto h-full">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
              <p className="text-gray-600">Communication avec les stagiaires et tuteurs</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
              {/* Liste des conversations */}
              <Card className="lg:col-span-1">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle>Conversations</CardTitle>
                    <Button size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input placeholder="Rechercher..." className="pl-10" />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1 max-h-96 overflow-y-auto">
                    {conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-4 cursor-pointer hover:bg-gray-50 border-l-4 ${
                          selectedConversation === conversation.id ? "bg-blue-50 border-blue-500" : "border-transparent"
                        }`}
                        onClick={() => setSelectedConversation(conversation.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="text-sm">{conversation.initials}</AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                                conversation.statut === "en_ligne" ? "bg-green-500" : "bg-gray-400"
                              }`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-sm truncate">{conversation.nom}</p>
                              <span className="text-xs text-gray-500">{conversation.heure}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-gray-600 truncate">{conversation.dernierMessage}</p>
                              {conversation.nonLu > 0 && (
                                <Badge className="bg-blue-600 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center p-0">
                                  {conversation.nonLu}
                                </Badge>
                              )}
                            </div>
                            <Badge variant="outline" size="sm" className="mt-1">
                              {conversation.role}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Zone de conversation */}
              <Card className="lg:col-span-2 flex flex-col">
                {conversationActive ? (
                  <>
                    {/* Header de conversation */}
                    <CardHeader className="pb-4 border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{conversationActive.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{conversationActive.nom}</h3>
                            <p className="text-sm text-gray-600">{conversationActive.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Star className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Archive className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    {/* Messages */}
                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messagesActifs.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === "envoye" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.type === "envoye" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <p className="text-sm">{message.contenu}</p>
                            <p
                              className={`text-xs mt-1 ${
                                message.type === "envoye" ? "text-blue-100" : "text-gray-500"
                              }`}
                            >
                              {message.heure}
                            </p>
                          </div>
                        </div>
                      ))}
                    </CardContent>

                    {/* Zone de saisie */}
                    <div className="p-4 border-t">
                      <div className="flex items-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Textarea
                          placeholder="Tapez votre message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="flex-1 min-h-[40px] max-h-32 resize-none"
                          onKeyPress={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault()
                              handleSendMessage()
                            }
                          }}
                        />
                        <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <CardContent className="flex-1 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <p>Sélectionnez une conversation pour commencer</p>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
