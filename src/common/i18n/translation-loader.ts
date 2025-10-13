/**
 * Translation Loader
 * Loads and caches translation data for all supported languages
 */

import { readFileSync } from 'fs'
import { join } from 'path'
import type { SupportedLanguage, TranslationData } from '../types/i18n.types'

/**
 * In-memory cache for translation data
 */
const translationCache: Map<SupportedLanguage, TranslationData> = new Map()

/**
 * Base path for translation files
 */
const TRANSLATIONS_BASE_PATH = join(process.cwd(), 'src', 'data', 'translations')

/**
 * Load translation data for a specific language
 */
export function loadTranslations(lang: SupportedLanguage): TranslationData {
  // Return cached data if available
  if (translationCache.has(lang)) {
    return translationCache.get(lang)!
  }

  // For en-US, return empty translations (use original data)
  if (lang === 'en-US') {
    const emptyTranslations: TranslationData = {
      exercises: {},
      bodyparts: {},
      equipments: {},
      muscles: {},
      messages: {}
    }
    translationCache.set(lang, emptyTranslations)
    return emptyTranslations
  }

  try {
    const langPath = join(TRANSLATIONS_BASE_PATH, lang)

    // Load all translation files
    const exercises = JSON.parse(readFileSync(join(langPath, 'exercises.json'), 'utf-8'))
    const bodyparts = JSON.parse(readFileSync(join(langPath, 'bodyparts.json'), 'utf-8'))
    const equipments = JSON.parse(readFileSync(join(langPath, 'equipments.json'), 'utf-8'))
    const muscles = JSON.parse(readFileSync(join(langPath, 'muscles.json'), 'utf-8'))
    const messages = JSON.parse(readFileSync(join(langPath, 'messages.json'), 'utf-8'))

    const translationData: TranslationData = {
      exercises,
      bodyparts,
      equipments,
      muscles,
      messages
    }

    // Cache the loaded translations
    translationCache.set(lang, translationData)
    return translationData
  } catch (error) {
    console.error(`Failed to load translations for ${lang}:`, error)
    // Return empty translations as fallback
    const emptyTranslations: TranslationData = {
      exercises: {},
      bodyparts: {},
      equipments: {},
      muscles: {},
      messages: {}
    }
    return emptyTranslations
  }
}

/**
 * Preload all translations on application startup
 */
export function preloadTranslations(): void {
  const languages: SupportedLanguage[] = ['en-US', 'zh-CN']
  languages.forEach((lang) => {
    loadTranslations(lang)
  })
  console.log('✅ Translations preloaded for:', languages.join(', '))
}

/**
 * Clear translation cache (useful for testing or hot reload)
 */
export function clearTranslationCache(): void {
  translationCache.clear()
}

