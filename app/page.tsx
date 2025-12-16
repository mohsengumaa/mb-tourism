'use client'

import { useMemo, useEffect, useState } from 'react'
import Header from '@/components/Header'
import HeroSlider from '@/components/HeroSlider'
import HotelCard from '@/components/HotelCard'
import { useHotels } from '@/lib/hooks/useHotels'
import { useContent } from '@/lib/hooks/useContent'
import { useContact } from '@/lib/hooks/useContact'
import StructuredData from '@/components/StructuredData'

export default function Home() {
  const { hotels, loading: hotelsLoading } = useHotels()
  const { content, loading: contentLoading } = useContent()
  const { contact, loading: contactLoading } = useContact()
  const [videoData, setVideoData] = useState<{ url: string; thumbnail: string } | null>(null)

  useEffect(() => {
    fetch('/api/admin/media')
      .then(res => res.json())
      .then(result => {
        if (result.success && result.data?.homeVideo) {
          setVideoData(result.data.homeVideo)
        }
      })
      .catch(() => {})
  }, [])

  // Get top selling hotels
  const topHotels = useMemo(() => {
    // If bestSellingHotels is defined and has items, use those
    const bestSellingIds = (content as any).bestSellingHotels as number[] | undefined
    if (bestSellingIds && bestSellingIds.length > 0) {
      const selectedHotels = hotels.filter(hotel => 
        bestSellingIds.includes(hotel.id)
      )
      // Maintain the order from bestSellingHotels array
      return bestSellingIds
        .map((id: number) => selectedHotels.find((h: typeof hotels[0]) => h.id === id))
        .filter((h): h is typeof hotels[0] => h !== undefined)
    }
    // Otherwise, use bookings sorting (default behavior)
    return hotels
      .sort((a, b) => (b.bookings || 0) - (a.bookings || 0))
      .slice(0, 6)
  }, [hotels, content])

  return (
    <div className="min-h-screen relative z-10">
      <StructuredData type="website" />
      <Header />
        
      {/* Hero Slider */}
      <HeroSlider />

      {/* Best Selling Hotels */}
      <section className="py-16 relative">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 ai-text-gradient">
              {contentLoading ? 'الفنادق الأكثر مبيعاً' : content.bestSellingTitle}
            </h2>
            <p className="text-[#a5b4fc] max-w-2xl mx-auto">
              {contentLoading ? 'اكتشف أفضل الفنادق في إسطنبول' : content.bestSellingSubtitle}
            </p>
          </div>
          {hotelsLoading ? (
            <div className="text-center py-12">
              <p className="text-[#a5b4fc]">جاري التحميل...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topHotels.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 relative">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center ai-card rounded-2xl p-12">
            <h2 className="text-4xl font-bold mb-6 ai-text-gradient">
              {contentLoading ? 'من نحن' : content.aboutTitle}
            </h2>
            {contentLoading ? (
              <>
                <p className="text-lg text-[#e0e7ff] leading-relaxed mb-6">
                  MB Tourism هي شركة متخصصة في حجز الفنادق في تركيا وخاصة في إسطنبول. 
                  نحن نقدم خدمات متميزة لعملائنا مع ضمان أفضل الأسعار والخدمات.
                </p>
                <p className="text-lg text-[#e0e7ff] leading-relaxed">
                  مؤسس الشركة، محمد بلال، لديه خبرة طويلة في مجال السياحة والفنادق في تركيا، 
                  ونحن نهدف إلى توفير تجربة سياحية ممتازة لجميع عملائنا من خلال خدماتنا المتنوعة 
                  بما في ذلك حجز الفنادق وخدمات التوصيل للمطار.
                </p>
              </>
            ) : (
              <>
                <p className="text-lg text-[#e0e7ff] leading-relaxed mb-6">
                  {content.aboutText1}
                </p>
                <p className="text-lg text-[#e0e7ff] leading-relaxed">
                  {content.aboutText2}
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Contact & Video Section */}
      <section className="py-16 relative">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="ai-card rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6 ai-text-gradient">معلومات التواصل</h2>
              {contactLoading ? (
                <div className="space-y-4 text-lg text-[#e0e7ff]">
                  <p className="flex items-center gap-3">
                    <span className="text-[var(--color-ai-blue)]">📞</span>
                    <strong className="text-[var(--color-ai-cyan)]">الهاتف:</strong> +90 XXX XXX XX XX
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-[var(--color-ai-blue)]">✉️</span>
                    <strong className="text-[var(--color-ai-cyan)]">البريد الإلكتروني:</strong> info@mb-tourism.com
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-[var(--color-ai-blue)]">📍</span>
                    <strong className="text-[var(--color-ai-cyan)]">العنوان:</strong> إسطنبول، تركيا
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-[var(--color-ai-blue)]">🕐</span>
                    <strong className="text-[var(--color-ai-cyan)]">ساعات العمل:</strong> يومياً من 9 صباحاً حتى 9 مساءً
                  </p>
                </div>
              ) : (
                <div className="space-y-4 text-lg text-[#e0e7ff]">
                  <p className="flex items-center gap-3">
                    <span className="text-[var(--color-ai-blue)]">📞</span>
                    <strong className="text-[var(--color-ai-cyan)]">الهاتف:</strong> {contact.phone}
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-[var(--color-ai-blue)]">✉️</span>
                    <strong className="text-[var(--color-ai-cyan)]">البريد الإلكتروني:</strong> {contact.email}
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-[var(--color-ai-blue)]">📍</span>
                    <strong className="text-[var(--color-ai-cyan)]">العنوان:</strong> {contact.address}
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-[var(--color-ai-blue)]">🕐</span>
                    <strong className="text-[var(--color-ai-cyan)]">ساعات العمل:</strong> {contact.workingHours}
                  </p>
                </div>
              )}
            </div>

            {/* Video */}
            <div className="ai-card rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6 ai-text-gradient">عن الشركة</h2>
              {contentLoading || !content.heroSlides?.[0] ? (
                <div className="aspect-video bg-gradient-to-br from-[rgba(175,132,185,0.1)] to-[rgba(128,68,140,0.1)] rounded-lg flex items-center justify-center border border-[rgba(175,132,185,0.2)]">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-ai-purple)] opacity-20 flex items-center justify-center">
                      <span className="text-2xl">▶</span>
                    </div>
                    <p className="text-[#a5b4fc]">فيديو عن الشركة</p>
                  </div>
                </div>
              ) : (
                <div className="aspect-video rounded-lg overflow-hidden">
                  {videoData?.url ? (
                    <iframe
                      src={videoData.url}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[rgba(175,132,185,0.1)] to-[rgba(128,68,140,0.1)] flex items-center justify-center border border-[rgba(175,132,185,0.2)]">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-ai-purple)] opacity-20 flex items-center justify-center">
                          <span className="text-2xl">▶</span>
                        </div>
                        <p className="text-[#a5b4fc]">فيديو عن الشركة</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[rgba(42,42,40,0.8)] border-t border-[rgba(175,132,185,0.2)] py-8 relative">
        <div className="container-custom text-center">
          <p className="text-[#a5b4fc]">&copy; 2024 MB Tourism. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  )
}
