'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { FaArrowLeft, FaSave, FaHome, FaUpload, FaImage, FaPlus, FaTrash, FaCheck } from 'react-icons/fa'
import type { Hotel } from '@/data/hotels'

interface HomeContent {
  heroSlides: Array<{ id: number; title: string; image: string }>
  aboutTitle: string
  aboutText1: string
  aboutText2: string
  bestSellingTitle: string
  bestSellingSubtitle: string
  bestSellingHotels: number[]
}

export default function ContentManagement() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [content, setContent] = useState<HomeContent>({
    heroSlides: [
      { id: 1, title: 'استمتع بإقامة رائعة في إسطنبول', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200' },
      { id: 2, title: 'أفضل الفنادق بأفضل الأسعار', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73e8e?w=1200' },
      { id: 3, title: 'خدمات التوصيل للمطار', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200' },
    ],
    aboutTitle: 'من نحن',
    aboutText1: 'MB Tourism هي شركة متخصصة في حجز الفنادق في تركيا وخاصة في إسطنبول. نحن نقدم خدمات متميزة لعملائنا مع ضمان أفضل الأسعار والخدمات.',
    aboutText2: 'مؤسس الشركة، محمد بلال، لديه خبرة طويلة في مجال السياحة والفنادق في تركيا، ونحن نهدف إلى توفير تجربة سياحية ممتازة لجميع عملائنا من خلال خدماتنا المتنوعة بما في ذلك حجز الفنادق وخدمات التوصيل للمطار.',
    bestSellingTitle: 'الفنادق الأكثر مبيعاً',
    bestSellingSubtitle: 'اكتشف أفضل الفنادق في إسطنبول',
    bestSellingHotels: [],
  })

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth !== 'true') {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
      // جلب البيانات من API
      fetch('/api/admin/content')
        .then(res => res.json())
        .then(result => {
          if (result.success && result.data) {
            setContent(result.data)
          }
        })
        .catch(err => console.error('Failed to load content:', err))
      
      // جلب قائمة الفنادق
      fetch('/api/admin/hotels')
        .then(res => res.json())
        .then(result => {
          if (result.success && result.data) {
            setHotels(result.data)
          }
        })
        .catch(err => console.error('Failed to load hotels:', err))
        .finally(() => setLoadingHotels(false))
    }
  }, [router])

  const handleSave = async () => {
    try {
      const response = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      const result = await response.json()
      if (result.success) {
        alert('تم حفظ المحتوى بنجاح! سيتم تحديث الموقع بعد إعادة التحميل.')
      } else {
        alert('حدث خطأ: ' + result.error)
      }
    } catch (error) {
      alert('حدث خطأ أثناء الحفظ')
      console.error(error)
    }
  }

  const [uploading, setUploading] = useState<number | null>(null)
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loadingHotels, setLoadingHotels] = useState(true)

  const updateSlide = (id: number, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      heroSlides: prev.heroSlides.map(slide =>
        slide.id === id ? { ...slide, [field]: value } : slide
      )
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, slideId: number) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(slideId)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('slideId', slideId.toString())

    try {
      const response = await fetch('/api/admin/content/images', {
        method: 'POST',
        body: formData,
      })
      const result = await response.json()
      if (result.success) {
        updateSlide(slideId, 'image', result.url)
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

  const addSlide = () => {
    const newId = Math.max(...content.heroSlides.map(s => s.id), 0) + 1
    setContent(prev => ({
      ...prev,
      heroSlides: [...prev.heroSlides, { id: newId, title: '', image: '' }]
    }))
  }

  const removeSlide = (slideId: number) => {
    if (confirm('هل أنت متأكد من حذف هذه الشريحة؟')) {
      setContent(prev => ({
        ...prev,
        heroSlides: prev.heroSlides.filter(slide => slide.id !== slideId)
      }))
    }
  }

  const toggleBestSellingHotel = (hotelId: number) => {
    setContent(prev => {
      const currentIds = prev.bestSellingHotels || []
      const isSelected = currentIds.includes(hotelId)
      return {
        ...prev,
        bestSellingHotels: isSelected
          ? currentIds.filter(id => id !== hotelId)
          : [...currentIds, hotelId]
      }
    })
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
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
            <h1 className="text-2xl font-bold ai-text-gradient">إدارة محتوى الصفحة الرئيسية</h1>
          </div>
          <button onClick={handleSave} className="ai-button px-4 py-2 rounded-lg text-sm">
            <FaSave className="inline mr-2" />
            حفظ
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Hero Slider */}
          <div className="ai-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold ai-text-gradient">Hero Slider</h2>
              <button
                onClick={addSlide}
                className="ai-button px-4 py-2 rounded-lg text-sm"
              >
                <FaPlus className="inline mr-2" />
                إضافة شريحة
              </button>
            </div>
            <div className="space-y-4">
              {content.heroSlides.map((slide) => (
                <div key={slide.id} className="p-4 bg-[rgba(255,255,255,0.05)] rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">شريحة {slide.id}</h3>
                    {content.heroSlides.length > 1 && (
                      <button
                        onClick={() => removeSlide(slide.id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
                      >
                        <FaTrash className="inline mr-1" />
                        حذف
                      </button>
                    )}
                  </div>
                  
                  {/* Image Preview and Upload */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-[#a5b4fc]">صورة الشريحة</label>
                    <div className="flex items-center gap-4">
                      {slide.image && (
                        <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-[rgba(175,132,185,0.3)]">
                          <Image
                            src={slide.image}
                            alt={`Slide ${slide.id}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <label className={`ai-button py-2 rounded-lg text-center cursor-pointer block ${uploading === slide.id ? 'opacity-50' : ''}`}>
                          <FaUpload className="inline mr-2" />
                          {uploading === slide.id ? 'جاري الرفع...' : 'رفع صورة'}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, slide.id)}
                            className="hidden"
                            disabled={uploading === slide.id}
                          />
                        </label>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={slide.image}
                      onChange={(e) => updateSlide(slide.id, 'image', e.target.value)}
                      placeholder="أو أدخل رابط الصورة مباشرة"
                      className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-[#a5b4fc]">النص</label>
                    <input
                      type="text"
                      value={slide.title}
                      onChange={(e) => updateSlide(slide.id, 'title', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best Selling Section */}
          <div className="ai-card rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 ai-text-gradient">قسم الفنادق الأكثر مبيعاً</h2>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-[#a5b4fc]">العنوان</label>
                <input
                  type="text"
                  value={content.bestSellingTitle}
                  onChange={(e) => setContent(prev => ({ ...prev, bestSellingTitle: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-[#a5b4fc]">النص الفرعي</label>
                <input
                  type="text"
                  value={content.bestSellingSubtitle}
                  onChange={(e) => setContent(prev => ({ ...prev, bestSellingSubtitle: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
                />
              </div>
              
              {/* Hotel Selection */}
              <div className="flex flex-col gap-2 mt-6">
                <label className="text-sm font-medium text-[#a5b4fc]">
                  اختر الفنادق التي تظهر في هذا القسم
                  <span className="text-xs text-gray-400 block mt-1">
                    {content.bestSellingHotels?.length || 0} فندق محدد
                    {(!content.bestSellingHotels || content.bestSellingHotels.length === 0) && 
                      ' (إذا لم تختر أي فندق، سيتم عرض الفنادق الأكثر حجوزات تلقائياً)'}
                  </span>
                </label>
                {loadingHotels ? (
                  <p className="text-[#a5b4fc]">جاري تحميل الفنادق...</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-2 bg-[rgba(255,255,255,0.05)] rounded-lg">
                    {hotels.map((hotel) => {
                      const isSelected = content.bestSellingHotels?.includes(hotel.id) || false
                      return (
                        <button
                          key={hotel.id}
                          type="button"
                          onClick={() => toggleBestSellingHotel(hotel.id)}
                          className={`p-3 rounded-lg border-2 transition-all text-left ${
                            isSelected
                              ? 'border-[var(--color-ai-accent)] bg-[rgba(175,132,185,0.2)]'
                              : 'border-[rgba(175,132,185,0.3)] bg-[rgba(255,255,255,0.05)] hover:border-[rgba(175,132,185,0.5)]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              isSelected
                                ? 'border-[var(--color-ai-accent)] bg-[var(--color-ai-accent)]'
                                : 'border-[rgba(175,132,185,0.5)]'
                            }`}>
                              {isSelected && <FaCheck className="text-white text-xs" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-semibold truncate">{hotel.name}</p>
                              <p className="text-[#a5b4fc] text-xs truncate">{hotel.location}</p>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="ai-card rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 ai-text-gradient">قسم من نحن</h2>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-[#a5b4fc]">العنوان</label>
                <input
                  type="text"
                  value={content.aboutTitle}
                  onChange={(e) => setContent(prev => ({ ...prev, aboutTitle: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-[#a5b4fc]">النص الأول</label>
                <textarea
                  value={content.aboutText1}
                  onChange={(e) => setContent(prev => ({ ...prev, aboutText1: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-[#a5b4fc]">النص الثاني</label>
                <textarea
                  value={content.aboutText2}
                  onChange={(e) => setContent(prev => ({ ...prev, aboutText2: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

