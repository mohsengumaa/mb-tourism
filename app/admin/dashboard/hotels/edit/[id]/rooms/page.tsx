'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaHome } from 'react-icons/fa'
import { hotels } from '@/data/hotels'
import type { Hotel, Room } from '@/data/hotels'

export default function ManageRooms() {
  const router = useRouter()
  const params = useParams()
  const hotelId = parseInt(params.id as string)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hotel, setHotel] = useState<Hotel | null>(null)

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth !== 'true') {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
      const foundHotel = hotels.find(h => h.id === hotelId)
      if (foundHotel) {
        setHotel(foundHotel)
      } else {
        router.push('/admin/dashboard/hotels')
      }
    }
  }, [router, hotelId])

  const handleDelete = (roomId: number) => {
    if (confirm('هل أنت متأكد من حذف هذه الغرفة؟')) {
      console.log('Delete room:', roomId)
      alert('تم حذف الغرفة')
    }
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
            <Link href={`/admin/dashboard/hotels/edit/${hotelId}`} className="ai-button px-4 py-2 rounded-lg text-sm">
              <FaArrowLeft className="inline mr-2" />
              رجوع
            </Link>
            <Link href="/" className="ai-button px-4 py-2 rounded-lg text-sm">
              <FaHome className="inline mr-2" />
              الرئيسية
            </Link>
            <h1 className="text-2xl font-bold ai-text-gradient">
              إدارة غرف: {hotel.name}
            </h1>
          </div>
          <Link
            href={`/admin/dashboard/hotels/edit/${hotelId}/rooms/add`}
            className="ai-button px-4 py-2 rounded-lg text-sm"
          >
            <FaPlus className="inline mr-2" />
            إضافة غرفة
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
                  <th className="text-right py-3 px-4 text-[#a5b4fc] font-semibold">اسم الغرفة</th>
                  <th className="text-right py-3 px-4 text-[#a5b4fc] font-semibold">الوصف</th>
                  <th className="text-right py-3 px-4 text-[#a5b4fc] font-semibold">عدد الضيوف</th>
                  <th className="text-right py-3 px-4 text-[#a5b4fc] font-semibold">السعر (EUR)</th>
                  <th className="text-right py-3 px-4 text-[#a5b4fc] font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {hotel.rooms.map((room) => (
                  <tr
                    key={room.id}
                    className="border-b border-[rgba(175,132,185,0.1)] hover:bg-[rgba(175,132,185,0.05)]"
                  >
                    <td className="py-3 px-4 text-white">{room.id}</td>
                    <td className="py-3 px-4 text-white">{room.name}</td>
                    <td className="py-3 px-4 text-[#a5b4fc] max-w-xs truncate">{room.description}</td>
                    <td className="py-3 px-4 text-[#a5b4fc]">{room.maxGuests}</td>
                    <td className="py-3 px-4 text-[#a5b4fc]">{room.price.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/dashboard/hotels/edit/${hotelId}/rooms/edit/${room.id}`}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
                        >
                          <FaEdit className="inline mr-1" />
                          تعديل
                        </Link>
                        <button
                          onClick={() => handleDelete(room.id)}
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
