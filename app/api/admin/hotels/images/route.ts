import { NextRequest, NextResponse } from 'next/server'
import { getHotelsData, updateHotel } from '@/lib/utils/hotels-data'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads', 'hotels')

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const hotelId = formData.get('hotelId') as string
    const roomId = formData.get('roomId') as string | null
    const imageType = formData.get('imageType') as string // 'main', 'gallery', 'room'

    if (!file || !hotelId) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    // إنشاء مجلدات إذا لم تكن موجودة
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true })
    }

    const hotelDir = join(UPLOAD_DIR, hotelId)
    if (!existsSync(hotelDir)) {
      await mkdir(hotelDir, { recursive: true })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    const fileName = `${imageType}-${Date.now()}-${file.name}`
    const filePath = join(hotelDir, fileName)
    
    await writeFile(filePath, buffer)
    
    const fileUrl = `/uploads/hotels/${hotelId}/${fileName}`
    
    // تحديث بيانات الفندق
    const hotels = await getHotelsData()
    const hotel = hotels.find(h => h.id === parseInt(hotelId))
    
    if (!hotel) {
      return NextResponse.json({ success: false, error: 'Hotel not found' }, { status: 404 })
    }

    if (roomId && imageType === 'room') {
      // إضافة صورة للغرفة
      const room = hotel.rooms.find(r => r.id === parseInt(roomId))
      if (room) {
        if (!room.images) room.images = []
        room.images.push(fileUrl)
      }
    } else if (imageType === 'main') {
      hotel.image = fileUrl
    } else if (imageType === 'gallery') {
      if (!hotel.images) hotel.images = []
      hotel.images.push(fileUrl)
    }

    await updateHotel(parseInt(hotelId), hotel)
    
    return NextResponse.json({ success: true, url: fileUrl, message: 'Image uploaded successfully' })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

