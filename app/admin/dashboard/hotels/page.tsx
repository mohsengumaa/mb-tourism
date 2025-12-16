'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaHome } from 'react-icons/fa'
import { hotels } from '@/data/hotels'
import type { Hotel } from '@/data/hotels'

export default function HotelsManagement() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hotelsList, setHotelsList] = useState<Hotel[]>([])

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth !== 'true') {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
      setHotelsList(hotels)
    }
  }, [router])

  const handleDelete = async (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا الفندق؟')) {
      try {
        const response = await fetch(`/api/admin/hotels?id=${id}`, {
          method: 'DELETE',
        })
        const result = await response.json()
        if (result.success) {
          alert('تم حذف الفندق بنجاح!')
          setHotelsList(prev => prev.filter(h => h.id !== id))
        } else {
          alert('حدث خطأ: ' + result.error)
        }
      } catch (error) {
        alert('حدث خطأ أثناء الحذف')
        console.error(error)
      }
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
              إدارة الفنادق
            </h1>
          </div>
          <Link
            href="/admin/dashboard/hotels/add"
            className="ai-button px-4 py-2 rounded-lg text-sm"
          >
            <FaPlus className="inline mr-2" />
            إضافة فندق
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="ai-card rounded-xl p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(175,132,185,0.2)]">
                  <th className="text-right py-3 px-4 text-[#a5b4fc] font-semibold">ID</th>
                  <th className="text-right py-3 px-4 text-[#a5b4fc] font-semibold">اسم الفندق</th>
                  <th className="text-right py-3 px-4 text-[#a5b4fc] font-semibold">الموقع</th>
                  <th className="text-right py-3 px-4 text-[#a5b4fc] font-semibold">النجوم</th>
                  <th className="text-right py-3 px-4 text-[#a5b4fc] font-semibold">عدد الغرف</th>
                  <th className="text-right py-3 px-4 text-[#a5b4fc] font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {hotelsList.map((hotel) => (
                  <tr
                    key={hotel.id}
                    className="border-b border-[rgba(175,132,185,0.1)] hover:bg-[rgba(175,132,185,0.05)]"
                  >
                    <td className="py-3 px-4 text-white">{hotel.id}</td>
                    <td className="py-3 px-4 text-white">{hotel.name}</td>
                    <td className="py-3 px-4 text-[#a5b4fc]">{hotel.location}</td>
                    <td className="py-3 px-4 text-[#a5b4fc]">{'⭐'.repeat(hotel.stars)}</td>
                    <td className="py-3 px-4 text-[#a5b4fc]">{hotel.rooms.length}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/dashboard/hotels/edit/${hotel.id}`}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
                        >
                          <FaEdit className="inline mr-1" />
                          تعديل
                        </Link>
                        <button
                          onClick={() => handleDelete(hotel.id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
                        >
                          <FaTrash className="inline mr-1" />
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

