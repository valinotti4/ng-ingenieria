'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface FormData {
  name: string
  phone: string
  email: string
  message: string
}

interface ContactFormProps {
  className?: string
}

export function ContactForm({ className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setStatus({
          type: 'success',
          message: '¡Mensaje enviado exitosamente! Te contactaremos pronto.',
        })
        setFormData({ name: '', phone: '', email: '', message: '' })
      } else {
        setStatus({
          type: 'error',
          message: result.error || 'Error al enviar el mensaje',
        })
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Error de conexión. Intenta nuevamente.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`bg-white p-8 rounded-2xl shadow-xl ${className}`}>
      <h4 className="text-2xl font-bold text-slate-800 mb-6 text-center">
        Solicita tu Cotización
      </h4>
      
      {status.type && (
        <div
          className={`p-4 rounded-lg mb-6 ${
            status.type === 'success'
              ? 'bg-green-100 border border-green-300 text-green-700'
              : 'bg-red-100 border border-red-300 text-red-700'
          }`}
        >
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            name="name"
            placeholder="Nombre completo"
            className="h-12"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <Input
            name="phone"
            placeholder="Teléfono"
            className="h-12"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <Input
            name="email"
            placeholder="Email"
            type="email"
            className="h-12"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <textarea
            name="message"
            placeholder="Describe tu proyecto de seguridad"
            className="w-full p-3 border border-gray-300 rounded-md resize-none h-24 disabled:opacity-50"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg"
          disabled={isLoading}
        >
          {isLoading ? 'Enviando...' : 'Enviar Solicitud'}
        </Button>
      </form>
    </div>
  )
}