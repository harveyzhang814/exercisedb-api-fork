/**
 * Language query parameter schema
 */

import { z } from 'zod'

/**
 * Language query parameter schema
 * Used across all API endpoints to specify response language
 */
export const LanguageQuerySchema = z.object({
  lang: z.enum(['en-US', 'zh-CN', 'en', 'zh']).optional().openapi({
    title: 'Language',
    description: 'Response language in ISO 639-1 format with optional country code. Supported: en-US (English), zh-CN (Simplified Chinese). Simplified formats (en, zh) are also accepted.',
    type: 'string',
    example: 'zh-CN',
    default: 'en-US'
  })
})

