'use client'

import { useEffect } from 'react'
import type { Hotel } from '@/data/hotels'

interface StructuredDataProps {
  hotel?: Hotel
  type?: 'hotel' | 'organization' | 'website'
}

export default function StructuredData({ hotel, type = 'website' }: StructuredDataProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    let structuredData: any = {}

    if (type === 'hotel' && hotel) {
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Hotel',
        name: hotel.name,
        nameEn: hotel.nameEn,
        description: hotel.description,
        image: hotel.images || [hotel.image],
        address: {
          '@type': 'PostalAddress',
          addressLocality: hotel.location,
          addressCountry: 'TR',
        },
        starRating: {
          '@type': 'Rating',
          ratingValue: hotel.stars,
        },
        priceRange: '$$$',
        amenityFeature: hotel.amenities.map(amenity => ({
          '@type': 'LocationFeatureSpecification',
          name: amenity,
        })),
        offers: {
          '@type': 'Offer',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
        },
      }
    } else if (type === 'organization') {
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'TravelAgency',
        name: 'MB Tourism',
        description: 'شركة متخصصة في حجز الفنادق في تركيا وخاصة في إسطنبول',
        url: 'https://www.mbtourism.com',
        logo: 'https://www.mbtourism.com/logo.png',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          availableLanguage: ['Arabic', 'English', 'Turkish'],
        },
        areaServed: {
          '@type': 'Country',
          name: 'Turkey',
        },
      }
    } else {
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'MB Tourism',
        url: 'https://www.mbtourism.com',
        description: 'احجز فندقك في إسطنبول مع MB Tourism - أفضل الفنادق الفاخرة في تركيا',
        inLanguage: ['ar', 'en'],
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://www.mbtourism.com/hotels?search={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      }
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'structured-data'
    script.text = JSON.stringify(structuredData)
    
    // Remove existing structured data if any
    const existing = document.getElementById('structured-data')
    if (existing) {
      existing.remove()
    }
    
    document.head.appendChild(script)

    return () => {
      const scriptToRemove = document.getElementById('structured-data')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [hotel, type])

  return null
}

