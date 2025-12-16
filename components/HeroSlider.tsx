'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Image from 'next/image'
import { useContent } from '@/lib/hooks/useContent'

const defaultSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
    title: 'استمتع بإقامة رائعة في إسطنبول',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73e8e?w=1200',
    title: 'أفضل الفنادق بأفضل الأسعار',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
    title: 'خدمات التوصيل للمطار',
  },
]

export default function HeroSlider() {
  const { content, loading } = useContent()
  const slides = loading ? defaultSlides : content.heroSlides
  return (
    <>
      <section className="relative h-[500px] md:h-[600px]">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="h-full"
        >
          {slides.map(slide => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority
                />
              <div className="absolute inset-0 bg-gradient-to-b from-[rgba(42,42,40,0.7)] via-[rgba(42,42,40,0.5)] to-[rgba(42,42,40,0.8)] flex items-center justify-center">
                <div className="text-center px-4">
                  <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4 drop-shadow-2xl">
                    {slide.title}
                  </h1>
                </div>
              </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Filter Bar - Sticky */}
      <div className="sticky top-[73px] z-40 bg-[rgba(42,42,40,0.95)] backdrop-blur-xl border-b border-[rgba(175,132,185,0.3)] shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-6">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="date"
              className="px-4 py-3 bg-[rgba(175,132,185,0.1)] border border-[rgba(175,132,185,0.3)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-ai-blue)] text-white placeholder:text-[#a5b4fc] focus:bg-[rgba(175,132,185,0.15)] transition-all"
              placeholder="تاريخ الوصول"
            />
            <input
              type="date"
              className="px-4 py-3 bg-[rgba(175,132,185,0.1)] border border-[rgba(175,132,185,0.3)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-ai-blue)] text-white placeholder:text-[#a5b4fc] focus:bg-[rgba(175,132,185,0.15)] transition-all"
              placeholder="تاريخ المغادرة"
            />
            <select className="px-4 py-3 bg-[rgba(175,132,185,0.1)] border border-[rgba(175,132,185,0.3)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-ai-blue)] text-white focus:bg-[rgba(175,132,185,0.15)] transition-all">
              <option className="bg-[#2a2a28]">عدد الضيوف</option>
              <option className="bg-[#2a2a28]">1</option>
              <option className="bg-[#2a2a28]">2</option>
              <option className="bg-[#2a2a28]">3</option>
              <option className="bg-[#2a2a28]">4+</option>
            </select>
            <button className="ai-button px-6 py-3 rounded-lg font-semibold text-sm">
              🔍 بحث
            </button>
          </div>
        </div>
      </div>
    </>
  )
}








