import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

const CONTACT_JSON_FILE = join(process.cwd(), 'data', 'contact-data.json')

export interface ContactInfo {
  phone: string
  email: string
  whatsapp: string
  address: string
  workingHours: string
}

const defaultContact: ContactInfo = {
  phone: '+90 XXX XXX XX XX',
  email: 'info@mb-tourism.com',
  whatsapp: '+90 XXX XXX XX XX',
  address: 'إسطنبول، تركيا',
  workingHours: 'يومياً من 9 صباحاً حتى 9 مساءً',
}

export async function getContactData(): Promise<ContactInfo> {
  try {
    const fileContent = await readFile(CONTACT_JSON_FILE, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    return defaultContact
  }
}

export async function saveContactData(contact: ContactInfo): Promise<void> {
  await writeFile(CONTACT_JSON_FILE, JSON.stringify(contact, null, 2), 'utf-8')
}

