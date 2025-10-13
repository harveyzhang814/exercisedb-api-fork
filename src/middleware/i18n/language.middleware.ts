/**
 * Language Detection Middleware
 * Extracts and validates language from query parameters
 */

import { Context, Next } from 'hono'
import { normalizeLanguage, DEFAULT_LANGUAGE, type SupportedLanguage } from '#common/types/i18n.types.js'

/**
 * Extend Hono context to include language
 */
declare module 'hono' {
  interface Context {
    language: SupportedLanguage
  }
}

/**
 * Language detection middleware
 * Extracts language from query parameter and stores in context
 */
export const languageMiddleware = async (c: Context, next: Next) => {
  // Extract language from query parameter
  const langParam = c.req.query('lang')

  // Normalize and validate language
  const language = langParam ? normalizeLanguage(langParam) : DEFAULT_LANGUAGE

  // Store language in context for use in controllers and services
  c.set('language', language)

  await next()
}

