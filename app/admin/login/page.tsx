'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // كلمة مرور بسيطة - يمكن تحسينها لاحقاً
    if (password === 'admin123') {
      localStorage.setItem('adminAuth', 'true')
      router.push('/admin/dashboard')
    } else {
      setError('كلمة المرور غير صحيحة')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="ai-card p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center ai-text-gradient">
          لوحة التحكم
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-[#e0e7ff]">
              كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(175,132,185,0.3)] text-white focus:outline-none focus:border-[var(--color-ai-accent)]"
              placeholder="أدخل كلمة المرور"
              required
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}
          <button
            type="submit"
            className="w-full ai-button py-3 rounded-lg font-semibold"
          >
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  )
}

