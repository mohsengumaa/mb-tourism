'use client'

import Header from '@/components/Header'

export default function AirportTransferPage() {
  return (
    <div className="min-h-screen relative z-10">
      <Header />
        
      <div className="container-custom py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center ai-text-gradient">
          خدمات التوصيل للمطار
        </h1>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="ai-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 ai-text-gradient">خدماتنا</h2>
            <p className="text-lg text-[#e0e7ff] leading-relaxed mb-6">
              نقدم خدمات التوصيل من وإلى مطارات إسطنبول (مطار إسطنبول الدولي - IST ومطار صبيحة غوكشن - SAW) 
              مع أسطول حديث من السيارات والمركبات الفاخرة.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="ai-card rounded-xl p-6 border-[rgba(175,132,185,0.2)]">
                <h3 className="text-xl font-bold mb-3 ai-text-gradient">سيارة خاصة (4 أشخاص)</h3>
                <p className="text-[#a5b4fc] mb-4">سيارة مريحة مناسبة للأفراد والعائلات الصغيرة</p>
                <p className="text-2xl font-bold text-[var(--color-ai-blue)]">500 ₺</p>
              </div>

              <div className="ai-card rounded-xl p-6 border-[rgba(175,132,185,0.2)]">
                <h3 className="text-xl font-bold mb-3 ai-text-gradient">فان (8 أشخاص)</h3>
                <p className="text-[#a5b4fc] mb-4">مركبة واسعة مناسبة للعائلات الكبيرة</p>
                <p className="text-2xl font-bold text-[var(--color-ai-blue)]">800 ₺</p>
              </div>

              <div className="ai-card rounded-xl p-6 border-[rgba(175,132,185,0.2)]">
                <h3 className="text-xl font-bold mb-3 ai-text-gradient">سيارة فاخرة</h3>
                <p className="text-[#a5b4fc] mb-4">سيارة فاخرة مع سائق محترف</p>
                <p className="text-2xl font-bold text-[var(--color-ai-blue)]">1200 ₺</p>
              </div>

              <div className="ai-card rounded-xl p-6 border-[rgba(175,132,185,0.2)]">
                <h3 className="text-xl font-bold mb-3 ai-text-gradient">باص (16 شخص)</h3>
                <p className="text-[#a5b4fc] mb-4">باص كبير للمجموعات السياحية</p>
                <p className="text-2xl font-bold text-[var(--color-ai-blue)]">1500 ₺</p>
              </div>
            </div>
          </div>

          <div className="ai-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 ai-text-gradient">المميزات</h2>
            <ul className="space-y-3 text-lg text-[#e0e7ff]">
              <li className="flex items-start">
                <span className="text-[var(--color-ai-blue)] mr-2">✓</span>
                <span>سائقون محترفون ومجربون</span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--color-ai-blue)] mr-2">✓</span>
                <span>مركبات حديثة ونظيفة</span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--color-ai-blue)] mr-2">✓</span>
                <span>خدمة 24/7 على مدار الساعة</span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--color-ai-blue)] mr-2">✓</span>
                <span>أسعار ثابتة وشفافة</span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--color-ai-blue)] mr-2">✓</span>
                <span>تتبع الرحلة في الوقت الفعلي</span>
              </li>
            </ul>
          </div>

          <div className="ai-card rounded-2xl p-8 bg-gradient-to-br from-[rgba(175,132,185,0.2)] to-[rgba(128,68,140,0.2)] border-[rgba(175,132,185,0.3)]">
            <h2 className="text-2xl font-bold mb-4 ai-text-gradient">للحجز والاستفسار</h2>
            <p className="text-lg mb-4 text-[#e0e7ff]">اتصل بنا على: <span className="text-[var(--color-ai-blue)]">+90 XXX XXX XX XX</span></p>
            <p className="text-lg text-[#e0e7ff]">أو أرسل بريد إلكتروني إلى: <span className="text-[var(--color-ai-blue)]">info@mb-tourism.com</span></p>
          </div>
        </div>
      </div>

      <footer className="bg-[rgba(42,42,40,0.8)] border-t border-[rgba(175,132,185,0.2)] py-8 mt-16 relative">
        <div className="container-custom text-center">
          <p className="text-[#a5b4fc]">&copy; 2024 MB Tourism. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  )
}

