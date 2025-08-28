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
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Protegemos lo que más{" "}
              <span className="text-blue-400">Importa</span>
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-slate-300 leading-relaxed">
              Sistemas de seguridad profesionales con tecnología de vanguardia.
              Instalación, monitoreo y mantenimiento especializado.
            </p>
            <div className="flex justify-center items-center mb-12">
              <Link href="#cotizacion">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Consulta Gratuita
                </Button>
              </Link>
            </div>

            {/* Partnership */}
            <div className="flex items-center justify-center space-x-8 pt-8 border-t border-slate-700">
              <div className="text-center">
                <p className="text-sm text-slate-400 mb-3">En alianza con</p>
                <Image
                  src="/logo-gp.png"
                  alt="GP Alarmas"
                  width={80}
                  height={80}
                  className="object-contain mx-auto"
                />
              </div>
            </div>
          </div>
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
