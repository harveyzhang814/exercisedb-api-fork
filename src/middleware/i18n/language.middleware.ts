/**
 * Language Detection Middleware
 * Extracts and validates language from query parameters
 */

import type { MiddlewareHandler } from 'hono'
import { normalizeLanguage, DEFAULT_LANGUAGE } from '#common/types/i18n.types.js'
import type { AppEnv } from '#common/types/env.types.js'

/**
 * Language detection middleware
 * Extracts language from query parameter and stores in context
 */
export const languageMiddleware: MiddlewareHandler<AppEnv> = async (c, next) => {
  // Extract language from query parameter
  const langParam = c.req.query('lang')

  // Normalize and validate language
  const language = langParam ? normalizeLanguage(langParam) : DEFAULT_LANGUAGE

  // Store language in context for use in controllers and services
  c.set('language', language)

  await next()
}

