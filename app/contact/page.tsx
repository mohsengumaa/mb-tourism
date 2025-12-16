'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    alert('تم إرسال رسالتك بنجاح!')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <div className="min-h-screen relative z-10">
      <Header />
      
      <div className="container-custom py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center ai-text-gradient">
          تواصل معنا
        </h1>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="ai-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 ai-text-gradient">معلومات التواصل</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <FiPhone className="w-6 h-6 text-[var(--color-ai-blue)] mt-1" />
                  <div>
                    <h3 className="font-semibold text-[var(--color-ai-cyan)] mb-1">الهاتف</h3>
                    <p className="text-[#e0e7ff]">+90 XXX XXX XX XX</p>
                    <p className="text-[#e0e7ff]">+90 XXX XXX XX XX</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FiMail className="w-6 h-6 text-[var(--color-ai-blue)] mt-1" />
                  <div>
                    <h3 className="font-semibold text-[var(--color-ai-cyan)] mb-1">البريد الإلكتروني</h3>
                    <p className="text-[#e0e7ff]">info@mb-tourism.com</p>
                    <p className="text-[#e0e7ff]">support@mb-tourism.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FiMapPin className="w-6 h-6 text-[var(--color-ai-blue)] mt-1" />
                  <div>
                    <h3 className="font-semibold text-[var(--color-ai-cyan)] mb-1">العنوان</h3>
                    <p className="text-[#e0e7ff]">إسطنبول، تركيا</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FiClock className="w-6 h-6 text-[var(--color-ai-blue)] mt-1" />
                  <div>
                    <h3 className="font-semibold text-[var(--color-ai-cyan)] mb-1">ساعات العمل</h3>
                    <p className="text-[#e0e7ff]">يومياً من 9:00 صباحاً حتى 9:00 مساءً</p>
                    <p className="text-[#e0e7ff]">خدمة 24/7 للطوارئ</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="ai-card rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4 ai-text-gradient">تابعنا على</h3>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 ai-button rounded-full flex items-center justify-center transition">
                  FB
                </a>
                <a href="#" className="w-12 h-12 ai-button rounded-full flex items-center justify-center transition">
                  IG
                </a>
                <a href="#" className="w-12 h-12 ai-button rounded-full flex items-center justify-center transition">
                  TW
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="ai-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 ai-text-gradient">أرسل لنا رسالة</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2 text-[var(--color-ai-cyan)]">
                  الاسم
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[rgba(175,132,185,0.1)] border border-[rgba(175,132,185,0.3)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-ai-blue)] text-[#e0e7ff] placeholder:text-[#a5b4fc] focus:bg-[rgba(175,132,185,0.15)] transition-all"
                  placeholder="اسمك الكامل"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2 text-[var(--color-ai-cyan)]">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[rgba(175,132,185,0.1)] border border-[rgba(175,132,185,0.3)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-ai-blue)] text-[#e0e7ff] placeholder:text-[#a5b4fc] focus:bg-[rgba(175,132,185,0.15)] transition-all"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-[var(--color-ai-cyan)]">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-[rgba(175,132,185,0.1)] border border-[rgba(175,132,185,0.3)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-ai-blue)] text-[#e0e7ff] placeholder:text-[#a5b4fc] focus:bg-[rgba(175,132,185,0.15)] transition-all"
                  placeholder="+90 XXX XXX XX XX"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2 text-[var(--color-ai-cyan)]">
                  الرسالة
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-[rgba(175,132,185,0.1)] border border-[rgba(175,132,185,0.3)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-ai-blue)] resize-none text-[#e0e7ff] placeholder:text-[#a5b4fc] focus:bg-[rgba(175,132,185,0.15)] transition-all"
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>

              <button
                type="submit"
                className="w-full ai-button px-6 py-3 rounded-lg font-semibold text-lg"
              >
                إرسال الرسالة
              </button>
            </form>
          </div>
        </div>
      </div>

      <footer className="bg-[rgba(42,42,40,0.8)] border-t border-[rgba(175,132,185,0.2)] py-8 mt-16 relative">
        <div className="container-custom text-center">
          <p className="text-[#a5b4fc]">&copy; 2024 MB Tourism. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  )
}

