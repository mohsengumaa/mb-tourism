'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft, FaSave, FaHome, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa'

interface ContactInfo {
  phone: string
  email: string
  whatsapp: string
  address: string
  workingHours?: string
}

export default function ContactManagement() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: '+90 501 354 5992',
    email: 'info@mbtourism.com',
    whatsapp: '+90 501 354 5992',
    address: 'إسطنبول، تركيا',
    workingHours: 'يومياً من 9 صباحاً حتى 9 مساءً'
  })

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth !== 'true') {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
      // جلب البيانات من API
      fetch('/api/admin/contact')
        .then(res => res.json())
        .then(result => {
          if (result.success && result.data) {
            setContactInfo(prev => ({ ...prev, ...result.data }))
          }
        })
        .catch(err => console.error('Failed to load contact info:', err))
    }
  }, [router])

  const handleSave = async () => {
    try {
      const response = await fetch('/api/admin/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactInfo),
      })
      const result = await response.json()
      if (result.success) {
        alert('تم حفظ معلومات التواصل بنجاح! سيتم تحديث الموقع بعد إعادة التحميل.')
      } else {
        alert('حدث خطأ: ' + result.error)
      }
    } catch (error) {
      alert('حدث خطأ أثناء الحفظ')
      console.error(error)
    }
  }

  const handleChange = (field: keyof ContactInfo, value: string) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      {/* Header */}
      <header className="bg-[rgba(15,12,41,0.8)] backdrop-blur-sm border-b border-[rgba(175,132,185,0.2)] sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="ai-button px-4 py-2 rounded-lg text-sm">
              <FaArrowLeft className="inline mr-2" />
              رجوع
            </Link>
            <Link href="/" className="ai-button px-4 py-2 rounded-lg text-sm">
              <FaHome className="inline mr-2" />
              الرئيسية
            </Link>
            <h1 className="text-2xl font-bold ai-text-gradient">
              معلومات التواصل
            </h1>
          </div>
          <button
            onClick={handleSave}
            className="ai-button px-4 py-2 rounded-lg text-sm"
          >
            <FaSave className="inline mr-2" />
            حفظ
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="ai-card rounded-xl p-6 space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#a5b4fc] flex items-center gap-2">
              <FaPhone />
              رقم الهاتف
            </label>
            <input
              type="text"
              value={contactInfo.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#a5b4fc] flex items-center gap-2">
              <FaEnvelope />
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={contactInfo.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#a5b4fc] flex items-center gap-2">
              <FaWhatsapp />
              رقم الواتساب
            </label>
            <input
              type="text"
              value={contactInfo.whatsapp}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#a5b4fc]">
              العنوان (عربي)
            </label>
            <input
              type="text"
              value={contactInfo.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#a5b4fc]">
              ساعات العمل
            </label>
            <input
              type="text"
              value={contactInfo.workingHours || ''}
              onChange={(e) => handleChange('workingHours', e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
            />
          </div>
        </div>
      </main>
    </div>
  )
}

