import { useState, useEffect } from 'react'
import { hotels as defaultHotels } from '@/data/hotels'
import type { Hotel } from '@/data/hotels'

export function useHotels() {
  const [hotels, setHotels] = useState<Hotel[]>(defaultHotels)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // محاولة جلب البيانات من API (JSON)
    fetch('/api/admin/hotels')
      .then(res => res.json())
      .then(result => {
        if (result.success && result.data && result.data.length > 0) {
          setHotels(result.data)
        }
        setLoading(false)
      })
      .catch(() => {
        // في حالة الخطأ، استخدم البيانات الافتراضية
        setLoading(false)
      })
  }, [])

  return { hotels, loading }
}

