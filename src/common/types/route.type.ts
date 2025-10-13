import type { OpenAPIHono } from '@hono/zod-openapi'
import type { AppEnv } from './env.types'

export interface Routes {
  controller: OpenAPIHono<AppEnv>
  initRoutes: () => void
}
