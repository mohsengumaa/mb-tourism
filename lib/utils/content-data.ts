import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

const CONTENT_JSON_FILE = join(process.cwd(), 'data', 'content-data.json')

export interface HomeContent {
  heroSlides: Array<{ id: number; title: string; image: string }>
  aboutTitle: string
  aboutText1: string
  aboutText2: string
  bestSellingTitle: string
  bestSellingSubtitle: string
  bestSellingHotels: number[] // IDs of hotels to display in best selling section
  homeVideo?: {
    url: string
    thumbnail: string
  }
}

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
  bestSellingHotels: [], // Empty by default, will use bookings sorting if empty
}

export async function getContentData(): Promise<HomeContent> {
  try {
    const fileContent = await readFile(CONTENT_JSON_FILE, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    return defaultContent
  }
}

export async function saveContentData(content: HomeContent): Promise<void> {
  await writeFile(CONTENT_JSON_FILE, JSON.stringify(content, null, 2), 'utf-8')
}

