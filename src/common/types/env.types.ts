/**
 * Environment and Context Types
 * Global type definitions for Hono application
 */

import type { SupportedLanguage } from './i18n.types'

/**
 * Application Variables stored in Hono Context
 */
export type AppVariables = {
  language: SupportedLanguage
}

/**
 * Application Environment type
 */
export type AppEnv = {
  Variables: AppVariables
}

