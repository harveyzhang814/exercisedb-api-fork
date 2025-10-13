import { promises as fs } from 'fs'
import path from 'path'
import { Equipment, Exercise, Muscle, BodyPart } from './types'
import { HTTPException } from 'hono/http-exception'
import { createTranslator } from '../common/i18n'
import type { SupportedLanguage } from '../common/types/i18n.types'

export class FileLoader {
  private static dataPath = path.resolve(process.cwd(), 'src', 'data')

  private static cache = new Map<string, unknown>()
  
  // 翻译数据缓存
  private static translatedExercisesCache = new Map<SupportedLanguage, Exercise[]>()
  private static translatedBodyPartsCache = new Map<SupportedLanguage, BodyPart[]>()
  private static translatedEquipmentsCache = new Map<SupportedLanguage, Equipment[]>()
  private static translatedMusclesCache = new Map<SupportedLanguage, Muscle[]>()

  private static async loadJSON<T>(filename: string): Promise<T> {
    const filePath = path.resolve(this.dataPath, filename)

    if (this.cache.has(filePath)) {
      return this.cache.get(filePath) as T
    }

    try {
      const fileContent = await fs.readFile(filePath, 'utf-8')
      const data = JSON.parse(fileContent) as T
      this.cache.set(filePath, data)
      return data
    } catch (error) {
      console.error(`❌ Error loading JSON file [${filename}]:`, error)
      throw new HTTPException(500, { message: `database not working` })
    }
  }

  public static loadExercises(): Promise<Exercise[]> {
    return this.loadJSON<Exercise[]>(`exercises.json`)
  }

  public static loadEquipments(): Promise<Equipment[]> {
    return this.loadJSON<Equipment[]>('equipments.json')
  }

  public static loadBodyParts(): Promise<BodyPart[]> {
    return this.loadJSON<BodyPart[]>('bodyparts.json')
  }

  public static loadMuscles(): Promise<Muscle[]> {
    return this.loadJSON<Muscle[]>('muscles.json')
  }

  /**
   * 预加载并翻译所有数据
   */
  public static async preloadTranslatedData(): Promise<void> {
    const languages: SupportedLanguage[] = ['en-US', 'zh-CN']
    
    console.log('🔄 Preloading translated data...')
    
    // 加载原始数据
    const [exercises, bodyParts, equipments, muscles] = await Promise.all([
      this.loadExercises(),
      this.loadBodyParts(),
      this.loadEquipments(),
      this.loadMuscles()
    ])
    
    // 为每种语言创建翻译版本
    for (const lang of languages) {
      const translator = createTranslator(lang)
      
      this.translatedExercisesCache.set(lang, translator.translateExercises(exercises))
      this.translatedBodyPartsCache.set(lang, translator.translateBodyParts(bodyParts))
      this.translatedEquipmentsCache.set(lang, translator.translateEquipments(equipments))
      this.translatedMusclesCache.set(lang, translator.translateMuscles(muscles))
    }
    
    console.log('✅ Translated data preloaded for:', languages.join(', '))
  }

  /**
   * 获取翻译后的运动数据
   */
  public static async getTranslatedExercises(lang: SupportedLanguage): Promise<Exercise[]> {
    if (!this.translatedExercisesCache.has(lang)) {
      await this.preloadTranslatedData()
    }
    return this.translatedExercisesCache.get(lang)!
  }

  /**
   * 获取翻译后的身体部位数据
   */
  public static async getTranslatedBodyParts(lang: SupportedLanguage): Promise<BodyPart[]> {
    if (!this.translatedBodyPartsCache.has(lang)) {
      await this.preloadTranslatedData()
    }
    return this.translatedBodyPartsCache.get(lang)!
  }

  /**
   * 获取翻译后的器械数据
   */
  public static async getTranslatedEquipments(lang: SupportedLanguage): Promise<Equipment[]> {
    if (!this.translatedEquipmentsCache.has(lang)) {
      await this.preloadTranslatedData()
    }
    return this.translatedEquipmentsCache.get(lang)!
  }

  /**
   * 获取翻译后的肌肉数据
   */
  public static async getTranslatedMuscles(lang: SupportedLanguage): Promise<Muscle[]> {
    if (!this.translatedMusclesCache.has(lang)) {
      await this.preloadTranslatedData()
    }
    return this.translatedMusclesCache.get(lang)!
  }
}
