'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FiStar } from 'react-icons/fi'
import { useLanguage } from '@/contexts/LanguageContext'

interface Hotel {
  id: number
  name: string
  nameEn: string
  image: string
  stars: number
  description: string
  descriptionEn: string
  price: number
  bookingPrice: number
  location: string
  locationEn: string
  bookings?: number
}

interface HotelCardProps {
  hotel: Hotel
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const { language, t } = useLanguage()
  const isRTL = language === 'ar'

  return (
    <Link href={`/hotels/${hotel.id}`} className="block">
      <div className="ai-card rounded-2xl overflow-hidden ai-border-glow group cursor-pointer hover:scale-[1.02] transition-transform">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={hotel.image}
            alt={isRTL ? hotel.name : hotel.nameEn}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(42,42,40,0.9)] via-transparent to-transparent"></div>
          <div className="absolute bottom-4 right-4 flex items-center gap-1">
            {Array.from({ length: hotel.stars }).map((_, i) => (
              <FiStar key={i} className="w-4 h-4 text-[var(--color-ai-accent)] fill-[var(--color-ai-accent)]" />
            ))}
          </div>
        </div>
        <div className="p-6 bg-[rgba(42,42,40,0.8)]">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--color-ai-blue)] transition-colors">
            {isRTL ? hotel.name : hotel.nameEn}
          </h3>
          <p className="text-[#a5b4fc] mb-4 line-clamp-2 text-sm">
            {isRTL ? hotel.description : hotel.descriptionEn}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-[rgba(175,132,185,0.2)]">
            <div className="text-left">
              <p className="text-sm text-[#a5b4fc] font-semibold">
                Booking
              </p>
              <p className="text-xs text-[var(--color-ai-accent)] font-semibold mt-1">
                {language === 'ar' ? 'خصم 10%' : '10% OFF'}
              </p>
            </div>
            <div className="ai-button px-6 py-2 rounded-lg text-sm font-semibold inline-block text-center">
              {t('viewDetails')}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}








