import { NextRequest, NextResponse } from 'next/server'
import { getUsersData, createUser, updateUser, deleteUser } from '@/lib/utils/users-data'

export async function GET() {
  try {
    const users = await getUsersData()
    // إخفاء كلمات المرور
    const safeUsers = users.map(({ password, ...user }) => user)
    return NextResponse.json({ success: true, data: safeUsers })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { password, ...userData } = data
    
    if (!password || password.length < 6) {
      return NextResponse.json({ success: false, error: 'Password must be at least 6 characters' }, { status: 400 })
    }
    
    const newUser = await createUser({ ...userData, password })
    const { password: _, ...safeUser } = newUser
    return NextResponse.json({ success: true, data: safeUser, message: 'User created successfully' })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const { id, ...updates } = data
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 })
    }
    
    const updated = await updateUser(id, updates)
    if (!updated) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }
    
    const { password: _, ...safeUser } = updated
    return NextResponse.json({ success: true, data: safeUser, message: 'User updated successfully' })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 })
    }
    
    const deleted = await deleteUser(parseInt(id))
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true, message: 'User deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

