import { useState, useEffect } from 'react'
import type { ContactInfo } from '@/lib/utils/contact-data'

const defaultContact: ContactInfo = {
  phone: '+90 XXX XXX XX XX',
  email: 'info@mb-tourism.com',
  whatsapp: '+90 XXX XXX XX XX',
  address: 'إسطنبول، تركيا',
  workingHours: 'يومياً من 9 صباحاً حتى 9 مساءً',
}

export function useContact() {
  const [contact, setContact] = useState<ContactInfo>(defaultContact)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/contact')
      .then(res => res.json())
      .then(result => {
        if (result.success && result.data) {
          setContact(result.data)
        }
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  return { contact, loading }
}

