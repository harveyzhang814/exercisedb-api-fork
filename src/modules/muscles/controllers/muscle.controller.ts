import { Routes } from '#common/types/route.type.js'
import { createRoute, OpenAPIHono } from '@hono/zod-openapi'
import { z } from 'zod'
import { MuscleModel } from '../models/muscle.model'
import { MuscleService } from '../services'
import { validateLanguage } from '../../../common/utils/lang-validator'

export class MuscleController implements Routes {
  public controller: OpenAPIHono
  private readonly muscleService: MuscleService
  constructor() {
    this.controller = new OpenAPIHono()
    this.muscleService = new MuscleService()
  }

  public initRoutes() {
    this.controller.openapi(
      createRoute({
        method: 'get',
        path: '/muscles',
        tags: ['MUSCLES'],
        summary: 'GetAllMuscles',
        operationId: 'getMuscles',
        request: {
          query: z.object({
            lang: z.string().optional().openapi({
              title: 'Language Code',
              description: 'Language code in format xx-XX (e.g., en-US, zh-CN). Defaults to en-US',
              type: 'string',
              example: 'en-US',
              default: 'en-US'
            })
          })
        },
        responses: {
          200: {
            description: 'Successful response with list of all muscles.',
            content: {
              'application/json': {
                schema: z.object({
                  success: z.boolean().openapi({
                    description: 'Indicates whether the request was successful',
                    type: 'boolean',
                    example: true
                  }),
                  data: z.array(MuscleModel).openapi({
                    description: 'Array of Muslces.'
                  })
                })
              }
            }
          },
          500: {
            description: 'Internal server error'
          }
        }
      }),
      async (ctx) => {
        const { lang } = ctx.req.valid('query')

        // Validate language parameter
        const { isValid, language } = validateLanguage(lang)
        if (!isValid) {
          console.warn(`Invalid language parameter: ${lang}, using default: ${language}`)
        }

        const response = await this.muscleService.getMuscles({ lang: language })
        return ctx.json({ success: true, data: response })
      }
    )
  }
}
