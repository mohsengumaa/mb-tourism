import { NextRequest, NextResponse } from 'next/server'
import { getMediaData, saveMediaData } from '@/lib/utils/media-data'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads')

export async function GET() {
  try {
    const media = await getMediaData()
    return NextResponse.json({ success: true, data: media })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string // 'logo', 'video', 'thumbnail'

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 })
    }

    // إنشاء مجلد uploads إذا لم يكن موجوداً
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    const fileName = `${type}-${Date.now()}-${file.name}`
    const filePath = join(UPLOAD_DIR, fileName)
    
    await writeFile(filePath, buffer)
    
    const fileUrl = `/uploads/${fileName}`
    
    // تحديث البيانات
    const media = await getMediaData()
    if (type === 'logo') {
      media.logo = fileUrl
    } else if (type === 'video') {
      media.homeVideo.url = fileUrl
    } else if (type === 'thumbnail') {
      media.homeVideo.thumbnail = fileUrl
    }
    
    await saveMediaData(media)
    
    return NextResponse.json({ success: true, url: fileUrl, message: 'File uploaded successfully' })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    await saveMediaData(data)
    return NextResponse.json({ success: true, message: 'Media updated successfully' })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
