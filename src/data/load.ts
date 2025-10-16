import { promises as fs } from 'fs'
import path from 'path'
import { Equipment, Exercise, Muscle, BodyPart } from './types'
import { HTTPException } from 'hono/http-exception'
import { getValidLanguage } from '../common/utils/lang-validator'

export class FileLoader {
  private static dataPath = path.resolve(process.cwd(), 'src', 'data')

  private static cache = new Map<string, unknown>()

  private static async loadJSON<T>(filename: string, lang?: string): Promise<T> {
    const validLang = getValidLanguage(lang)
    
    // Try to load from language-specific folder first
    let filePath = path.resolve(this.dataPath, validLang, filename)
    
    // If language-specific file doesn't exist, fallback to root data folder
    if (!(await this.fileExists(filePath))) {
      filePath = path.resolve(this.dataPath, filename)
    }

    if (this.cache.has(filePath)) {
      return this.cache.get(filePath) as T
    }

    try {
      const fileContent = await fs.readFile(filePath, 'utf-8')
      const data = JSON.parse(fileContent) as T
      this.cache.set(filePath, data)
      return data
    } catch (error) {
      console.error(`❌ Error loading JSON file [${filename}] for language [${validLang}]:`, error)
      throw new HTTPException(500, { message: `database not working` })
    }
  }

  private static async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath)
      return true
    } catch {
      return false
    }
  }

  public static loadExercises(lang?: string): Promise<Exercise[]> {
    return this.loadJSON<Exercise[]>(`exercises.json`, lang)
  }

  public static loadEquipments(lang?: string): Promise<Equipment[]> {
    return this.loadJSON<Equipment[]>('equipments.json', lang)
  }

  public static loadBodyParts(lang?: string): Promise<BodyPart[]> {
    return this.loadJSON<BodyPart[]>('bodyparts.json', lang)
  }

  public static loadMuscles(lang?: string): Promise<Muscle[]> {
    return this.loadJSON<Muscle[]>('muscles.json', lang)
  }
}
