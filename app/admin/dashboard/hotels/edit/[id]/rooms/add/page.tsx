'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft, FaSave, FaHome } from 'react-icons/fa'
import { hotels } from '@/data/hotels'

export default function AddRoom() {
  const router = useRouter()
  const params = useParams()
  const hotelId = parseInt(params.id as string)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    description: '',
    descriptionEn: '',
    bookingPrice: 0,
    price: 0,
    maxGuests: 2,
    features: [] as string[],
    featuresEn: [] as string[],
  })
  const [newFeature, setNewFeature] = useState('')
  const [newFeatureEn, setNewFeatureEn] = useState('')

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth !== 'true') {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
      const foundHotel = hotels.find(h => h.id === hotelId)
      if (!foundHotel) {
        router.push('/admin/dashboard/hotels')
      }
    }
  }, [router, hotelId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Add room:', formData)
    alert('تم إضافة الغرفة بنجاح')
    router.push(`/admin/dashboard/hotels/edit/${hotelId}/rooms`)
  }

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'bookingPrice' && typeof value === 'number' ? {
        price: value * 0.9
      } : {})
    }))
  }

  const addFeature = () => {
    if (newFeature.trim() && newFeatureEn.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
        featuresEn: [...prev.featuresEn, newFeatureEn.trim()],
      }))
      setNewFeature('')
      setNewFeatureEn('')
    }
  }

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
      featuresEn: prev.featuresEn.filter((_, i) => i !== index),
    }))
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <header className="bg-[rgba(15,12,41,0.8)] backdrop-blur-sm border-b border-[rgba(175,132,185,0.2)] sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/admin/dashboard/hotels/edit/${hotelId}/rooms`} className="ai-button px-4 py-2 rounded-lg text-sm">
              <FaArrowLeft className="inline mr-2" />
              رجوع
            </Link>
            <h1 className="text-2xl font-bold ai-text-gradient">إضافة غرفة جديدة</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="ai-card rounded-xl p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#a5b4fc]">اسم الغرفة (عربي) *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#a5b4fc]">اسم الغرفة (إنجليزي) *</label>
              <input
                type="text"
                value={formData.nameEn}
                onChange={(e) => handleChange('nameEn', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#a5b4fc]">عدد الضيوف *</label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.maxGuests}
                onChange={(e) => handleChange('maxGuests', parseInt(e.target.value))}
                className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#a5b4fc]">السعر على Booking (EUR) *</label>
              <input
                type="number"
                step="0.01"
                value={formData.bookingPrice}
                onChange={(e) => handleChange('bookingPrice', parseFloat(e.target.value))}
                className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
                required
              />
              <p className="text-xs text-[#a5b4fc]">السعر بعد الخصم: {formData.price.toFixed(2)} EUR</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#a5b4fc]">الوصف (عربي) *</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#a5b4fc]">الوصف (إنجليزي) *</label>
            <textarea
              value={formData.descriptionEn}
              onChange={(e) => handleChange('descriptionEn', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#a5b4fc]">المميزات</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="ميزة (عربي)"
                className="flex-1 px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
              />
              <input
                type="text"
                value={newFeatureEn}
                onChange={(e) => setNewFeatureEn(e.target.value)}
                placeholder="Feature (English)"
                className="flex-1 px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white"
              >
                إضافة
              </button>
            </div>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-[rgba(255,255,255,0.05)] rounded">
                  <span className="text-white text-sm">{feature} / {formData.featuresEn[index]}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-xs"
                  >
                    حذف
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <button type="submit" className="ai-button px-6 py-3 rounded-lg font-semibold">
              <FaSave className="inline mr-2" />
              حفظ الغرفة
            </button>
            <Link
              href={`/admin/dashboard/hotels/edit/${hotelId}/rooms`}
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

