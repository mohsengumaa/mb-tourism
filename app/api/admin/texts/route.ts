import { NextRequest, NextResponse } from 'next/server'
import { getTextsData, saveTextsData } from '@/lib/utils/texts-data'

export async function GET() {
  try {
    const texts = await getTextsData()
    return NextResponse.json({ success: true, data: texts })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    await saveTextsData(data)
    return NextResponse.json({ success: true, message: 'Texts updated successfully' })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

