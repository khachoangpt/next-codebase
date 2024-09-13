import { createServer } from 'http'
import next from 'next'
import { parse } from 'url'

import { logger } from '@/configs'
import { generateOpenApiSpecification } from '@/utils/generate-openapi-specs'

/**
 * Starts a Next.js development server and generates an OpenAPI specification.
 *
 * 1. Starts a Next.js server with `next({ dev: true })`.
 * 2. Parses the URL using `parse(req.url!, true)`.
 * 3. Handles the request using `app.getRequestHandler()`.
 * 4. Listens on the port specified in the `PORT` environment variable,
 *    defaulting to 3000.
 * 5. Logs a message indicating the port the server is listening on.
 * 6. If the `SWAGGER_JSON_URL` environment variable is set, fetches the
 *    OpenAPI specification from the URL and generates code using
 *    `generateOpenApiSpecification()`.
 * 7. Logs a message indicating whether the OpenAPI specification was
 *    generated successfully or not.
 */
const bootstrap = async () => {
  const app = next({ dev: true })
  const handle = app.getRequestHandler()
  await app.prepare()
  const port = process.env.PORT || 3000

  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  }).listen(port)

  logger.info(`Server listening on port ${port}`)

  // Generate Openapi
  const swaggerURL = process.env.SWAGGER_JSON_URL as string
  if (!swaggerURL) {
    logger.warn('SWAGGER_JSON_URL is not set')
    return
  }

  try {
    const response = await fetch(swaggerURL)
    const swaggerJson = await response.json()
    await generateOpenApiSpecification(swaggerJson)
    logger.info('Generated OpenAPI specification')
  } catch (error) {
    logger.warn(`Failed to generate OpenAPI specification :: ${error}`)
  }
}

bootstrap()
