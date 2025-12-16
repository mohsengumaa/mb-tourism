'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  FaHotel, 
  FaLanguage, 
  FaEnvelope, 
  FaImage, 
  FaSignOutAlt,
  FaHome,
  FaCog,
  FaBed,
  FaFileAlt,
  FaSlidersH,
  FaUserShield
} from 'react-icons/fa'
import { hotels } from '@/data/hotels'

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth !== 'true') {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  // إحصائيات
  const totalHotels = hotels.length
  const totalRooms = hotels.reduce((sum, hotel) => sum + hotel.rooms.length, 0)
  const totalBookings = hotels.reduce((sum, hotel) => sum + (hotel.bookings || 0), 0)

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin/login')
  }

  if (!isAuthenticated) {
    return null
  }

  const menuItems = [
    {
      title: 'إدارة الفنادق',
      description: 'إضافة، تعديل أو حذف الفنادق والغرف',
      icon: FaHotel,
      href: '/admin/dashboard/hotels',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'إدارة النصوص',
      description: 'تعديل النصوص والترجمات',
      icon: FaLanguage,
      href: '/admin/dashboard/texts',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'معلومات التواصل',
      description: 'تعديل معلومات التواصل والواتساب',
      icon: FaEnvelope,
      href: '/admin/dashboard/contact',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'الصور والشعار',
      description: 'إدارة الصور والشعار',
      icon: FaImage,
      href: '/admin/dashboard/media',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'إدارة محتوى الصفحات',
      description: 'تعديل محتوى الصفحة الرئيسية',
      icon: FaFileAlt,
      href: '/admin/dashboard/content',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      title: 'إدارة المستخدمين',
      description: 'إضافة وتعديل المستخدمين والصلاحيات',
      icon: FaUserShield,
      href: '/admin/dashboard/users',
      color: 'from-yellow-500 to-orange-500'
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      {/* Header */}
      <header className="bg-[rgba(15,12,41,0.8)] backdrop-blur-sm border-b border-[rgba(175,132,185,0.2)] sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="ai-button px-4 py-2 rounded-lg text-sm">
              <FaHome className="inline mr-2" />
              الرئيسية
            </Link>
            <h1 className="text-2xl font-bold ai-text-gradient">
              لوحة التحكم
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
          >
            <FaSignOutAlt className="inline mr-2" />
            تسجيل الخروج
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 ai-text-gradient">
            مرحباً بك في لوحة التحكم
          </h2>
          <p className="text-[#a5b4fc]">
            اختر القسم الذي تريد إدارته
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="ai-card p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#a5b4fc] text-sm mb-1">إجمالي الفنادق</p>
                <p className="text-3xl font-bold text-white">{totalHotels}</p>
              </div>
              <FaHotel className="text-4xl text-blue-400" />
            </div>
          </div>
          <div className="ai-card p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#a5b4fc] text-sm mb-1">إجمالي الغرف</p>
                <p className="text-3xl font-bold text-white">{totalRooms}</p>
              </div>
              <FaBed className="text-4xl text-purple-400" />
            </div>
          </div>
          <div className="ai-card p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#a5b4fc] text-sm mb-1">إجمالي الحجوزات</p>
                <p className="text-3xl font-bold text-white">{totalBookings.toLocaleString()}</p>
              </div>
              <FaFileAlt className="text-4xl text-green-400" />
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={index}
                href={item.href}
                className="ai-card p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer group"
              >
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  {item.title}
                </h3>
                <p className="text-[#a5b4fc] text-sm">
                  {item.description}
                </p>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}

