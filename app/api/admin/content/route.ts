import { NextRequest, NextResponse } from 'next/server'
import { getContentData, saveContentData } from '@/lib/utils/content-data'

export async function GET() {
  try {
    const content = await getContentData()
    return NextResponse.json({ success: true, data: content })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    await saveContentData(data)
    return NextResponse.json({ success: true, message: 'Content updated successfully' })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

