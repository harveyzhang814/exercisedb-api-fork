/**
 * Language validation utilities for multi-language support
 */

// Supported language codes in xx-XX format
export const SUPPORTED_LANGUAGES = ['en-US', 'zh-CN'] as const

// Default language when none is specified
export const DEFAULT_LANG = 'en-US'

// Type for supported language codes
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]

/**
 * Validates if a language code is in the correct format (xx-XX)
 * @param lang Language code to validate
 * @returns true if format is correct, false otherwise
 */
export function isValidLanguageFormat(lang: string): boolean {
  const langPattern = /^[a-z]{2}-[A-Z]{2}$/
  return langPattern.test(lang)
}

/**
 * Validates if a language code is supported
 * @param lang Language code to validate
 * @returns true if supported, false otherwise
 */
export function isSupportedLanguage(lang: string): boolean {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)
}

/**
 * Gets the language code to use, with fallback to default
 * @param lang Optional language code
 * @returns Valid language code or default
 */
export function getValidLanguage(lang?: string): string {
  if (!lang) {
    return DEFAULT_LANG
  }

  if (isValidLanguageFormat(lang) && isSupportedLanguage(lang)) {
    return lang
  }

  // If language format is invalid or not supported, return default
  return DEFAULT_LANG
}

/**
 * Validates and normalizes language parameter
 * @param lang Language code to validate and normalize
 * @returns Object with validation result and normalized language code
 */
export function validateLanguage(lang?: string): {
  isValid: boolean
  language: string
  message?: string
} {
  if (!lang) {
    return {
      isValid: true,
      language: DEFAULT_LANG
    }
  }

  if (!isValidLanguageFormat(lang)) {
    return {
      isValid: false,
      language: DEFAULT_LANG,
      message: `Invalid language format: ${lang}. Expected format: xx-XX (e.g., en-US, zh-CN)`
    }
  }

  if (!isSupportedLanguage(lang)) {
    return {
      isValid: false,
      language: DEFAULT_LANG,
      message: `Unsupported language: ${lang}. Supported languages: ${SUPPORTED_LANGUAGES.join(', ')}`
    }
  }

  return {
    isValid: true,
    language: lang
  }
}
