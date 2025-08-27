'use client'

import { usePathname } from 'next/navigation'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const isDolarPage = pathname === '/dolar'

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
          <Image
            src="/Logo NG-chico-Photoroom.png"
            alt="NG Ingeniería en Seguridad"
            width={60}
            height={60}
            className="object-contain"
          />
          <div>
            <h1 className="text-xl font-bold text-slate-800">NG Ingeniería en Seguridad</h1>
            <p className="text-sm text-slate-600">Soluciones Integrales de Seguridad</p>
          </div>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          {isHomePage && (
            <>
              <Link href="#servicios" className="text-slate-700 hover:text-blue-600 transition-colors">
                Servicios
              </Link>
              <Link href="#contacto" className="text-slate-700 hover:text-blue-600 transition-colors">
                Contacto
              </Link>
              <Link href="#cotizacion">
                <Button className="bg-blue-600 hover:bg-blue-700">Solicitar Cotización</Button>
              </Link>
            </>
          )}
          {isDolarPage && (
            <Link href="/" className="text-slate-700 hover:text-blue-600 transition-colors flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Inicio
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}