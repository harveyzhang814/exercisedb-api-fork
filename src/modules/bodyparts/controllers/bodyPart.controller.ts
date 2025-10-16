import { Routes } from '#common/types/route.type.js'
import { createRoute, OpenAPIHono } from '@hono/zod-openapi'
import { z } from 'zod'
import { BodyPartService } from '../services'
import { BodyPartModel } from '../models/bodyPart.model'
import { validateLanguage } from '../../../common/utils/lang-validator'

export class BodyPartController implements Routes {
  public controller: OpenAPIHono
  private readonly bodyPartService: BodyPartService
  constructor() {
    this.controller = new OpenAPIHono()
    this.bodyPartService = new BodyPartService()
  }

  public initRoutes() {
    this.controller.openapi(
      createRoute({
        method: 'get',
        path: '/bodyparts',
        tags: ['BODYPARTS'],
        summary: 'GetAllBodyparts',
        operationId: 'getBodyParts',
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
            description: 'Successful response with list of all bodyparts.',
            content: {
              'application/json': {
                schema: z.object({
                  success: z.boolean().openapi({
                    description: 'Indicates whether the request was successful',
                    type: 'boolean',
                    example: true
                  }),
                  data: z.array(BodyPartModel).openapi({
                    description: 'Array of bodyparts.'
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

        const response = await this.bodyPartService.getBodyParts({ lang: language })
        return ctx.json({ success: true, data: response })
      }
    )
  }
}
