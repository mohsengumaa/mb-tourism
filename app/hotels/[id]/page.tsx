'use client'

import { useParams } from 'next/navigation'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import Header from '@/components/Header'
import StructuredData from '@/components/StructuredData'
import { useHotels } from '@/lib/hooks/useHotels'
import type { Room } from '@/data/hotels'
import { FiStar, FiMapPin, FiCheck } from 'react-icons/fi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

export default function HotelDetailsPage() {
  const params = useParams()
  const { language, t } = useLanguage()
  const { hotels, loading } = useHotels()
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null)
  const [bookingForm, setBookingForm] = useState({
    selectedRooms: [] as number[],
    adults: 1,
    children: 0,
    childrenAges: [] as number[],
    budget: '',
    currency: 'TRY',
    checkIn: '',
    checkOut: '',
  })

  const hotel = useMemo(() => {
    return hotels.find(h => h.id === Number(params.id))
  }, [hotels, params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="ai-card rounded-2xl p-8">
          <p className="text-xl text-[#a5b4fc]">{language === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
        </div>
      </div>
    )
  }

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="ai-card rounded-2xl p-8">
          <p className="text-xl text-[#a5b4fc]">{language === 'ar' ? 'الفندق غير موجود' : 'Hotel not found'}</p>
        </div>
      </div>
    )
  }

  const isRTL = language === 'ar'

  // Function to send booking form to WhatsApp
  const sendToWhatsApp = () => {
    const selectedRoomsList = bookingForm.selectedRooms
      .map(roomId => {
        const room = hotel.rooms.find(r => r.id === roomId)
        return room ? (isRTL ? room.name : room.nameEn) : ''
      })
      .filter(Boolean)
      .join(', ')

    const childrenAgesList = bookingForm.childrenAges
      .map((age, index) => `${isRTL ? 'طفل' : 'Child'} ${index + 1}: ${age} ${isRTL ? 'سنة' : 'years'}`)
      .join('\n')

    const message = `${isRTL ? 'طلب حجز جديد' : 'New Booking Request'}\n\n` +
      `${isRTL ? 'الفندق:' : 'Hotel:'} ${isRTL ? hotel.name : hotel.nameEn}\n` +
      `${isRTL ? 'الغرف المطلوبة:' : 'Selected Rooms:'} ${selectedRoomsList || (isRTL ? 'لم يتم اختيار غرف' : 'No rooms selected')}\n` +
      `${isRTL ? 'تاريخ الدخول:' : 'Check In Date:'} ${bookingForm.checkIn || (isRTL ? 'غير محدد' : 'Not specified')}\n` +
      `${isRTL ? 'تاريخ الخروج:' : 'Check Out Date:'} ${bookingForm.checkOut || (isRTL ? 'غير محدد' : 'Not specified')}\n` +
      `${isRTL ? 'عدد البالغين:' : 'Number of Adults:'} ${bookingForm.adults}\n` +
      `${isRTL ? 'عدد الأطفال:' : 'Number of Children:'} ${bookingForm.children}\n` +
      (bookingForm.children > 0 && childrenAgesList ? `${isRTL ? 'أعمار الأطفال:' : 'Children Ages:'}\n${childrenAgesList}\n` : '') +
      `${isRTL ? 'الميزانية:' : 'Budget:'} ${bookingForm.budget || (isRTL ? 'غير محدد' : 'Not specified')} ${bookingForm.currency}\n`

    const whatsappUrl = `https://wa.me/905013545992?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen relative z-10">
      <StructuredData hotel={hotel} type="hotel" />
      <Header />

      <div className="container-custom py-8">
        {/* Hotel Header */}
        <div className="ai-card rounded-2xl p-6 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold ai-text-gradient mb-2">
                {isRTL ? hotel.name : hotel.nameEn}
              </h1>
              <div className="flex items-center gap-4 text-[#a5b4fc]">
                <div className="flex items-center">
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <FiStar key={i} className="w-5 h-5 text-[var(--color-ai-accent)] fill-[var(--color-ai-accent)]" />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <FiMapPin className="w-5 h-5 text-[var(--color-ai-blue)]" />
                  <span>{isRTL ? hotel.location : hotel.locationEn}</span>
                </div>
              </div>
            </div>
            <div className="text-left">
              <p className="text-sm text-[#a5b4fc] font-semibold">
                Booking
              </p>
              <p className="text-xs text-[var(--color-ai-accent)] font-semibold mt-1">
                {language === 'ar' ? 'خصم 10%' : '10% OFF'}
              </p>
            </div>
          </div>

          <p className="text-lg text-[#e0e7ff] leading-relaxed">
            {isRTL ? hotel.description : hotel.descriptionEn}
          </p>
        </div>

        {/* Hotel Images */}
        <div className="ai-card rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 ai-text-gradient">
            {language === 'ar' ? 'الصور' : 'Photos'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hotel.images.map((image, index) => (
              <div key={index} className="relative h-64 rounded-lg overflow-hidden ai-border-glow">
                <Image
                  src={image}
                  alt={`${hotel.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Hotel Features */}
        <div className="ai-card rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 ai-text-gradient">{t('amenities')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {hotel.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-2">
                <FiCheck className="w-5 h-5 text-[var(--color-ai-accent)]" />
                <span className="text-[#e0e7ff]">
                  {isRTL ? amenity : hotel.amenitiesEn[index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form & Rooms Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="ai-card rounded-2xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold ai-text-gradient mb-6">
                {language === 'ar' ? 'نموذج الحجز' : 'Booking Form'}
              </h2>
              
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault()
                // Validate form
                if (bookingForm.selectedRooms.length === 0) {
                  alert(language === 'ar' ? 'يرجى اختيار غرفة واحدة على الأقل' : 'Please select at least one room')
                  return
                }
                if (!bookingForm.checkIn || !bookingForm.checkOut) {
                  alert(language === 'ar' ? 'يرجى تحديد تاريخ الدخول والخروج' : 'Please select check-in and check-out dates')
                  return
                }
                // Send to WhatsApp
                sendToWhatsApp()
              }}>
                {/* Selected Rooms */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[var(--color-ai-cyan)]">
                    {language === 'ar' ? 'الغرف المطلوبة' : 'Selected Rooms'}
                  </label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {bookingForm.selectedRooms.length === 0 ? (
                      <p className="text-sm text-[#a5b4fc]">
                        {language === 'ar' ? 'لم يتم اختيار غرف' : 'No rooms selected'}
                      </p>
                    ) : (
                      bookingForm.selectedRooms.map(roomId => {
                        const room = hotel.rooms.find(r => r.id === roomId)
                        return room ? (
                          <div key={roomId} className="flex items-center justify-between bg-[rgba(175,132,185,0.1)] p-2 rounded-lg">
                            <span className="text-sm text-[#e0e7ff]">
                              {isRTL ? room.name : room.nameEn}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setBookingForm(prev => ({
                                  ...prev,
                                  selectedRooms: prev.selectedRooms.filter(id => id !== roomId),
                                  childrenAges: prev.childrenAges.slice(0, prev.children - 1),
                                }))
                              }}
                              className="text-[var(--color-ai-accent)] hover:text-red-400"
                            >
                              ✕
                            </button>
                          </div>
                        ) : null
                      })
                    )}
                  </div>
                </div>

                {/* Check In Date */}
                <div>
                  <label htmlFor="checkIn" className="block text-sm font-semibold mb-2 text-[var(--color-ai-cyan)]">
                    {language === 'ar' ? 'تاريخ الدخول' : 'Check In Date'}
                  </label>
                  <input
                    type="date"
                    id="checkIn"
                    value={bookingForm.checkIn}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, checkIn: e.target.value }))}
                    className="w-full px-4 py-3 bg-[rgba(175,132,185,0.1)] border border-[rgba(175,132,185,0.3)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-ai-blue)] text-white focus:bg-[rgba(175,132,185,0.15)] transition-all"
                    required
                  />
                </div>

                {/* Check Out Date */}
                <div>
                  <label htmlFor="checkOut" className="block text-sm font-semibold mb-2 text-[var(--color-ai-cyan)]">
                    {language === 'ar' ? 'تاريخ الخروج' : 'Check Out Date'}
                  </label>
                  <input
                    type="date"
                    id="checkOut"
                    value={bookingForm.checkOut}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, checkOut: e.target.value }))}
                    min={bookingForm.checkIn}
                    className="w-full px-4 py-3 bg-[rgba(175,132,185,0.1)] border border-[rgba(175,132,185,0.3)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-ai-blue)] text-white focus:bg-[rgba(175,132,185,0.15)] transition-all"
                    required
                  />
                </div>

                {/* Number of Adults */}
                <div>
                  <label htmlFor="adults" className="block text-sm font-semibold mb-2 text-[var(--color-ai-cyan)]">
                    {language === 'ar' ? 'عدد الزوار (البالغين)' : 'Number of Adults'}
                  </label>
                  <input
                    type="number"
                    id="adults"
                    min="1"
                    max="20"
                    value={bookingForm.adults}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, adults: parseInt(e.target.value) || 1 }))}
                    className="w-full px-4 py-3 bg-[rgba(175,132,185,0.1)] border border-[rgba(175,132,185,0.3)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-ai-blue)] text-white focus:bg-[rgba(175,132,185,0.15)] transition-all"
                    required
                  />
                </div>

                {/* Number of Children */}
                <div>
                  <label htmlFor="children" className="block text-sm font-semibold mb-2 text-[var(--color-ai-cyan)]">
                    {language === 'ar' ? 'عدد الأطفال' : 'Number of Children'}
                  </label>
                  <input
                    type="number"
                    id="children"
                    min="0"
                    max="10"
                    value={bookingForm.children}
                    onChange={(e) => {
                      const childrenCount = parseInt(e.target.value) || 0
                      setBookingForm(prev => ({
                        ...prev,
                        children: childrenCount,
                        childrenAges: Array(childrenCount).fill(0).map((_, i) => prev.childrenAges[i] || 0),
                      }))
                    }}
                    className="w-full px-4 py-3 bg-[rgba(175,132,185,0.1)] border border-[rgba(175,132,185,0.3)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-ai-blue)] text-white focus:bg-[rgba(175,132,185,0.15)] transition-all"
                  />
                </div>

                {/* Children Ages */}
                {bookingForm.children > 0 && (
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[var(--color-ai-cyan)]">
                      {language === 'ar' ? 'أعمار الأطفال' : 'Children Ages'}
                    </label>
                    <div className="space-y-2">
                      {Array.from({ length: bookingForm.children }).map((_, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-sm text-[#a5b4fc] w-20">
                            {language === 'ar' ? `طفل ${index + 1}` : `Child ${index + 1}`}
                          </span>
                          <input
                            type="number"
                            min="0"
                            max="17"
                            value={bookingForm.childrenAges[index] || 0}
                            onChange={(e) => {
                              const newAges = [...bookingForm.childrenAges]
                              newAges[index] = parseInt(e.target.value) || 0
                              setBookingForm(prev => ({ ...prev, childrenAges: newAges }))
                            }}
                            placeholder={language === 'ar' ? 'العمر' : 'Age'}
                            className="flex-1 px-3 py-2 bg-[rgba(175,132,185,0.1)] border border-[rgba(175,132,185,0.3)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-ai-blue)] text-white focus:bg-[rgba(175,132,185,0.15)] transition-all"
                          />
                          <span className="text-sm text-[#a5b4fc]">
                            {language === 'ar' ? 'سنة' : 'years'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Budget */}
                <div>
                  <label htmlFor="budget" className="block text-sm font-semibold mb-2 text-[var(--color-ai-cyan)]">
                    {language === 'ar' ? 'الميزانية' : 'Budget'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      id="budget"
                      min="0"
                      value={bookingForm.budget}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, budget: e.target.value }))}
                      placeholder={language === 'ar' ? 'المبلغ' : 'Amount'}
                      className="flex-1 px-4 py-3 bg-[rgba(175,132,185,0.1)] border border-[rgba(175,132,185,0.3)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-ai-blue)] text-white placeholder:text-[#a5b4fc] focus:bg-[rgba(175,132,185,0.15)] transition-all"
                    />
                    <select
                      value={bookingForm.currency}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, currency: e.target.value }))}
                      className="px-4 py-3 bg-[rgba(175,132,185,0.1)] border border-[rgba(175,132,185,0.3)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-ai-blue)] text-white focus:bg-[rgba(175,132,185,0.15)] transition-all"
                    >
                      <option value="TRY" className="bg-[#2a2a28]">₺ TRY</option>
                      <option value="USD" className="bg-[#2a2a28]">$ USD</option>
                      <option value="EUR" className="bg-[#2a2a28]">€ EUR</option>
                      <option value="GBP" className="bg-[#2a2a28]">£ GBP</option>
                      <option value="SAR" className="bg-[#2a2a28]">﷼ SAR</option>
                      <option value="AED" className="bg-[#2a2a28]">د.إ AED</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full ai-button px-6 py-3 rounded-lg font-semibold text-lg mt-6"
                >
                  {language === 'ar' ? 'إرسال طلب الحجز' : 'Submit Booking Request'}
                </button>
              </form>
            </div>
          </div>

          {/* Rooms Section */}
          <div className="lg:col-span-2">
            <div className="ai-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold ai-text-gradient">
                  {language === 'ar' ? 'الغرف والجناحات المتاحة' : 'Available Rooms & Suites'}
                </h2>
                <div className="text-sm text-[#a5b4fc]">
                  {language === 'ar' ? `${hotel.rooms.length} نوع متاح` : `${hotel.rooms.length} types available`}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {hotel.rooms.map(room => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    isSelected={bookingForm.selectedRooms.includes(room.id)}
                    onSelect={() => {
                      console.log('onSelect triggered for room:', room.id, 'Current selected:', bookingForm.selectedRooms)
                      if (bookingForm.selectedRooms.includes(room.id)) {
                        // إزالة الغرفة من النموذج
                        console.log('Removing room from booking')
                        setBookingForm(prev => {
                          const newRooms = prev.selectedRooms.filter(id => id !== room.id)
                          console.log('New rooms array:', newRooms)
                          return {
                            ...prev,
                            selectedRooms: newRooms,
                          }
                        })
                        if (selectedRoom === room.id) {
                          setSelectedRoom(null)
                        }
                      } else {
                        // إضافة الغرفة إلى النموذج
                        console.log('Adding room to booking')
                        setSelectedRoom(room.id)
                        setBookingForm(prev => {
                          const newRooms = [...prev.selectedRooms, room.id]
                          console.log('New rooms array:', newRooms)
                          return {
                            ...prev,
                            selectedRooms: newRooms,
                          }
                        })
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Booking Button */}
        {selectedRoom && (
          <div className="fixed bottom-0 left-0 right-0 bg-[rgba(42,42,40,0.95)] backdrop-blur-xl border-t border-[rgba(175,132,185,0.3)] shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-6 z-50">
            <div className="container-custom">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold ai-text-gradient">
                    {language === 'ar' ? 'الغرفة المختارة' : 'Selected Room'}
                  </p>
                  <p className="text-[#a5b4fc]">
                    {isRTL 
                      ? hotel.rooms.find(r => r.id === selectedRoom)?.name 
                      : hotel.rooms.find(r => r.id === selectedRoom)?.nameEn}
                  </p>
                </div>
                <button className="ai-button px-8 py-3 rounded-lg font-semibold text-lg">
                  {t('bookNow')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[rgba(42,42,40,0.8)] border-t border-[rgba(175,132,185,0.2)] py-8 mt-16 relative">
        <div className="container-custom text-center">
          <p className="text-[#a5b4fc]">&copy; 2024 MB Tourism. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  )
}

function RoomCard({ room, isSelected, onSelect }: { room: Room; isSelected: boolean; onSelect: () => void }) {
  const { language, t } = useLanguage()
  const isRTL = language === 'ar'

  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Button clicked, room ID:', room.id)
    onSelect()
  }

  return (
    <div className={`ai-card rounded-xl overflow-hidden transition ai-border-glow group hover:scale-[1.02] ${
      isSelected ? 'border-[rgba(175,132,185,0.5)] bg-[rgba(175,132,185,0.1)] ring-2 ring-[var(--color-ai-accent)]' : ''
    }`}>
      <div className="flex flex-col h-full">
        {/* Room Images Slider */}
        {room.images && room.images.length > 0 && (
          <div className="relative h-48 w-full overflow-hidden">
            {room.images.length > 1 ? (
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                loop
                className="h-full w-full room-swiper"
              >
                {room.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-full">
                      <Image
                        src={image}
                        alt={`${isRTL ? room.name : room.nameEn} - ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(42,42,40,0.9)] via-transparent to-transparent"></div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={room.images[0]}
                  alt={isRTL ? room.name : room.nameEn}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(42,42,40,0.9)] via-transparent to-transparent"></div>
              </div>
            )}
            {room.images.length > 1 && (
              <div className="absolute top-3 left-3 z-10 bg-[rgba(175,132,185,0.8)] backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                {room.images.length} {language === 'ar' ? 'صور' : 'photos'}
              </div>
            )}
          </div>
        )}
        
        <div className="p-6 flex flex-col flex-1">
          {/* Room Header */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--color-ai-blue)] transition-colors">
              {isRTL ? room.name : room.nameEn}
            </h3>
            <p className="text-[#a5b4fc] text-sm leading-relaxed">
              {isRTL ? room.description : room.descriptionEn}
            </p>
          </div>

        {/* Features */}
        <div className="mb-4 flex-1">
          <p className="text-sm text-[var(--color-ai-cyan)] mb-3 font-semibold">{t('features')}:</p>
          <div className="grid grid-cols-1 gap-2">
            {room.features.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <FiCheck className="w-4 h-4 text-[var(--color-ai-accent)] flex-shrink-0" />
                <span className="text-sm text-[#e0e7ff]">
                  {isRTL ? feature : room.featuresEn[index]}
                </span>
              </div>
            ))}
            {room.features.length > 4 && (
              <p className="text-xs text-[#a5b4fc] mt-1">
                +{room.features.length - 4} {language === 'ar' ? 'ميزة أخرى' : 'more features'}
              </p>
            )}
          </div>
        </div>

        {/* Guest Info */}
        <div className="mb-4 pb-4 border-b border-[rgba(175,132,185,0.2)]">
          <p className="text-sm text-[#a5b4fc]">
            {language === 'ar' ? 'عدد الضيوف: ' : 'Max Guests: '}
            <span className="font-semibold text-[var(--color-ai-blue)]">{room.maxGuests}</span>
            {language === 'ar' ? ' شخص' : ' guests'}
          </p>
        </div>

        {/* Discount Badge */}
        <div className="mb-4 text-left">
          <p className="text-sm text-[#a5b4fc] font-semibold">
            Booking
          </p>
          <p className="text-xs text-[var(--color-ai-accent)] font-semibold mt-1">
            {language === 'ar' ? 'خصم 10%' : '10% OFF'}
          </p>
        </div>

        {/* Select Button */}
        <div className="relative z-50">
          <button
            type="button"
            onClick={handleSelect}
            className={`w-full px-6 py-3 rounded-lg transition font-semibold cursor-pointer ${
              isSelected
                ? 'bg-[var(--color-ai-accent)] text-[#2a2a28] hover:opacity-90 shadow-lg shadow-[var(--color-ai-accent)]/50'
                : 'ai-button'
            }`}
          >
            {isSelected ? (language === 'ar' ? '✓ محدّد - إزالة' : '✓ Selected - Remove') : (language === 'ar' ? 'اختر الغرفة' : 'Select Room')}
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}
