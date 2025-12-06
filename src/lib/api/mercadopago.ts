import { Booking, PaymentPreference } from '@/lib/types'

const MP_PUBLIC_KEY = 'APP_USR-67c9acaa-b0ec-47bc-8b56-9c3b26b497bd'
const MP_ACCESS_TOKEN = 'APP_USR-3125069616439969-120120-6b1af1d513227cfe9d20effb97df374c-2980671727'

export interface CreatePreferenceParams {
  title: string
  description: string
  unit_price: number
  quantity: number
  bookingId: string
  payer: {
    name: string
    surname: string
    email: string
    phone?: {
      area_code: string
      number: string
    }
    identification?: {
      type: string
      number: string
    }
  }
}

export async function createPaymentPreference(params: CreatePreferenceParams): Promise<PaymentPreference> {
  const preference = {
    items: [
      {
        title: params.title,
        description: params.description,
        unit_price: params.unit_price,
        quantity: params.quantity,
        currency_id: 'COP'
      }
    ],
    payer: params.payer,
    back_urls: {
      success: `${window.location.origin}/?page=reserva-exitosa&booking_id=${params.bookingId}`,
      failure: `${window.location.origin}/?page=reserva-confirmacion&booking_id=${params.bookingId}&status=failure`,
      pending: `${window.location.origin}/?page=reserva-confirmacion&booking_id=${params.bookingId}&status=pending`
    },
    auto_return: 'approved',
    payment_methods: {
      excluded_payment_types: [],
      installments: 12
    },
    statement_descriptor: 'SendAI Colombia',
    external_reference: params.bookingId,
    notification_url: `${window.location.origin}/api/mercadopago/webhook`
  }

  try {
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MP_ACCESS_TOKEN}`
      },
      body: JSON.stringify(preference)
    })

    if (!response.ok) {
      throw new Error(`Failed to create payment preference: ${response.statusText}`)
    }

    const data = await response.json()
    return {
      id: data.id,
      init_point: data.init_point,
      sandbox_init_point: data.sandbox_init_point
    }
  } catch (error) {
    console.error('Error creating Mercado Pago preference:', error)
    throw error
  }
}

export function initMercadoPago() {
  if (typeof window !== 'undefined' && !(window as any).MercadoPago) {
    const script = document.createElement('script')
    script.src = 'https://sdk.mercadopago.com/js/v2'
    script.async = true
    document.body.appendChild(script)
    
    return new Promise<void>((resolve) => {
      script.onload = () => {
        const mp = new (window as any).MercadoPago(MP_PUBLIC_KEY, {
          locale: 'es-CO'
        })
        ;(window as any).__mp = mp
        resolve()
      }
    })
  }
  return Promise.resolve()
}

export async function checkPaymentStatus(paymentId: string): Promise<any> {
  try {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        'Authorization': `Bearer ${MP_ACCESS_TOKEN}`
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to check payment status: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error checking payment status:', error)
    throw error
  }
}
