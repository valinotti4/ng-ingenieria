'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, RefreshCw } from "lucide-react"

interface Cotizacion {
  casa: string
  nombre: string
  compra: number
  venta: number
  fechaActualizacion: string
}

export default function DolarPage() {
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCotizaciones = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://dolarapi.com/v1/cotizaciones')
      if (!response.ok) {
        throw new Error('Error fetching cotizaciones')
      }
      const data = await response.json()
      setCotizaciones(data)
    } catch (error) {
      console.error('Error fetching cotizaciones:', error)
      setError('Error al cargar las cotizaciones')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCotizaciones()
  }, [])

  const formatCurrency = (currn: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    }).format(currn)
  }

  const convertUTCtoLocal = (timer: string) => {
    const utcDate = new Date(timer)
    return utcDate.toLocaleString('es-AR')
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <DollarSign className="h-16 w-16 text-blue-400 mr-4" />
              <h2 className="text-4xl md:text-5xl font-bold">
                Cotizaciones del <span className="text-blue-400">Dólar</span>
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
              Información actualizada en tiempo real de las principales casas de cambio
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {error ? (
            <div className="text-center max-w-2xl mx-auto">
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">Error al cargar las cotizaciones</h3>
                <p>{error}</p>
              </div>
              <Button onClick={fetchCotizaciones} className="bg-blue-600 hover:bg-blue-700">
                <RefreshCw className="mr-2 h-4 w-4" />
                Reintentar
              </Button>
            </div>
          ) : loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-6"></div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-2">Cargando cotizaciones...</h3>
              <p className="text-slate-600">Por favor espere mientras obtenemos la información más reciente</p>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                  <TrendingUp className="inline mr-3 h-8 w-8 text-blue-600" />
                  Cotizaciones Actuales
                </h3>
                <p className="text-xl text-slate-600 mb-6">
                  Última actualización: {cotizaciones.length > 0 && convertUTCtoLocal(cotizaciones[0].fechaActualizacion)}
                </p>
                <Button 
                  onClick={fetchCotizaciones} 
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  Actualizar
                </Button>
              </div>

              <Card className="shadow-xl border-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-blue-600 text-white">
                          <th className="px-6 py-4 text-left font-semibold text-lg">Nombre</th>
                          <th className="px-6 py-4 text-left font-semibold text-lg">Compra</th>
                          <th className="px-6 py-4 text-left font-semibold text-lg">Venta</th>
                          <th className="px-6 py-4 text-left font-semibold text-lg">Fecha Actualización</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cotizaciones.map((cotizacion, index) => (
                          <tr 
                            key={index} 
                            className={`border-b hover:bg-slate-50 transition-colors ${
                              index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                            }`}
                          >
                            <td className="px-6 py-4 font-semibold text-slate-800 text-lg">
                              {cotizacion.nombre}
                            </td>
                            <td className="px-6 py-4 text-slate-700 font-medium">
                              {formatCurrency(cotizacion.compra)}
                            </td>
                            <td className="px-6 py-4 text-slate-700 font-medium">
                              {formatCurrency(cotizacion.venta)}
                            </td>
                            <td className="px-6 py-4 text-slate-600">
                              {convertUTCtoLocal(cotizacion.fechaActualizacion)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}