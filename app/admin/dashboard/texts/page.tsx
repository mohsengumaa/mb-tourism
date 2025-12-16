'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft, FaSave, FaHome } from 'react-icons/fa'
import { translations } from '@/contexts/LanguageContext'

export default function TextsManagement() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState<'ar' | 'en'>('ar')
  const [textsAr, setTextsAr] = useState(translations.ar)
  const [textsEn, setTextsEn] = useState(translations.en)

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth !== 'true') {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleSave = async () => {
    try {
      const response = await fetch('/api/admin/texts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ar: textsAr, en: textsEn }),
      })
      const result = await response.json()
      if (result.success) {
        alert('تم حفظ النصوص بنجاح! سيتم تحديث الموقع بعد إعادة التحميل.')
      } else {
        alert('حدث خطأ: ' + result.error)
      }
    } catch (error) {
      alert('حدث خطأ أثناء الحفظ')
      console.error(error)
    }
  }

  const handleChangeAr = (key: string, value: string) => {
    setTextsAr(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleChangeEn = (key: string, value: string) => {
    setTextsEn(prev => ({
      ...prev,
      [key]: value
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
              إدارة النصوص
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
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('ar')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'ar'
                ? 'ai-button'
                : 'bg-[rgba(255,255,255,0.1)] text-[#a5b4fc] hover:bg-[rgba(255,255,255,0.15)]'
            }`}
          >
            النصوص العربية
          </button>
          <button
            onClick={() => setActiveTab('en')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'en'
                ? 'ai-button'
                : 'bg-[rgba(255,255,255,0.1)] text-[#a5b4fc] hover:bg-[rgba(255,255,255,0.15)]'
            }`}
          >
            English Texts
          </button>
        </div>

        <div className="ai-card rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6 ai-text-gradient">
            {activeTab === 'ar' ? 'النصوص العربية' : 'English Texts'}
          </h2>
          <div className="space-y-4">
            {Object.entries(activeTab === 'ar' ? textsAr : textsEn).map(([key, value]) => (
              <div key={key} className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#a5b4fc]">
                  {key}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => activeTab === 'ar' 
                    ? handleChangeAr(key, e.target.value)
                    : handleChangeEn(key, e.target.value)
                  }
                  className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

