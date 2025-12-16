import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { translations as defaultTranslations } from '@/contexts/LanguageContext'
import type { Language } from '@/contexts/LanguageContext'

const TEXTS_JSON_FILE = join(process.cwd(), 'data', 'texts-data.json')

export async function getTextsData(): Promise<Record<Language, Record<string, string>>> {
  try {
    const fileContent = await readFile(TEXTS_JSON_FILE, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    return defaultTranslations
  }
}

export async function saveTextsData(texts: Record<Language, Record<string, string>>): Promise<void> {
  await writeFile(TEXTS_JSON_FILE, JSON.stringify(texts, null, 2), 'utf-8')
}

