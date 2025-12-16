import { useState, useEffect } from 'react'
import type { HomeContent } from '@/lib/utils/content-data'

const defaultContent: HomeContent = {
  heroSlides: [
    { id: 1, title: 'استمتع بإقامة رائعة في إسطنبول', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200' },
    { id: 2, title: 'أفضل الفنادق بأفضل الأسعار', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73e8e?w=1200' },
    { id: 3, title: 'خدمات التوصيل للمطار', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200' },
  ],
  aboutTitle: 'من نحن',
  aboutText1: 'MB Tourism هي شركة متخصصة في حجز الفنادق في تركيا وخاصة في إسطنبول. نحن نقدم خدمات متميزة لعملائنا مع ضمان أفضل الأسعار والخدمات.',
  aboutText2: 'مؤسس الشركة، محمد بلال، لديه خبرة طويلة في مجال السياحة والفنادق في تركيا، ونحن نهدف إلى توفير تجربة سياحية ممتازة لجميع عملائنا من خلال خدماتنا المتنوعة بما في ذلك حجز الفنادق وخدمات التوصيل للمطار.',
  bestSellingTitle: 'الفنادق الأكثر مبيعاً',
  bestSellingSubtitle: 'اكتشف أفضل الفنادق في إسطنبول',
  bestSellingHotels: [],
}

export function useContent() {
  const [content, setContent] = useState<HomeContent>(defaultContent)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/content')
      .then(res => res.json())
      .then(result => {
        if (result.success && result.data) {
          setContent(result.data)
        }
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  return { content, loading }
}

