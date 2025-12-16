'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft, FaSave, FaHome } from 'react-icons/fa'

export default function AddHotel() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    stars: 5,
    location: '',
    locationEn: '',
    description: '',
    descriptionEn: '',
    bookingPrice: 0,
    price: 0,
  })

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth !== 'true') {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // سيتم إضافة الفندق عبر API
    console.log('Add hotel:', formData)
    alert('تم إضافة الفندق بنجاح')
    router.push('/admin/dashboard/hotels')
  }

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'bookingPrice' && typeof value === 'number' ? {
        price: value * 0.9 // حساب السعر بعد الخصم
      } : {})
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
            <Link href="/admin/dashboard/hotels" className="ai-button px-4 py-2 rounded-lg text-sm">
              <FaArrowLeft className="inline mr-2" />
              رجوع
            </Link>
            <Link href="/" className="ai-button px-4 py-2 rounded-lg text-sm">
              <FaHome className="inline mr-2" />
              الرئيسية
            </Link>
            <h1 className="text-2xl font-bold ai-text-gradient">
              إضافة فندق جديد
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="ai-card rounded-xl p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#a5b4fc]">
                اسم الفندق (عربي) *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#a5b4fc]">
                اسم الفندق (إنجليزي) *
              </label>
              <input
                type="text"
                value={formData.nameEn}
                onChange={(e) => handleChange('nameEn', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#a5b4fc]">
                الموقع (عربي) *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#a5b4fc]">
                الموقع (إنجليزي) *
              </label>
              <input
                type="text"
                value={formData.locationEn}
                onChange={(e) => handleChange('locationEn', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#a5b4fc]">
                عدد النجوم *
              </label>
              <select
                value={formData.stars}
                onChange={(e) => handleChange('stars', parseInt(e.target.value))}
                className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
                required
              >
                <option value={3}>3 نجوم</option>
                <option value={4}>4 نجوم</option>
                <option value={5}>5 نجوم</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#a5b4fc]">
                السعر على Booking (EUR) *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.bookingPrice}
                onChange={(e) => handleChange('bookingPrice', parseFloat(e.target.value))}
                className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#a5b4fc]">
              الوصف (عربي) *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#a5b4fc]">
              الوصف (إنجليزي) *
            </label>
            <textarea
              value={formData.descriptionEn}
              onChange={(e) => handleChange('descriptionEn', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="ai-button px-6 py-3 rounded-lg font-semibold"
            >
              <FaSave className="inline mr-2" />
              حفظ الفندق
            </button>
            <Link
              href="/admin/dashboard/hotels"
              className="px-6 py-3 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-semibold"
            >
              إلغاء
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}

