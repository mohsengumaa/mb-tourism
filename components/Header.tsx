'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { FiGlobe } from 'react-icons/fi'

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage()
  const isRTL = language === 'ar'
  const [logo, setLogo] = useState<string>('')

  useEffect(() => {
    fetch('/api/admin/media')
      .then(res => res.json())
      .then(result => {
        if (result.success && result.data?.logo) {
          setLogo(result.data.logo)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-[rgba(42,42,40,0.8)] backdrop-blur-xl border-b border-[rgba(175,132,185,0.2)] shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            {logo ? (
              <Image
                src={logo}
                alt="MB Tourism Logo"
                width={50}
                height={50}
                className="object-contain"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[var(--color-ai-blue)] animate-pulse ai-glow flex items-center justify-center">
                <span className="text-white text-xs font-bold">MB</span>
              </div>
            )}
            <span className="text-2xl font-bold ai-text-gradient">
              MB Tourism
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
            <Link href="/" className="text-[#e0e7ff] hover:text-[var(--color-ai-blue)] transition-all duration-300 relative group">
              {t('home')}
              <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[var(--color-ai-blue)] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/hotels" className="text-[#e0e7ff] hover:text-[var(--color-ai-blue)] transition-all duration-300 relative group">
              {t('hotels')}
              <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[var(--color-ai-blue)] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/about" className="text-[#e0e7ff] hover:text-[var(--color-ai-blue)] transition-all duration-300 relative group">
              {t('about')}
              <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[var(--color-ai-blue)] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/airport-transfer" className="text-[#e0e7ff] hover:text-[var(--color-ai-blue)] transition-all duration-300 relative group">
              {t('airport')}
              <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[var(--color-ai-blue)] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/contact" className="text-[#e0e7ff] hover:text-[var(--color-ai-blue)] transition-all duration-300 relative group">
              {t('contact')}
              <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[var(--color-ai-blue)] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg border border-[rgba(175,132,185,0.3)] bg-[rgba(175,132,185,0.1)] hover:bg-[rgba(175,132,185,0.2)] hover:border-[rgba(175,132,185,0.5)] transition-all duration-300 text-[var(--color-ai-blue)]"
          >
            <FiGlobe className="w-5 h-5" />
            <span className="text-sm font-medium">{language.toUpperCase()}</span>
          </button>
        </div>
      </div>
    </header>
  )
}








