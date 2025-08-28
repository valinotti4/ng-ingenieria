import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import {
  Shield,
  Eye,
  Bell,
  Monitor,
  Smartphone,
  Award,
  Wrench,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NG Ingeniería en Seguridad - Soluciones Integrales de Seguridad",
  description:
    "Protegemos lo que más importa. Sistemas de seguridad profesionales con tecnología de vanguardia: video vigilancia, alarmas monitoreadas 24/7, monitoreo y mantenimiento especializado.",
};

export default function SecurityLandingPage() {
  const services = [
    {
      icon: Eye,
      title: "Video Vigilancia",
      description:
        "Utilizamos tecnologías de última generación con cámaras con visión diurna y nocturna",
    },
    {
      icon: Bell,
      title: "Sistemas de Alarma",
      description:
        "Alarmas monitoreadas las 24 horas desde un centro de monitoreo especializado en la atención de emergencias",
    },
    {
      icon: Shield,
      title: "Seguridad Electrónica",
      description:
        "Aplicación de altos standares de seguridad general de dispositivos y/o sistemas electrónicos",
    },
    {
      icon: Monitor,
      title: "Monitoreo",
      description:
        "Monitoreo general de todos los sistemas durante las 24 hs. Utilización de un sistema proactivo de verificación de fallas",
    },
    {
      icon: Smartphone,
      title: "Aplicaciones",
      description:
        "Instalación de las aplicaciones necesarias para que usted mismo pueda monitorear sus sistemas de seguridad",
    },
    {
      icon: Award,
      title: "Marcas",
      description:
        "Utilizamos las marcas mas importantes del mercado nacional e internacional, contando con garantía extendida de los equipos",
    },
    {
      icon: Wrench,
      title: "Mantenimiento",
      description:
        "Mantenemos los sistemas instalados para que usted pueda estar tranquilo que sus activos están continuamente bien cuidados",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-24 overflow-hidden">
        {/* Background tech pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPgo8L3N2Zz4=')] opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Security badges */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="bg-green-500/20 backdrop-blur-sm border border-green-400/30 px-4 py-2 rounded-full flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-green-300 text-sm font-medium">
                  Certificado
                </span>
              </div>
              <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 px-4 py-2 rounded-full flex items-center gap-2">
                <Monitor className="h-4 w-4 text-blue-400" />
                <span className="text-blue-300 text-sm font-medium">
                  24/7 Monitoreo
                </span>
              </div>
              <div className="bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 px-4 py-2 rounded-full flex items-center gap-2">
                <Award className="h-4 w-4 text-purple-400" />
                <span className="text-purple-300 text-sm font-medium">
                  +10 años
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
              <span className="text-white">Seguridad </span>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Inteligente
              </span>
              <br />
              <span className="text-white">para su </span>
              <span className="text-blue-400">Tranquilidad</span>
            </h1>

            <p className="text-xl md:text-2xl mb-10 text-slate-200 leading-relaxed max-w-4xl mx-auto font-light">
              Tecnología de vanguardia en sistemas de seguridad electrónica.
              <span className="text-cyan-300 font-semibold">
                {" "}
                Protección inteligente
              </span>{" "}
              con respuesta inmediata y monitoreo profesional las 24 horas.
            </p>

            {/* Key features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                <Eye className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2">Visión HD</h3>
                <p className="text-slate-300 text-sm">
                  Cámaras 4K con IA integrada
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                <Bell className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2">
                  Respuesta Inmediata
                </h3>
                <p className="text-slate-300 text-sm">
                  Alertas instantáneas y verificadas
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                <Smartphone className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2">Control Total</h3>
                <p className="text-slate-300 text-sm">
                  App móvil con control remoto
                </p>
              </div>
            </div>

            <div className="flex justify-center items-center mb-16">
              <Link href="#cotizacion">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-lg px-10 py-4 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold border-0"
                >
                  <Mail className="mr-3 h-6 w-6" />
                  Consulta Gratuita Ahora
                </Button>
              </Link>
            </div>

            {/* Partnership */}
            <div className="flex items-center justify-center pt-8 border-t border-slate-600/50">
              <div className="text-center">
                <p className="text-sm text-slate-400 mb-3">
                  Partner Tecnológico Oficial
                </p>
                <Image
                  src="/logo-gp.png"
                  alt="GP Alarmas"
                  width={100}
                  height={100}
                  className="object-contain mx-auto filter brightness-110"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Floating security elements */}
        <div className="absolute top-20 left-10 opacity-20 animate-pulse">
          <Shield className="h-16 w-16 text-blue-400" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20 animate-pulse delay-1000">
          <Monitor className="h-12 w-12 text-cyan-400" />
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Nuestros Servicios
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Ofrecemos soluciones integrales de seguridad con tecnología de
              última generación y atención personalizada las 24 horas del día.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-3 rounded-lg mr-4">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <h4 className="text-xl font-bold text-slate-800">
                        {service.title}
                      </h4>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="cotizacion" className="py-20 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                ¿Por qué elegirnos?
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">
                      Experiencia Comprobada
                    </h4>
                    <p className="text-slate-600">
                      Más de 10 años protegiendo hogares y empresas con
                      tecnología confiable.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Monitor className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">
                      Monitoreo 24/7
                    </h4>
                    <p className="text-slate-600">
                      Centro de monitoreo especializado con respuesta inmediata
                      ante emergencias.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Award className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">
                      Garantía Extendida
                    </h4>
                    <p className="text-slate-600">
                      Trabajamos con las mejores marcas y ofrecemos garantía
                      extendida en todos nuestros equipos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Contáctanos</h3>
            <p className="text-xl text-slate-300">
              Estamos listos para proteger tu hogar o empresa
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-slate-800 p-8 rounded-xl">
              <Phone className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Teléfono</h4>
              <p className="text-slate-300">+5493471521618</p>
              <p className="text-slate-300">+5493471594772</p>
              <p className="text-slate-300">Atención 24/7</p>
            </div>
            <div className="bg-slate-800 p-8 rounded-xl">
              <Mail className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Email</h4>
              <p className="text-slate-300">info@ng.com.ar</p>
            </div>
            <div className="bg-slate-800 p-8 rounded-xl">
              <MapPin className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Ubicación</h4>
              <p className="text-slate-300">Las Rosas, Sta. Fe, Argentina</p>
              <p className="text-slate-300">Cobertura Nacional</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
