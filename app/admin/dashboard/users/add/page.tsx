'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft, FaSave, FaHome } from 'react-icons/fa'

export default function AddUser() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'viewer' as 'admin' | 'editor' | 'viewer',
    permissions: {
      hotels: false,
      content: false,
      media: false,
      users: false,
      settings: false,
    },
  })

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth !== 'true') {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password.length < 6) {
      alert('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
      return
    }

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      if (result.success) {
        alert('تم إضافة المستخدم بنجاح!')
        router.push('/admin/dashboard/users')
      } else {
        alert('حدث خطأ: ' + result.error)
      }
    } catch (error) {
      alert('حدث خطأ أثناء الإضافة')
      console.error(error)
    }
  }

  const handlePermissionChange = (permission: keyof typeof formData.permissions, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: value,
      },
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
            <Link href="/admin/dashboard/users" className="ai-button px-4 py-2 rounded-lg text-sm">
              <FaArrowLeft className="inline mr-2" />
              رجوع
            </Link>
            <Link href="/" className="ai-button px-4 py-2 rounded-lg text-sm">
              <FaHome className="inline mr-2" />
              الرئيسية
            </Link>
            <h1 className="text-2xl font-bold ai-text-gradient">إضافة مستخدم جديد</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="ai-card rounded-xl p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#a5b4fc]">
                اسم المستخدم *
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#a5b4fc]">
                البريد الإلكتروني *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#a5b4fc]">
                كلمة المرور * (6 أحرف على الأقل)
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
                required
                minLength={6}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#a5b4fc]">
                الدور *
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as 'admin' | 'editor' | 'viewer' }))}
                className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
                required
              >
                <option value="admin">مدير</option>
                <option value="editor">محرر</option>
                <option value="viewer">مشاهد</option>
              </select>
            </div>
          </div>

          {/* Permissions */}
          <div className="ai-card rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 ai-text-gradient">الصلاحيات</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(formData.permissions).map(([key, value]) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handlePermissionChange(key as keyof typeof formData.permissions, e.target.checked)}
                    className="w-5 h-5 rounded bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-[var(--color-ai-accent)] focus:ring-2 focus:ring-[var(--color-ai-accent)]"
                  />
                  <span className="text-white">
                    {key === 'hotels' ? 'إدارة الفنادق' :
                     key === 'content' ? 'إدارة المحتوى' :
                     key === 'media' ? 'إدارة الوسائط' :
                     key === 'users' ? 'إدارة المستخدمين' :
                     key === 'settings' ? 'الإعدادات' : key}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="ai-button px-6 py-3 rounded-lg font-semibold"
            >
              <FaSave className="inline mr-2" />
              إضافة المستخدم
            </button>
            <Link
              href="/admin/dashboard/users"
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

