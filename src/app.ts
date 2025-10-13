/**
 * ExerciseDB API - Fitness Exercise Database API
 * Copyright (C) 2025 AscendAPI
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 * 
 * This is a fork of the original ExerciseDB API project.
 * Original repository: https://github.com/exercisedb/exercisedb-api
 */

import { OpenAPIHono } from '@hono/zod-openapi'
import { Scalar } from '@scalar/hono-api-reference'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { Home } from './pages/home'
import { Routes } from '#common/types'
import type { HTTPException } from 'hono/http-exception'
import { cors } from 'hono/cors'
import { languageMiddleware } from './middleware/i18n'
import { preloadTranslations } from './common/i18n'
import type { AppEnv } from './common/types/env.types'

export class App {
  private app: OpenAPIHono<AppEnv>
  constructor(routes: Routes[]) {
    this.app = new OpenAPIHono<AppEnv>()
    this.initializeApp(routes)
  }
  private async initializeApp(routes: Routes[]) {
    try {
      // Preload translations on startup
      preloadTranslations()

      this.initializeGlobalMiddleware()
      this.initializeRoutes(routes)
      this.initializeSwaggerUI()
      this.initializeRouteFallback()
      this.initializeErrorHandler()
    } catch (error) {
      console.error('Failed to initialize application:', error)
      throw new Error('Failed to initialize application')
    }
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      route.initRoutes()
      this.app.route('/api/v1', route.controller)
    })
    this.app.route('/', Home)
  }

  private initializeGlobalMiddleware() {
    this.app.use(
      cors({
        origin: '*',
        allowMethods: ['GET', 'OPTIONS']
      })
    )

    this.app.use(logger())
    this.app.use(prettyJSON())
    this.app.use(async (c, next) => {
      const start = Date.now()
      await next()
      const end = Date.now()
      c.res.headers.set('X-Response-Time', `${end - start}ms`)
    })

    // Language detection middleware
    this.app.use(languageMiddleware)

    // this.app.use(authMiddleware)
  }

  private initializeSwaggerUI(): void {
    // OpenAPI documentation for v1
    this.app.doc31('/swagger', (c) => {
      const { protocol: urlProtocol, hostname, port } = new URL(c.req.url)
      const protocol = c.req.header('x-forwarded-proto') ? `${c.req.header('x-forwarded-proto')}:` : urlProtocol

      return {
        openapi: '3.1.0',
        info: {
          version: '1.0.0',
          title: 'ExerciseDB API - Open Source',
          description: `**ExerciseDB API** is a fully open-source and developer-friendly fitness exercise database featuring over 1,300 structured exercises with **GIF-based visual media**. It includes detailed metadata like target muscles, equipment, and body parts, designed for fast integration into fitness apps, personal trainer platforms, and health tools.

**📝 NOTE**: This is a 100% free and open-source project, including both the **code and complete dataset** — making it perfect for personal projects, commercial apps, prototypes, learning, and community-driven platforms.

**📄 LICENSE**: This project is licensed under the [GNU Affero General Public License v3.0 (AGPL-3.0)](https://www.gnu.org/licenses/agpl-3.0.html). This is a fork of the original ExerciseDB API project.

🔗 Useful Links:
- 📜 Source Code: [GitHub Repository](https://github.com/exercisedb/exercisedb-api)
- 🐛 Report Issues: [GitHub Issues](https://github.com/exercisedb/exercisedb-api/issues)
- 💡 Feature Requests: [GitHub Discussions](https://github.com/exercisedb/exercisedb-api/discussions)
- ⭐ Star the Project: [GitHub](https://github.com/exercisedb/exercisedb-api)`,
          license: {
            name: 'AGPL-3.0',
            url: 'https://www.gnu.org/licenses/agpl-3.0.html'
          },
          contact: {
            name: 'ExerciseDB API',
            email: 'hello@exercisedb.dev',
            url: 'https://exercisedb.dev'
          }
        },
        servers: [
          {
            url: `${protocol}//${hostname}${port ? `:${port}` : ''}`,
            description:
              'Open Source API\n• 100% Free & Open License (AGPL-3.0)\n• Complete code and dataset on GitHub\n• 1,300+ exercises with GIF animations\n• Perfect for commercial & personal projects'
          }
        ]
      }
    })

    // API Documentation UI
    this.app.get(
      '/docs',
      Scalar({
        pageTitle: 'ExerciseDB API - Open Source',
        theme: 'kepler',
        isEditable: false,
        layout: 'modern',
        darkMode: true,
        hideDownloadButton: true,
        hideDarkModeToggle: true,
        url: '/swagger',
        favicon: 'https://cdn.exercisedb.dev/exercisedb/favicon.ico',
        defaultOpenAllTags: true,
        hideClientButton: true,
        metaData: {
          applicationName: 'ExerciseDB API - Open Source',
          author: 'Ascend API',
          creator: 'Ascend API',
          publisher: 'Ascend API',
          ogType: 'website',
          robots: 'index follow',
          description: `**ExerciseDB API** is a 100% free and open-source exercise database offering 1,300+ exercises with rich metadata and GIF visualizations. Built for speed and ease of use, it's perfect for personal projects, commercial apps, prototypes, and education.

📄 **License**: AGPL-3.0 - This is a fork of the original ExerciseDB API. You have the right to obtain the complete source code.

🔗 Useful Links:
- 📜 Source Code: [GitHub](https://github.com/exercisedb/exercisedb-api)
- 🐛 Report Issues: [GitHub Issues](https://github.com/exercisedb/exercisedb-api/issues)
- 💡 Discussions: [GitHub Discussions](https://github.com/exercisedb/exercisedb-api/discussions)`
        }
      })
    )
  }

  private initializeRouteFallback() {
    this.app.notFound((c) => {
      const baseUrl = new URL(c.req.url).origin
      return c.json(
        {
          success: false,
          message: `Route not found. Check the API documentation at ${baseUrl}/docs`
        },
        404
      )
    })
  }
  private initializeErrorHandler() {
    this.app.onError((err, c) => {
      const error = err as HTTPException
      console.log(error)
      return c.json({ success: false, message: error.message }, error.status || 500)
    })
  }
  public getApp() {
    return this.app
  }
}
