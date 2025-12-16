'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { FaArrowLeft, FaSave, FaHome, FaUpload, FaTrash, FaImage } from 'react-icons/fa'
import { hotels } from '@/data/hotels'
import type { Hotel } from '@/data/hotels'

export default function EditHotel() {
  const router = useRouter()
  const params = useParams()
  const hotelId = parseInt(params.id as string)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hotel, setHotel] = useState<Hotel | null>(null)
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
  const [hotelImages, setHotelImages] = useState<string[]>([])
  const [mainImage, setMainImage] = useState<string>('')
  const [uploading, setUploading] = useState<string | null>(null)

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth !== 'true') {
      router.push('/admin/login')
      return
    }
    
    setIsAuthenticated(true)
    
    // محاولة جلب البيانات من API أولاً
    fetch('/api/admin/hotels')
      .then(res => res.json())
      .then(result => {
        if (result.success && result.data) {
          const foundHotel = result.data.find((h: Hotel) => h.id === hotelId)
          if (foundHotel) {
            setHotel(foundHotel)
            setFormData({
              name: foundHotel.name,
              nameEn: foundHotel.nameEn,
              stars: foundHotel.stars,
              location: foundHotel.location,
              locationEn: foundHotel.locationEn,
              description: foundHotel.description,
              descriptionEn: foundHotel.descriptionEn,
              bookingPrice: foundHotel.bookingPrice,
              price: foundHotel.price,
            })
            setMainImage(foundHotel.image)
            setHotelImages(foundHotel.images || [])
          } else {
            // إذا لم يوجد في API، جرب البيانات الافتراضية
            const defaultHotel = hotels.find(h => h.id === hotelId)
            if (defaultHotel) {
              setHotel(defaultHotel)
              setFormData({
                name: defaultHotel.name,
                nameEn: defaultHotel.nameEn,
                stars: defaultHotel.stars,
                location: defaultHotel.location,
                locationEn: defaultHotel.locationEn,
                description: defaultHotel.description,
                descriptionEn: defaultHotel.descriptionEn,
                bookingPrice: defaultHotel.bookingPrice,
                price: defaultHotel.price,
              })
              setMainImage(defaultHotel.image)
              setHotelImages(defaultHotel.images || [])
            } else {
              alert('الفندق غير موجود')
              router.push('/admin/dashboard/hotels')
            }
          }
        }
      })
      .catch(() => {
        // في حالة الخطأ، استخدم البيانات الافتراضية
        const foundHotel = hotels.find(h => h.id === hotelId)
        if (foundHotel) {
          setHotel(foundHotel)
          setFormData({
            name: foundHotel.name,
            nameEn: foundHotel.nameEn,
            stars: foundHotel.stars,
            location: foundHotel.location,
            locationEn: foundHotel.locationEn,
            description: foundHotel.description,
            descriptionEn: foundHotel.descriptionEn,
            bookingPrice: foundHotel.bookingPrice,
            price: foundHotel.price,
          })
          setMainImage(foundHotel.image)
          setHotelImages(foundHotel.images || [])
        } else {
          alert('الفندق غير موجود')
          router.push('/admin/dashboard/hotels')
        }
      })
  }, [router, hotelId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/admin/hotels', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: hotelId,
          ...formData,
          image: mainImage,
          images: hotelImages,
        }),
      })
      const result = await response.json()
      if (result.success) {
        alert('تم تحديث الفندق بنجاح! سيتم تحديث الموقع بعد إعادة التحميل.')
        router.push('/admin/dashboard/hotels')
      } else {
        alert('حدث خطأ: ' + result.error)
      }
    } catch (error) {
      alert('حدث خطأ أثناء التحديث')
      console.error(error)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, imageType: 'main' | 'gallery') => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(imageType)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('hotelId', hotelId.toString())
    formData.append('imageType', imageType)

    try {
      const response = await fetch('/api/admin/hotels/images', {
        method: 'POST',
        body: formData,
      })
      const result = await response.json()
      if (result.success) {
        if (imageType === 'main') {
          setMainImage(result.url)
        } else {
          setHotelImages(prev => [...prev, result.url])
        }
        alert('تم رفع الصورة بنجاح')
      } else {
        alert('حدث خطأ: ' + result.error)
      }
    } catch (error) {
      alert('حدث خطأ أثناء الرفع')
    } finally {
      setUploading(null)
    }
  }

  const handleRemoveImage = async (imageIndex: number) => {
    if (confirm('هل أنت متأكد من حذف هذه الصورة؟')) {
      const updatedImages = hotelImages.filter((_, i) => i !== imageIndex)
      setHotelImages(updatedImages)
      
      // تحديث البيانات في API
      try {
        const response = await fetch('/api/admin/hotels', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: hotelId,
            images: updatedImages,
          }),
        })
        const result = await response.json()
        if (result.success) {
          alert('تم حذف الصورة بنجاح')
        }
      } catch (error) {
        console.error('Failed to update images:', error)
      }
    }
  }

  const handleSetMainImage = (imageUrl: string) => {
    setMainImage(imageUrl)
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

  if (!isAuthenticated || !hotel) {
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
              تعديل الفندق: {hotel.name}
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
              <p className="text-xs text-[#a5b4fc]">
                السعر بعد الخصم: {formData.price.toFixed(2)} EUR
              </p>
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

          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <button
                type="submit"
                className="ai-button px-6 py-3 rounded-lg font-semibold"
              >
                <FaSave className="inline mr-2" />
                حفظ التعديلات
              </button>
              <Link
                href={`/admin/dashboard/hotels/edit/${hotelId}/rooms`}
                className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold"
              >
                إدارة الغرف ({hotel?.rooms.length || 0})
              </Link>
              <Link
                href="/admin/dashboard/hotels"
                className="px-6 py-3 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-semibold"
              >
                إلغاء
              </Link>
            </div>
            
            {/* Hotel Images Section */}
            <div className="ai-card rounded-xl p-6 mt-4">
              <h3 className="text-xl font-bold mb-4 ai-text-gradient flex items-center gap-2">
                <FaImage />
                صور الفندق
              </h3>
              <div className="space-y-6">
                {/* Main Image */}
                <div>
                  <label className="block text-sm font-medium text-[#a5b4fc] mb-2">الصورة الرئيسية</label>
                  <div className="flex items-center gap-4">
                    {mainImage && (
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-[rgba(175,132,185,0.3)]">
                        <Image
                          src={mainImage}
                          alt="Main hotel image"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <label className={`ai-button py-2 rounded-lg text-center cursor-pointer ${uploading === 'main' ? 'opacity-50' : ''}`}>
                      <FaUpload className="inline mr-2" />
                      {uploading === 'main' ? 'جاري الرفع...' : mainImage ? 'تغيير الصورة الرئيسية' : 'رفع صورة رئيسية'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'main')}
                        className="hidden"
                        disabled={uploading === 'main'}
                      />
                    </label>
                  </div>
                </div>

                {/* Gallery Images */}
                <div>
                  <label className="block text-sm font-medium text-[#a5b4fc] mb-2">صور المعرض</label>
                  <div className="mb-4">
                    <label className={`ai-button py-2 rounded-lg text-center cursor-pointer inline-block ${uploading === 'gallery' ? 'opacity-50' : ''}`}>
                      <FaUpload className="inline mr-2" />
                      {uploading === 'gallery' ? 'جاري الرفع...' : 'رفع صورة جديدة'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'gallery')}
                        className="hidden"
                        disabled={uploading === 'gallery'}
                      />
                    </label>
                  </div>
                  
                  {hotelImages.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {hotelImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-video relative rounded-lg overflow-hidden border border-[rgba(175,132,185,0.3)]">
                            <Image
                              src={image}
                              alt={`Hotel image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleSetMainImage(image)}
                                className="opacity-0 group-hover:opacity-100 px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-xs transition-opacity"
                                title="تعيين كصورة رئيسية"
                              >
                                رئيسية
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="opacity-0 group-hover:opacity-100 px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-xs transition-opacity"
                              >
                                <FaTrash className="inline" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-[#a5b4fc]">
                      <FaImage className="text-4xl mx-auto mb-2 opacity-50" />
                      <p>لا توجد صور في المعرض</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="ai-card rounded-xl p-6 mt-4">
              <h3 className="text-xl font-bold mb-4 ai-text-gradient">المرافق (Amenities)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#a5b4fc] mb-2 block">المرافق (عربي) - مفصولة بفواصل</label>
                  <textarea
                    rows={4}
                    defaultValue={hotel?.amenities.join(', ')}
                    className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
                    placeholder="واي فاي مجاني, مطاعم فاخرة, سبا..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#a5b4fc] mb-2 block">Amenities (English) - comma separated</label>
                  <textarea
                    rows={4}
                    defaultValue={hotel?.amenitiesEn.join(', ')}
                    className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
                    placeholder="Free WiFi, Luxury Restaurants, Spa..."
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}

