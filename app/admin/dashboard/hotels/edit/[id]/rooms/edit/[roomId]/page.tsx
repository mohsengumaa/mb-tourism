'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { FaArrowLeft, FaSave, FaUpload, FaTrash, FaImage } from 'react-icons/fa'
import { hotels } from '@/data/hotels'
import type { Room } from '@/data/hotels'

export default function EditRoom() {
  const router = useRouter()
  const params = useParams()
  const hotelId = parseInt(params.id as string)
  const roomId = parseInt(params.roomId as string)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [room, setRoom] = useState<Room | null>(null)
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
  const [roomImages, setRoomImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth !== 'true') {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
      const foundHotel = hotels.find(h => h.id === hotelId)
      if (foundHotel) {
        const foundRoom = foundHotel.rooms.find(r => r.id === roomId)
        if (foundRoom) {
          setRoom(foundRoom)
          setFormData({
            name: foundRoom.name,
            nameEn: foundRoom.nameEn,
            description: foundRoom.description,
            descriptionEn: foundRoom.descriptionEn,
            bookingPrice: foundRoom.bookingPrice,
            price: foundRoom.price,
            maxGuests: foundRoom.maxGuests,
            features: foundRoom.features,
            featuresEn: foundRoom.featuresEn,
          })
          setRoomImages(foundRoom.images || [])
        } else {
          router.push(`/admin/dashboard/hotels/edit/${hotelId}/rooms`)
        }
      } else {
        router.push('/admin/dashboard/hotels')
      }
    }
  }, [router, hotelId, roomId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // جلب بيانات الفندق
      const hotelsResponse = await fetch('/api/admin/hotels')
      const hotelsResult = await hotelsResponse.json()
      
      if (hotelsResult.success && hotelsResult.data) {
        const hotel = hotelsResult.data.find((h: any) => h.id === hotelId)
        if (hotel) {
          // تحديث بيانات الغرفة
          const roomIndex = hotel.rooms.findIndex((r: any) => r.id === roomId)
          if (roomIndex !== -1) {
            hotel.rooms[roomIndex] = {
              ...hotel.rooms[roomIndex],
              ...formData,
              images: roomImages,
            }
            
            // حفظ التحديثات
            const updateResponse = await fetch('/api/admin/hotels', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: hotelId, rooms: hotel.rooms }),
            })
            
            const updateResult = await updateResponse.json()
            if (updateResult.success) {
              alert('تم تحديث الغرفة بنجاح!')
              router.push(`/admin/dashboard/hotels/edit/${hotelId}/rooms`)
            } else {
              alert('حدث خطأ: ' + updateResult.error)
            }
          }
        }
      }
    } catch (error) {
      alert('حدث خطأ أثناء التحديث')
      console.error(error)
    }
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('hotelId', hotelId.toString())
    formData.append('roomId', roomId.toString())
    formData.append('imageType', 'room')

    try {
      const response = await fetch('/api/admin/hotels/images', {
        method: 'POST',
        body: formData,
      })
      const result = await response.json()
      if (result.success) {
        setRoomImages(prev => [...prev, result.url])
        alert('تم رفع الصورة بنجاح')
      } else {
        alert('حدث خطأ: ' + result.error)
      }
    } catch (error) {
      alert('حدث خطأ أثناء الرفع')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = async (imageIndex: number) => {
    if (confirm('هل أنت متأكد من حذف هذه الصورة؟')) {
      const updatedImages = roomImages.filter((_, i) => i !== imageIndex)
      setRoomImages(updatedImages)
      
      // تحديث بيانات الغرفة في الفندق
      try {
        const hotels = await fetch('/api/admin/hotels').then(res => res.json())
        if (hotels.success && hotels.data) {
          const hotel = hotels.data.find((h: any) => h.id === hotelId)
          if (hotel) {
            const room = hotel.rooms.find((r: any) => r.id === roomId)
            if (room) {
              room.images = updatedImages
              await fetch('/api/admin/hotels', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: hotelId, rooms: hotel.rooms }),
              })
            }
          }
        }
      } catch (error) {
        console.error('Failed to update room images:', error)
      }
    }
  }

  if (!isAuthenticated || !room) {
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
            <h1 className="text-2xl font-bold ai-text-gradient">تعديل الغرفة: {room.name}</h1>
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

          {/* Images Section */}
          <div className="ai-card rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 ai-text-gradient flex items-center gap-2">
              <FaImage />
              صور الغرفة
            </h3>
            <div className="space-y-4">
              {/* Upload New Image */}
              <div>
                <label className={`ai-button py-2 rounded-lg text-center cursor-pointer block ${uploading ? 'opacity-50' : ''}`}>
                  <FaUpload className="inline mr-2" />
                  {uploading ? 'جاري الرفع...' : 'رفع صورة جديدة'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>

              {/* Images Grid */}
              {roomImages.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {roomImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-video relative rounded-lg overflow-hidden border border-[rgba(175,132,185,0.3)]">
                        <Image
                          src={image}
                          alt={`Room image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="opacity-0 group-hover:opacity-100 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm transition-opacity"
                          >
                            <FaTrash className="inline mr-1" />
                            حذف
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-[#a5b4fc]">
                  <FaImage className="text-4xl mx-auto mb-2 opacity-50" />
                  <p>لا توجد صور للغرفة</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="ai-button px-6 py-3 rounded-lg font-semibold">
              <FaSave className="inline mr-2" />
              حفظ التعديلات
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

