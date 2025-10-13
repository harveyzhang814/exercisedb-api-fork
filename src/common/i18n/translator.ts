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
}

/**
 * Create a translator instance for a specific language
 */
export function createTranslator(lang: SupportedLanguage): Translator {
  return new Translator(lang)
}

