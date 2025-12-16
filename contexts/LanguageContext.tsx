'use client'

import React, { createContext, useState, useContext } from 'react'

export type Language = 'ar' | 'en'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const translations: Record<Language, Record<string, string>> = {
  ar: {
    home: 'رئيسية',
    hotels: 'الفنادق',
    about: 'من نحن',
    airport: 'التوصيل للمطار',
    contact: 'تواصل معنا',
    bestSelling: 'الأكثر مبيعاً',
    viewDetails: 'عرض التفاصيل',
    bookNow: 'احجز الآن',
    filter: 'فلتر',
    price: 'السعر',
    stars: 'نجوم',
    room: 'غرفة',
    bookingPrice: 'السعر على Booking',
    selectRoom: 'اختر الغرفة',
    features: 'المميزات',
    location: 'الموقع',
    amenities: 'المرافق',
    description: 'الوصف',
    from: 'من',
    perNight: 'ليلة',
    airportTransfer: 'خدمات التوصيل للمطار',
    aboutUs: 'من نحن',
    contactUs: 'تواصل معنا',
  },
  en: {
    home: 'Home',
    hotels: 'Hotels',
    about: 'About Us',
    airport: 'Airport Transfer',
    contact: 'Contact Us',
    bestSelling: 'Best Selling',
    viewDetails: 'View Details',
    bookNow: 'Book Now',
    filter: 'Filter',
    price: 'Price',
    stars: 'Stars',
    room: 'Room',
    bookingPrice: 'Price on Booking',
    selectRoom: 'Select Room',
    features: 'Features',
    location: 'Location',
    amenities: 'Amenities',
    description: 'Description',
    from: 'From',
    perNight: 'night',
    airportTransfer: 'Airport Transfer Services',
    aboutUs: 'About Us',
    contactUs: 'Contact Us',
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar')

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar')
  }

  const t = (key: string) => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}








