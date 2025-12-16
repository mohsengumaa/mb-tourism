'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/Header'
import HotelCard from '@/components/HotelCard'
import { useHotels } from '@/lib/hooks/useHotels'
import { useLanguage } from '@/contexts/LanguageContext'

export default function HotelsPage() {
  const { language, t } = useLanguage()
  const { hotels, loading } = useHotels()
  const [selectedStars, setSelectedStars] = useState<number[]>([])
  const [selectedLocation, setSelectedLocation] = useState<string>('all')

  const locations = useMemo(() => {
    const locs = new Set(hotels.map(h => language === 'ar' ? h.location : h.locationEn))
    return Array.from(locs)
  }, [hotels, language])

  const filteredHotels = useMemo(() => {
    return hotels.filter(hotel => {
      // Filter by stars
      if (selectedStars.length > 0 && !selectedStars.includes(hotel.stars)) {
        return false
      }

      // Filter by location
      if (selectedLocation !== 'all') {
        const hotelLocation = language === 'ar' ? hotel.location : hotel.locationEn
        if (hotelLocation !== selectedLocation) {
          return false
        }
      }

      return true
    })
  }, [selectedStars, selectedLocation, language])

  const toggleStar = (star: number) => {
    setSelectedStars(prev =>
      prev.includes(star) ? prev.filter(s => s !== star) : [...prev, star]
    )
  }

  return (
    <div className="min-h-screen relative z-10">
      <Header />

      <div className="container-custom py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 ai-text-gradient">
            {t('hotels')}
          </h1>
        </div>

        {/* Filter Section */}
        <div className="ai-card rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 ai-text-gradient">{t('filter')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stars Filter */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-[var(--color-ai-cyan)]">
                {t('stars')}
              </label>
              <div className="flex flex-wrap gap-3">
                {[5, 4, 3, 2, 1].map(star => (
                  <button
                    key={star}
                    onClick={() => toggleStar(star)}
                    className={`px-4 py-2 rounded-lg border-2 transition ${
                      selectedStars.includes(star)
                        ? 'border-[var(--color-ai-blue)] bg-[rgba(175,132,185,0.2)] text-[var(--color-ai-blue)] ai-glow'
                        : 'border-[rgba(175,132,185,0.3)] text-[#e0e7ff] hover:border-[var(--color-ai-blue)]'
                    }`}
                  >
                    {star} ⭐
                  </button>
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-[var(--color-ai-cyan)]">
                {t('location')}
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2 bg-[rgba(175,132,185,0.1)] border border-[rgba(175,132,185,0.3)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-ai-blue)] text-[#e0e7ff] focus:bg-[rgba(175,132,185,0.15)] transition-all"
              >
                <option value="all" className="bg-[#2a2a28]">{language === 'ar' ? 'الكل' : 'All'}</option>
                {locations.map(loc => (
                  <option key={loc} value={loc} className="bg-[#2a2a28]">{loc}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Reset Filters */}
          <button
            onClick={() => {
              setSelectedStars([])
              setSelectedLocation('all')
            }}
            className="mt-4 px-6 py-2 bg-[rgba(128,68,140,0.2)] text-[var(--color-ai-purple)] border border-[rgba(128,68,140,0.3)] rounded-lg hover:bg-[rgba(128,68,140,0.3)] transition"
          >
            {language === 'ar' ? 'إعادة تعيين الفلتر' : 'Reset Filters'}
          </button>
        </div>

        {/* Hotels Grid */}
        <div className="mb-4">
          <p className="text-[#a5b4fc]">
            {language === 'ar' ? 'عدد النتائج: ' : 'Results: '}
            <span className="font-bold text-[var(--color-ai-blue)]">{filteredHotels.length}</span>
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl text-[#a5b4fc]">جاري التحميل...</p>
          </div>
        ) : filteredHotels.length === 0 ? (
          <div className="text-center py-12 ai-card rounded-2xl">
            <p className="text-xl text-[#a5b4fc]">
              {language === 'ar' ? 'لم يتم العثور على فنادق' : 'No hotels found'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHotels.map(hotel => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
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

