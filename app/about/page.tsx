'use client'

import Header from '@/components/Header'

export default function AboutPage() {
  return (
    <div className="min-h-screen relative z-10">
      <Header />
        
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center ai-text-gradient">من نحن</h1>
          
          <div className="ai-card rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 ai-text-gradient">عن الشركة</h2>
            <p className="text-lg text-[#e0e7ff] leading-relaxed mb-4">
              MB Tourism هي شركة متخصصة في مجال السياحة وحجز الفنادق في تركيا، وتحديداً في مدينة إسطنبول الساحرة. 
              نحن نقدم خدمات شاملة لعملائنا مع التركيز على الجودة والموثوقية.
            </p>
            <p className="text-lg text-[#e0e7ff] leading-relaxed">
              تأسست الشركة بهدف توفير تجربة سياحية ممتازة للزوار من جميع أنحاء العالم، 
              مع ضمان أفضل الأسعار والخدمات المتميزة.
            </p>
          </div>

          <div className="ai-card rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 ai-text-gradient">عن صاحب الشركة</h2>
            <p className="text-lg text-[#e0e7ff] leading-relaxed mb-4">
              محمد بلال هو مؤسس ومالك شركة MB Tourism. لديه خبرة طويلة ومتراكمة في مجال السياحة والفنادق في تركيا، 
              حيث يعمل في هذا المجال منذ أكثر من 10 سنوات.
            </p>
            <p className="text-lg text-[#e0e7ff] leading-relaxed">
              بفضل خبرته الواسعة ومعرفته العميقة بأسواق الفنادق في إسطنبول، 
              استطاع أن يبني علاقات قوية مع أفضل الفنادق في المدينة ويوفر لعملائه أفضل الخدمات والأسعار.
            </p>
          </div>

          <div className="ai-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 ai-text-gradient">خدماتنا</h2>
            <ul className="space-y-3 text-lg text-[#e0e7ff]">
              <li className="flex items-start">
                <span className="text-[var(--color-ai-blue)] mr-2">✓</span>
                <span>حجز الفنادق في إسطنبول بأفضل الأسعار</span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--color-ai-blue)] mr-2">✓</span>
                <span>خدمات التوصيل من وإلى المطار</span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--color-ai-blue)] mr-2">✓</span>
                <span>استشارات سياحية مجانية</span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--color-ai-blue)] mr-2">✓</span>
                <span>دعم العملاء على مدار الساعة</span>
              </li>
            </ul>
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

