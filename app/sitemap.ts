import { MetadataRoute } from 'next'
import { hotels } from '@/data/hotels'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.mbtourism.com' // استبدل هذا بالرابط الفعلي لموقعك
  
  // الصفحات الثابتة
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/hotels`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/airport-transfer`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  // صفحات الفنادق
  const hotelPages = hotels.map((hotel) => ({
    url: `${baseUrl}/hotels/${hotel.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...hotelPages]
}

