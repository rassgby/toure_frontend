"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  BookOpen,
  Award,
  BarChart3,
  ArrowRight,
  Star,
  Shield,
  Zap,
  Globe,
  Sparkles,
  Play,
  Quote,
  Moon,
  Sun,
} from "lucide-react";
import Link from "next/link";

export default function AccueilPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const features = [
    {
      icon: Users,
      title: "Gestion intelligente",
      description:
        "IA intégrée pour optimiser l'attribution des stages et le matching candidat-poste.",
      color: "from-blue-500 to-blue-600",
      delay: "0ms",
    },
    {
      icon: BookOpen,
      title: "Suivi en temps réel",
      description:
        "Tableaux de bord interactifs avec notifications push et alertes personnalisées.",
      color: "from-blue-600 to-blue-700",
      delay: "100ms",
    },
    {
      icon: Award,
      title: "Évaluations 360°",
      description:
        "Système d'évaluation multi-critères avec feedback collaboratif et auto-évaluation.",
      color: "from-blue-700 to-blue-800",
      delay: "200ms",
    },
    {
      icon: BarChart3,
      title: "Analytics avancés",
      description:
        "Rapports prédictifs et insights basés sur l'analyse de données comportementales.",
      color: "from-blue-800 to-blue-900",
      delay: "300ms",
    },
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Directrice RH - TechCorp",
      content:
        "JÀNG-TËKKI a révolutionné notre gestion des stages. Gain de temps de 70% sur les processus administratifs.",
      avatar: "MD",
      rating: 5,
    },
    {
      name: "Pierre Martin",
      role: "Tuteur Senior - InnovateLab",
      content:
        "Interface intuitive et outils de suivi exceptionnels. Mes stagiaires progressent plus rapidement.",
      avatar: "PM",
      rating: 5,
    },
    {
      name: "Sophie Laurent",
      role: "Étudiante - École Centrale",
      content:
        "Plateforme moderne qui facilite vraiment le suivi de mon stage. Très satisfaite de l'expérience.",
      avatar: "SL",
      rating: 5,
    },
  ];

  const stats = [
    { value: "2,500+", label: "Stagiaires accompagnés", icon: Users },
    { value: "98.5%", label: "Taux de satisfaction", icon: Star },
    { value: "150+", label: "Entreprises partenaires", icon: Globe },
    { value: "24/7", label: "Support disponible", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 overflow-hidden transition-colors duration-300">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-30 dark:opacity-50">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 dark:bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-600 dark:bg-blue-700 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Header */}
      {/* <header className="relative z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-blue-200 dark:border-blue-800 sticky top-0 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">JT</span>
              </div>
              <div>
                <span className="font-bold text-2xl text-blue-900 dark:text-white">JÀNG-TËKKI</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Link href="/connexion">
                <Button
                  variant="ghost"
                  className="text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800 border border-blue-300 dark:border-blue-600"
                >
                  Se connecter
                </Button>
              </Link>
              <Link href="/inscription">
                <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg">
                  Commencer gratuitement
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header> */}

      <header className="relative z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-blue-200 dark:border-blue-800 sticky top-0 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo et nom */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg sm:text-xl">
                  JT
                </span>
              </div>
              <div className="hidden xs:block">
                <span className="font-bold text-xl sm:text-2xl text-blue-900 dark:text-white">
                  JÀNG-TËKKI
                </span>
              </div>
            </div>

            {/* Navigation desktop */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <Link href="/connexion">
                <Button
                  variant="ghost"
                  className="text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800 border border-blue-300 dark:border-blue-600"
                >
                  Se connecter
                </Button>
              </Link>
              <Link href="/inscription">
                <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg">
                  Commencer gratuitement
                </Button>
              </Link>
            </div>

            {/* Navigation mobile */}
            <div className="flex md:hidden items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800"
              >
                {darkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>

              {/* Menu hamburger ou boutons compacts */}
              <div className="flex items-center gap-1 sm:gap-2">
                <Link href="/connexion">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800 border border-blue-300 dark:border-blue-600 text-xs sm:text-sm px-2 sm:px-3"
                  >
                    <span className="hidden xs:inline">Se connecter</span>
                    <span className="xs:hidden">Connexion</span>
                  </Button>
                </Link>
                <Link href="/inscription">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg text-xs sm:text-sm px-2 sm:px-3"
                  >
                    <span className="hidden xs:inline">Commencer</span>
                    <span className="xs:hidden">Démarrer</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Badge className="mb-8 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600 text-lg px-6 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Nouvelle génération de gestion des stages
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold text-blue-900 dark:text-white mb-8 leading-tight">
              L'avenir de la
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 animate-gradient">
                gestion des stages
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-700 dark:text-blue-200 mb-12 max-w-4xl mx-auto leading-relaxed">
              Révolutionnez votre approche avec une plateforme intelligente qui
              combine
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {" "}
                IA
              </span>
              ,
              <span className="text-blue-700 dark:text-blue-300 font-semibold">
                {" "}
                analytics
              </span>{" "}
              et
              <span className="text-blue-800 dark:text-blue-200 font-semibold">
                {" "}
                collaboration
              </span>
              pour des résultats exceptionnels.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link href="/inscription">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-2xl text-lg px-8 py-4 h-auto"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Démarrer maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              {/* <Button
                size="lg"
                variant="outline"
                className="border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 text-lg px-8 py-4 h-auto bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                Voir la démo
              </Button> */}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold text-blue-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-blue-600 dark:text-blue-300 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-white/80 dark:bg-slate-800/80 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-700">
              Fonctionnalités avancées
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-white mb-6">
              Technologie de pointe
            </h2>
            <p className="text-xl text-blue-700 dark:text-blue-200 max-w-3xl mx-auto">
              Découvrez les outils qui transforment la gestion des stages en
              expérience fluide et intelligente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-blue-200 dark:border-blue-700 hover:bg-white dark:hover:bg-slate-800 transition-all duration-500 hover:scale-105 hover:shadow-2xl group`}
                style={{ animationDelay: feature.delay }}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-blue-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-blue-600 dark:text-blue-300 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-32 px-4 sm:px-6 lg:px-8 bg-blue-50/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600">
              <Star className="w-4 h-4 mr-2" />
              Témoignages clients
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-white mb-6">
              Ils nous font confiance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg border-blue-200 dark:border-blue-700 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-blue-500 dark:text-blue-400 fill-current"
                      />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-blue-500 dark:text-blue-400 mb-4" />
                  <p className="text-blue-700 dark:text-blue-200 mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="text-blue-900 dark:text-white font-semibold">
                        {testimonial.name}
                      </div>
                      <div className="text-blue-600 dark:text-blue-300 text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-50/80 to-white/80 dark:from-slate-800/80 dark:to-blue-900/80 backdrop-blur-lg rounded-3xl p-12 border border-blue-200 dark:border-blue-700">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-white mb-8">
              Prêt à transformer votre organisation ?
            </h2>
            <p className="text-xl text-blue-700 dark:text-blue-200 mb-10 max-w-2xl mx-auto">
              Rejoignez plus de 150 entreprises qui ont choisi JÀNG-TËKKI pour
              optimiser leur gestion des stages
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/inscription">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-2xl text-lg px-10 py-4 h-auto"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Essai gratuit 30 jours
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/connexion">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 text-lg px-10 py-4 h-auto bg-transparent"
                >
                  Se connecter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-blue-200 dark:border-blue-800 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">JT</span>
                </div>
                <span className="font-bold text-xl text-blue-900 dark:text-white">
                  JÀNG-TËKKI
                </span>
              </div>
              <p className="text-blue-600 dark:text-blue-300 mb-6 max-w-md">
                La plateforme nouvelle génération pour la gestion intelligente
                des stages et l'accompagnement des talents.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors cursor-pointer">
                  <Globe className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-blue-900 dark:text-white font-semibold mb-4">
                Produit
              </h3>
              <ul className="space-y-2 text-blue-600 dark:text-blue-300">
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-800 dark:hover:text-white transition-colors"
                  >
                    Fonctionnalités
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-800 dark:hover:text-white transition-colors"
                  >
                    Tarifs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-800 dark:hover:text-white transition-colors"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-blue-900 dark:text-white font-semibold mb-4">
                Support
              </h3>
              <ul className="space-y-2 text-blue-600 dark:text-blue-300">
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-800 dark:hover:text-white transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-800 dark:hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-800 dark:hover:text-white transition-colors"
                  >
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-200 dark:border-blue-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-blue-600 dark:text-blue-300 text-sm mb-4 md:mb-0">
              © 2025 JÀNG-TËKKI. Tous droits réservés.
            </div>
            <div className="flex gap-6 text-sm text-blue-600 dark:text-blue-300">
              <a
                href="#"
                className="hover:text-blue-800 dark:hover:text-white transition-colors"
              >
                Confidentialité
              </a>
              <a
                href="#"
                className="hover:text-blue-800 dark:hover:text-white transition-colors"
              >
                Conditions
              </a>
              <a
                href="#"
                className="hover:text-blue-800 dark:hover:text-white transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
