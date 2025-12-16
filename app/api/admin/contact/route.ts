import { NextRequest, NextResponse } from 'next/server'
import { getContactData, saveContactData } from '@/lib/utils/contact-data'

export async function GET() {
  try {
    const contact = await getContactData()
    return NextResponse.json({ success: true, data: contact })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    await saveContactData(data)
    return NextResponse.json({ success: true, message: 'Contact info updated successfully' })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

