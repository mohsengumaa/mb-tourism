import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { hotels as defaultHotels } from '@/data/hotels'
import type { Hotel } from '@/data/hotels'

const HOTELS_JSON_FILE = join(process.cwd(), 'data', 'hotels-data.json')

// قراءة البيانات من JSON أو استخدام البيانات الافتراضية
export async function getHotelsData(): Promise<Hotel[]> {
  try {
    const fileContent = await readFile(HOTELS_JSON_FILE, 'utf-8')
    const parsed = JSON.parse(fileContent)
    // التأكد من أن البيانات صحيحة
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed
    }
    return defaultHotels
  } catch (error) {
    // إذا لم يوجد ملف JSON أو كان هناك خطأ، استخدم البيانات الافتراضية
    return defaultHotels
  }
}

// حفظ البيانات في JSON
export async function saveHotelsData(hotels: Hotel[]): Promise<void> {
  await writeFile(HOTELS_JSON_FILE, JSON.stringify(hotels, null, 2), 'utf-8')
}

// تحديث فندق محدد
export async function updateHotel(hotelId: number, updates: Partial<Hotel>): Promise<Hotel | null> {
  try {
    const hotels = await getHotelsData()
    const index = hotels.findIndex(h => h.id === hotelId)
    
    if (index === -1) return null
    
    // تحديث الحقول فقط، مع الحفاظ على الحقول المهمة مثل rooms, images, amenities
    const currentHotel = hotels[index]
    const updatedHotel: Hotel = {
      ...currentHotel,
      // تحديث الحقول المرسلة فقط
      name: updates.name !== undefined ? updates.name : currentHotel.name,
      nameEn: updates.nameEn !== undefined ? updates.nameEn : currentHotel.nameEn,
      stars: updates.stars !== undefined ? updates.stars : currentHotel.stars,
      location: updates.location !== undefined ? updates.location : currentHotel.location,
      locationEn: updates.locationEn !== undefined ? updates.locationEn : currentHotel.locationEn,
      description: updates.description !== undefined ? updates.description : currentHotel.description,
      descriptionEn: updates.descriptionEn !== undefined ? updates.descriptionEn : currentHotel.descriptionEn,
      bookingPrice: updates.bookingPrice !== undefined ? updates.bookingPrice : currentHotel.bookingPrice,
      // حساب السعر إذا تم تحديث bookingPrice
      price: updates.bookingPrice !== undefined ? updates.bookingPrice * 0.9 : (updates.price !== undefined ? updates.price : currentHotel.price),
      // الحفاظ على الحقول المهمة
      rooms: updates.rooms || currentHotel.rooms,
      images: updates.images !== undefined ? updates.images : currentHotel.images,
      amenities: updates.amenities || currentHotel.amenities,
      amenitiesEn: updates.amenitiesEn || currentHotel.amenitiesEn,
      image: updates.image !== undefined ? updates.image : currentHotel.image,
      bookings: updates.bookings !== undefined ? updates.bookings : currentHotel.bookings,
    }
    
    hotels[index] = updatedHotel
    await saveHotelsData(hotels)
    return hotels[index]
  } catch (error) {
    console.error('Error updating hotel:', error)
    throw error
  }
}

// حذف فندق
export async function deleteHotel(hotelId: number): Promise<boolean> {
  const hotels = await getHotelsData()
  const filtered = hotels.filter(h => h.id !== hotelId)
  
  if (filtered.length === hotels.length) return false
  
  await saveHotelsData(filtered)
  return true
}

// إضافة فندق جديد
export async function addHotel(hotel: Omit<Hotel, 'id'>): Promise<Hotel> {
  const hotels = await getHotelsData()
  const newId = Math.max(...hotels.map(h => h.id), 0) + 1
  const newHotel: Hotel = { ...hotel, id: newId }
  
  hotels.push(newHotel)
  await saveHotelsData(hotels)
  return newHotel
}

