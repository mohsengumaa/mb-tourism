import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

const MEDIA_JSON_FILE = join(process.cwd(), 'data', 'media-data.json')

export interface MediaData {
  logo: string
  homeVideo: {
    url: string
    thumbnail: string
  }
}

const defaultMedia: MediaData = {
  logo: '',
  homeVideo: {
    url: '',
    thumbnail: '',
  },
}

export async function getMediaData(): Promise<MediaData> {
  try {
    const fileContent = await readFile(MEDIA_JSON_FILE, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    return defaultMedia
  }
}

export async function saveMediaData(media: MediaData): Promise<void> {
  await writeFile(MEDIA_JSON_FILE, JSON.stringify(media, null, 2), 'utf-8')
}

