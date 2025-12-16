'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaHome, FaUser, FaUserShield } from 'react-icons/fa'

interface User {
  id: number
  username: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  permissions: {
    hotels: boolean
    content: boolean
    media: boolean
    users: boolean
    settings: boolean
  }
  createdAt: string
  lastLogin?: string
}

export default function UsersManagement() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth !== 'true') {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
      fetchUsers()
    }
  }, [router])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users')
      const result = await response.json()
      if (result.success && result.data) {
        setUsers(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      try {
        const response = await fetch(`/api/admin/users?id=${id}`, {
          method: 'DELETE',
        })
        const result = await response.json()
        if (result.success) {
          alert('تم حذف المستخدم بنجاح')
          fetchUsers()
        } else {
          alert('حدث خطأ: ' + result.error)
        }
      } catch (error) {
        alert('حدث خطأ أثناء الحذف')
      }
    }
  }

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: 'bg-red-600',
      editor: 'bg-blue-600',
      viewer: 'bg-green-600',
    }
    return (
      <span className={`px-2 py-1 rounded text-xs text-white ${colors[role as keyof typeof colors] || 'bg-gray-600'}`}>
        {role === 'admin' ? 'مدير' : role === 'editor' ? 'محرر' : 'مشاهد'}
      </span>
    )
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
            <h1 className="text-2xl font-bold ai-text-gradient">إدارة المستخدمين</h1>
          </div>
          <Link
            href="/admin/dashboard/users/add"
            className="ai-button px-4 py-2 rounded-lg text-sm"
          >
            <FaPlus className="inline mr-2" />
            إضافة مستخدم
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="ai-card rounded-xl p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(175,132,185,0.2)]">
                  <th className="text-right py-3 px-4 text-[#a5b4fc] font-semibold">ID</th>
                  <th className="text-right py-3 px-4 text-[#a5b4fc] font-semibold">اسم المستخدم</th>
                  <th className="text-right py-3 px-4 text-[#a5b4fc] font-semibold">البريد الإلكتروني</th>
                  <th className="text-right py-3 px-4 text-[#a5b4fc] font-semibold">الدور</th>
                  <th className="text-right py-3 px-4 text-[#a5b4fc] font-semibold">آخر تسجيل دخول</th>
                  <th className="text-right py-3 px-4 text-[#a5b4fc] font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-[rgba(175,132,185,0.1)] hover:bg-[rgba(175,132,185,0.05)]"
                  >
                    <td className="py-3 px-4 text-white">{user.id}</td>
                    <td className="py-3 px-4 text-white">{user.username}</td>
                    <td className="py-3 px-4 text-[#a5b4fc]">{user.email}</td>
                    <td className="py-3 px-4">{getRoleBadge(user.role)}</td>
                    <td className="py-3 px-4 text-[#a5b4fc] text-sm">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('ar') : '-'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/dashboard/users/edit/${user.id}`}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
                        >
                          <FaEdit className="inline mr-1" />
                          تعديل
                        </Link>
                        <button
                          onClick={() => handleDelete(user.id)}
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

