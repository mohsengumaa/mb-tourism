'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminRedirect() {
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      router.push('/admin/dashboard')
    } else {
      router.push('/admin/login')
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-white">جاري التحميل...</div>
    </div>
  )
}

