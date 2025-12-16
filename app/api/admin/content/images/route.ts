import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads', 'hero-slider')

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const slideId = formData.get('slideId') as string

    if (!file || !slideId) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    // إنشاء مجلدات إذا لم تكن موجودة
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    const fileName = `slide-${slideId}-${Date.now()}-${file.name}`
    const filePath = join(UPLOAD_DIR, fileName)
    
    await writeFile(filePath, buffer)
    
    const fileUrl = `/uploads/hero-slider/${fileName}`
    
    return NextResponse.json({ success: true, url: fileUrl, message: 'Image uploaded successfully' })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

