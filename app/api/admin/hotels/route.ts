import { NextRequest, NextResponse } from 'next/server'
import { getHotelsData, updateHotel, deleteHotel, addHotel } from '@/lib/utils/hotels-data'
import type { Hotel } from '@/data/hotels'

export async function GET() {
  try {
    const hotels = await getHotelsData()
    return NextResponse.json({ success: true, data: hotels })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const newHotel = await addHotel(data)
    return NextResponse.json({ success: true, data: newHotel, message: 'Hotel added successfully' })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const { id, ...updates } = data
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'Hotel ID is required' }, { status: 400 })
    }
    
    const updated = await updateHotel(id, updates)
    
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Hotel not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true, data: updated, message: 'Hotel updated successfully' })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'Hotel ID is required' }, { status: 400 })
    }
    
    const deleted = await deleteHotel(parseInt(id))
    
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Hotel not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true, message: 'Hotel deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

