/**
 * Internationalization (i18n) type definitions
 */

/**
 * Supported languages in ISO 639-1 format with country code
 */
export type SupportedLanguage = 'en-US' | 'zh-CN'

/**
 * Default language for API responses
 */
export const DEFAULT_LANGUAGE: SupportedLanguage = 'en-US'

/**
 * Language mapping for simplified language codes
 */
export const LANGUAGE_MAP: Record<string, SupportedLanguage> = {
  'en': 'en-US',
  'en-us': 'en-US',
  'zh': 'zh-CN',
  'zh-cn': 'zh-CN',
  'zh-Hans': 'zh-CN'
}

/**
 * Translation map for simple key-value translations
 */
export interface TranslationMap {
  [key: string]: string
}

/**
 * Exercise-specific translation structure
 */
export interface ExerciseTranslation {
  name: string
  instructions: string[]
}

/**
 * Complete translation data structure for a language
 */
export interface TranslationData {
  exercises: Record<string, ExerciseTranslation>  // exerciseId -> translation
  bodyparts: TranslationMap                        // name -> translation
  equipments: TranslationMap                       // name -> translation
  muscles: TranslationMap                          // name -> translation
  messages: Record<string, string>                 // API response messages
}

/**
 * Normalize language code to supported format
 */
export function normalizeLanguage(lang: string): SupportedLanguage {
  const normalized = lang.toLowerCase().trim()
  return LANGUAGE_MAP[normalized] || DEFAULT_LANGUAGE
}

/**
 * Check if a language is supported
 */
export function isSupportedLanguage(lang: string): boolean {
  const normalized = normalizeLanguage(lang)
  return normalized === 'en-US' || normalized === 'zh-CN'
}

