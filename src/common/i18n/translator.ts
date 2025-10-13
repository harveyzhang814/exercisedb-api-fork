/**
 * Translator
 * Provides translation utilities for all data types
 */

import type { Exercise, BodyPart, Equipment, Muscle } from '../../data/types'
import type { SupportedLanguage, TranslationData } from '../types/i18n.types'
import { loadTranslations } from './translation-loader'

/**
 * Translator class for handling all translations
 */
export class Translator {
  private lang: SupportedLanguage

  constructor(lang: SupportedLanguage) {
    this.lang = lang
  }

  /**
   * Translate a single text string
   */
  translate(text: string, type: 'bodypart' | 'equipment' | 'muscle'): string {
    // Return original text for English
    if (this.lang === 'en-US') {
      return text
    }

    const translations = loadTranslations(this.lang)
    
    // Map type to translation key
    const typeMap: Record<'bodypart' | 'equipment' | 'muscle', keyof TranslationData> = {
      bodypart: 'bodyparts',
      equipment: 'equipments',
      muscle: 'muscles'
    }
    
    const translationMap = translations[typeMap[type]] as Record<string, string>

    return translationMap[text.toLowerCase()] || text
  }

  /**
   * Translate an array of strings
   */
  translateArray(texts: string[], type: 'bodypart' | 'equipment' | 'muscle'): string[] {
    return texts.map((text) => this.translate(text, type))
  }

  /**
   * Translate an exercise object
   */
  translateExercise(exercise: Exercise): Exercise {
    // Return original exercise for English
    if (this.lang === 'en-US') {
      return exercise
    }

    const translations = loadTranslations(this.lang)
    const exerciseTranslation = translations.exercises[exercise.exerciseId]

    return {
      ...exercise,
      name: exerciseTranslation?.name || exercise.name,
      targetMuscles: this.translateArray(exercise.targetMuscles, 'muscle'),
      bodyParts: this.translateArray(exercise.bodyParts, 'bodypart'),
      equipments: this.translateArray(exercise.equipments, 'equipment'),
      secondaryMuscles: this.translateArray(exercise.secondaryMuscles, 'muscle'),
      instructions: exerciseTranslation?.instructions || exercise.instructions
    }
  }

  /**
   * Translate multiple exercises
   */
  translateExercises(exercises: Exercise[]): Exercise[] {
    return exercises.map((exercise) => this.translateExercise(exercise))
  }

  /**
   * Translate a body part object
   */
  translateBodyPart(bodyPart: BodyPart): BodyPart {
    if (this.lang === 'en-US') {
      return bodyPart
    }

    return {
      name: this.translate(bodyPart.name, 'bodypart')
    }
  }

  /**
   * Translate body parts array
   */
  translateBodyParts(bodyParts: BodyPart[]): BodyPart[] {
    return bodyParts.map((bp) => this.translateBodyPart(bp))
  }

  /**
   * Translate an equipment object
   */
  translateEquipment(equipment: Equipment): Equipment {
    if (this.lang === 'en-US') {
      return equipment
    }

    return {
      name: this.translate(equipment.name, 'equipment')
    }
  }

  /**
   * Translate equipments array
   */
  translateEquipments(equipments: Equipment[]): Equipment[] {
    return equipments.map((eq) => this.translateEquipment(eq))
  }

  /**
   * Translate a muscle object
   */
  translateMuscle(muscle: Muscle): Muscle {
    if (this.lang === 'en-US') {
      return muscle
    }

    return {
      name: this.translate(muscle.name, 'muscle')
    }
  }

  /**
   * Translate muscles array
   */
  translateMuscles(muscles: Muscle[]): Muscle[] {
    return muscles.map((m) => this.translateMuscle(m))
  }

  /**
   * Get translated message
   */
  getMessage(key: string, params?: Record<string, string>): string {
    const translations = loadTranslations(this.lang)
    let message = translations.messages[key] || key

    // Replace parameters in message
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        message = message.replace(`{${key}}`, value)
      })
    }

    return message
  }

  /**
   * 反向翻译：从译文找到原文
   * 用于路径参数的语言转换
   */
  reverseTranslate(translatedText: string, type: 'bodypart' | 'equipment' | 'muscle'): string {
    if (this.lang === 'en-US') {
      return translatedText
    }

    const translations = loadTranslations(this.lang)
    const typeMap: Record<'bodypart' | 'equipment' | 'muscle', keyof TranslationData> = {
      bodypart: 'bodyparts',
      equipment: 'equipments',
      muscle: 'muscles'
    }

    const translationMap = translations[typeMap[type]] as Record<string, string>

    // 反向查找：译文 -> 原文
    for (const [original, translated] of Object.entries(translationMap)) {
      if (translated.toLowerCase() === translatedText.toLowerCase()) {
        return original
      }
    }

    return translatedText // 如果找不到，返回原文
  }

  /**
   * 双向翻译：自动检测输入语言并转换
   */
  bidirectionalTranslate(
    text: string,
    type: 'bodypart' | 'equipment' | 'muscle'
  ): {
    original: string
    translated: string
  } {
    // 先尝试正向翻译
    const translated = this.translate(text, type)

    // 如果翻译结果和输入相同，说明输入可能是译文，尝试反向
    if (translated === text) {
      const original = this.reverseTranslate(text, type)
      return {
        original,
        translated: this.translate(original, type)
      }
    }

    return {
      original: text,
      translated
    }
  }
}

/**
 * Create a translator instance for a specific language
 */
export function createTranslator(lang: SupportedLanguage): Translator {
  return new Translator(lang)
}

