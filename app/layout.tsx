import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans_Arabic, Inter } from 'next/font/google'
import LanguageProviderWrapper from '@/components/LanguageProviderWrapper'

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mbtourism.com'), // استبدل بالرابط الفعلي
  title: {
    default: 'MB Tourism - حجز الفنادق في إسطنبول | أفضل الأسعار والخدمات',
    template: '%s | MB Tourism'
  },
  description: 'احجز فندقك في إسطنبول مع MB Tourism - أفضل الفنادق الفاخرة في تركيا مع خصم 10% وأفضل الأسعار. خدمات التوصيل للمطار وحجز الفنادق في إسطنبول وبودروم وطرابزون.',
  keywords: [
    'حجز فنادق إسطنبول',
    'فنادق إسطنبول',
    'حجز فندق تركيا',
    'فنادق فاخرة إسطنبول',
    'خدمات التوصيل للمطار إسطنبول',
    'فنادق 5 نجوم إسطنبول',
    'حجز فندق بأسعار منخفضة',
    'MB Tourism',
    'سياحة تركيا',
    'فنادق بودروم',
    'فنادق طرابزون',
    'حجز فندق أونلاين'
  ],
  authors: [{ name: 'MB Tourism' }],
  creator: 'MB Tourism',
  publisher: 'MB Tourism',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://www.mbtourism.com',
    siteName: 'MB Tourism',
    title: 'MB Tourism - حجز الفنادق في إسطنبول | أفضل الأسعار والخدمات',
    description: 'احجز فندقك في إسطنبول مع MB Tourism - أفضل الفنادق الفاخرة في تركيا مع خصم 10% وأفضل الأسعار.',
    images: [
      {
        url: '/og-image.jpg', // أضف صورة Open Graph
        width: 1200,
        height: 630,
        alt: 'MB Tourism - حجز الفنادق في إسطنبول',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MB Tourism - حجز الفنادق في إسطنبول',
    description: 'احجز فندقك في إسطنبول مع MB Tourism - أفضل الفنادق الفاخرة في تركيا',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // أضف كود التحقق من Google Search Console
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: 'https://www.mbtourism.com',
    languages: {
      'ar': 'https://www.mbtourism.com',
      'en': 'https://www.mbtourism.com',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${notoSansArabic.variable} ${inter.variable} font-sans`}>
        <LanguageProviderWrapper>
          {children}
        </LanguageProviderWrapper>
      </body>
    </html>
  )
}

