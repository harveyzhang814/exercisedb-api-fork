import { Routes } from '#common/types/route.type.js'
import { createRoute, OpenAPIHono } from '@hono/zod-openapi'
import { z } from 'zod'
import { BodyPartService } from '../services'
import { BodyPartModel } from '../models/bodyPart.model'
import { LanguageQuerySchema } from '../../../common/schemas/language.schema'

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
          query: LanguageQuerySchema
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
        const lang = ctx.get('language')
        const response = await this.bodyPartService.getBodyParts({ lang })
        return ctx.json({ success: true, data: response })
      }
    )
  }
}
