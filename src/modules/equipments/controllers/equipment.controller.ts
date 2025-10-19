import { Routes } from '#common/types/route.type.js'
import { createRoute, OpenAPIHono } from '@hono/zod-openapi'
import { z } from 'zod'
import { EquipmentModel } from '../models/equipment.model'
import { EquipmentService } from '../services'
import { validateLanguage } from '../../../common/utils/lang-validator'

export class EquipmentController implements Routes {
  public controller: OpenAPIHono
  private readonly equipmentService: EquipmentService
  constructor() {
    this.controller = new OpenAPIHono()
    this.equipmentService = new EquipmentService()
  }

  public initRoutes() {
    this.controller.openapi(
      createRoute({
        method: 'get',
        path: '/equipments',
        tags: ['EQUIPMENTS'],
        summary: 'GetAllEquipments',
        operationId: 'getEquipments',
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
            description: 'Successful response with list of all equipments.',
            content: {
              'application/json': {
                schema: z.object({
                  success: z.boolean().openapi({
                    description: 'Indicates whether the request was successful',
                    type: 'boolean',
                    example: true
                  }),
                  data: z.array(EquipmentModel).openapi({
                    description: 'Array of equipments.'
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

        const response = await this.equipmentService.getEquipments({ lang: language })
        return ctx.json({ success: true, data: response })
      }
    )
  }
}
