import '@/configs/env.ts'

import { createServer } from 'http'
import next from 'next'
import { parse } from 'url'

import { logger } from '@/configs/logger'
import {
  fetchOpenApiSpec,
  generateOpenApiSpecification,
} from '@/utils/generate-openapi-specs'

const bootstrap = async () => {
  const port = process.env.PORT || 3000
  const env = process.env.NODE_ENV
  const app = next({ dev: env !== 'production' })
  const handle = app.getRequestHandler()

  await app.prepare()

  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  })

  server
    .listen(port)
    .on('listening', () => handleListeningServer(port))
    .on('error', (error) => handleServerError(error))
}

// Start the server
bootstrap()

/**
 * Logs a message indicating the port the server is listening on, and
 * fetches the OpenAPI specification from the `SWAGGER_JSON_URL` environment
 * variable and generates code using `generateOpenApiSpecification()`.
 * @param {number} port - The port number the server is listening on.
 */
const handleListeningServer = async (port: number) => {
  logger.info(`Server listening on port ${port}`)

  const swaggerURL = process.env.SWAGGER_JSON_URL as string
  const openApiSpec = await fetchOpenApiSpec(swaggerURL)
  if (!openApiSpec) return
  await generateOpenApiSpecification(openApiSpec)
  logger.info('Generated OpenAPI specification')
}

/**
 * Logs an error message if the server encounters an error.
 * @param {Error} error - The error encountered by the server.
 */
const handleServerError = (error: Error) => {
  logger.error(error.message)
}
