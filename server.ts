import chalk from 'chalk'
import { createServer } from 'http'
import next from 'next'
import { parse } from 'url'

import { logger } from '@/configs'
import { generateOpenApiSpecification } from '@/utils/generate-openapi-specs'

const bootstrap = async () => {
  const port = parseInt(process.env.PORT || '3000', 10)
  const dev = process.env.NODE_ENV !== 'production'
  const app = next({ dev, quiet: false })
  const handle = app.getRequestHandler()

  await app.prepare()

  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  }).listen(port)

  // generate openapi
  const swaggerURL = process.env.NEXT_PUBLIC_SWAGGER_JSON_URL as string
  if (!swaggerURL) {
    logger.warn(chalk.yellow('NEXT_PUBLIC_SWAGGER_JSON_URL is not set'))
  } else {
    const response = await fetch(swaggerURL)
    const swaggerJson = await response.json()
    await generateOpenApiSpecification(swaggerJson)
    logger.info('Generated OpenAPI specification')
  }

  logger.info(`Server listening on port ${port}`)
}

bootstrap()
