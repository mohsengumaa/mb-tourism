'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft, FaUpload, FaHome, FaImage, FaTrash, FaVideo, FaSave } from 'react-icons/fa'

interface MediaData {
  logo: string
  homeVideo: {
    url: string
    thumbnail: string
  }
}

export default function MediaManagement() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [media, setMedia] = useState<MediaData>({
    logo: '',
    homeVideo: { url: '', thumbnail: '' },
  })
  const [uploading, setUploading] = useState<string | null>(null)

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth !== 'true') {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
      fetch('/api/admin/media')
        .then(res => res.json())
        .then(result => {
          if (result.success && result.data) {
            setMedia(result.data)
          }
        })
    }
  }, [router])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(type)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type)

    try {
      const response = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      })
      const result = await response.json()
      if (result.success) {
        if (type === 'logo') {
          setMedia(prev => ({ ...prev, logo: result.url }))
        } else if (type === 'video') {
          setMedia(prev => ({ ...prev, homeVideo: { ...prev.homeVideo, url: result.url } }))
        } else if (type === 'thumbnail') {
          setMedia(prev => ({ ...prev, homeVideo: { ...prev.homeVideo, thumbnail: result.url } }))
        }
        alert('تم رفع الملف بنجاح')
      } else {
        alert('حدث خطأ: ' + result.error)
      }
    } catch (error) {
      alert('حدث خطأ أثناء الرفع')
    } finally {
      setUploading(null)
    }
  }

  const handleSave = async () => {
    try {
      const response = await fetch('/api/admin/media', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(media),
      })
      const result = await response.json()
      if (result.success) {
        alert('تم حفظ البيانات بنجاح!')
      } else {
        alert('حدث خطأ: ' + result.error)
      }
    } catch (error) {
      alert('حدث خطأ أثناء الحفظ')
    }
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
              الصور والشعار
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Logo Section */}
          <div className="ai-card rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 ai-text-gradient flex items-center gap-2">
              <FaImage />
              الشعار
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-center p-8 bg-[rgba(255,255,255,0.05)] rounded-lg border-2 border-dashed border-[rgba(175,132,185,0.3)]">
                {media.logo ? (
                  <img src={media.logo} alt="Logo" className="max-w-full max-h-48 object-contain" />
                ) : (
                  <div className="text-center text-[#a5b4fc]">
                    <FaImage className="text-4xl mx-auto mb-2" />
                    <p>لا يوجد شعار</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <label className={`flex-1 ai-button py-2 rounded-lg text-center cursor-pointer ${uploading === 'logo' ? 'opacity-50' : ''}`}>
                  <FaUpload className="inline mr-2" />
                  {uploading === 'logo' ? 'جاري الرفع...' : 'رفع شعار جديد'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'logo')}
                    className="hidden"
                    disabled={uploading === 'logo'}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="ai-card rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 ai-text-gradient flex items-center gap-2">
              <FaVideo />
              فيديو الصفحة الرئيسية
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#a5b4fc] mb-2">رابط الفيديو (URL)</label>
                <input
                  type="text"
                  value={media.homeVideo.url}
                  onChange={(e) => setMedia(prev => ({ ...prev, homeVideo: { ...prev.homeVideo, url: e.target.value } }))}
                  placeholder="https://..."
                  className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#a5b4fc] mb-2">صورة مصغرة للفيديو</label>
                {media.homeVideo.thumbnail && (
                  <img src={media.homeVideo.thumbnail} alt="Thumbnail" className="w-full h-48 object-cover rounded-lg mb-2" />
                )}
                <label className={`ai-button py-2 rounded-lg text-center cursor-pointer block ${uploading === 'thumbnail' ? 'opacity-50' : ''}`}>
                  <FaUpload className="inline mr-2" />
                  {uploading === 'thumbnail' ? 'جاري الرفع...' : 'رفع صورة مصغرة'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'thumbnail')}
                    className="hidden"
                    disabled={uploading === 'thumbnail'}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="ai-button px-6 py-3 rounded-lg font-semibold"
          >
            <FaSave className="inline mr-2" />
            حفظ جميع التغييرات
          </button>
        </div>
      </main>
    </div>
  )
}

