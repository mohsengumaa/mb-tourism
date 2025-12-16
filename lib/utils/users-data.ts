import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { createHash } from 'crypto'

// Simple hash function using Node.js crypto
function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex')
}

function comparePassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}

const USERS_JSON_FILE = join(process.cwd(), 'data', 'users-data.json')

export interface User {
  id: number
  username: string
  email: string
  password: string // hashed
  role: 'admin' | 'editor' | 'viewer'
  permissions: {
    hotels: boolean
    content: boolean
    media: boolean
    users: boolean
    settings: boolean
  }
  createdAt: string
  lastLogin?: string
}

const defaultUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@mbtourism.com',
    password: hashPassword('admin123'), // admin123
    role: 'admin',
    permissions: {
      hotels: true,
      content: true,
      media: true,
      users: true,
      settings: true,
    },
    createdAt: new Date().toISOString(),
  },
]

export async function getUsersData(): Promise<User[]> {
  try {
    const fileContent = await readFile(USERS_JSON_FILE, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    return defaultUsers
  }
}

export async function saveUsersData(users: User[]): Promise<void> {
  await writeFile(USERS_JSON_FILE, JSON.stringify(users, null, 2), 'utf-8')
}

export async function createUser(userData: Omit<User, 'id' | 'createdAt' | 'password'> & { password: string }): Promise<User> {
  const users = await getUsersData()
  const hashedPassword = hashPassword(userData.password)
  const newUser: User = {
    ...userData,
    id: Math.max(...users.map(u => u.id), 0) + 1,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  }
  users.push(newUser)
  await saveUsersData(users)
  return newUser
}

export async function updateUser(userId: number, updates: Partial<User>): Promise<User | null> {
  const users = await getUsersData()
  const index = users.findIndex(u => u.id === userId)
  
  if (index === -1) return null
  
  if (updates.password) {
    updates.password = hashPassword(updates.password)
  }
  
  users[index] = { ...users[index], ...updates }
  await saveUsersData(users)
  return users[index]
}

export async function deleteUser(userId: number): Promise<boolean> {
  const users = await getUsersData()
  const filtered = users.filter(u => u.id !== userId)
  
  if (filtered.length === users.length) return false
  
  await saveUsersData(filtered)
  return true
}

export async function verifyUser(username: string, password: string): Promise<User | null> {
  const users = await getUsersData()
  const user = users.find(u => u.username === username || u.email === username)
  
  if (!user) return null
  
  const isValid = comparePassword(password, user.password)
  if (!isValid) return null
  
  // تحديث آخر تسجيل دخول
  user.lastLogin = new Date().toISOString()
  await saveUsersData(users)
  
  return user
}

