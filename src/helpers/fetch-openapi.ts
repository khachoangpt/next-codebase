import '@/configs/env'

import { logger } from '@/configs/logger'
import { generateOpenApiSpecification } from '@/utils/generate-openapi-specs'

const fetchOpenApi = async () => {
  const swaggerURL = process.env.SWAGGER_JSON_URL
  if (!swaggerURL) {
    logger.warn('SWAGGER_JSON_URL is not set')
    return
  }

  try {
    const response = await fetch(swaggerURL)
    const swaggerJson = await response.json()
    logger.info(`Fetched OpenAPI specification :: ${swaggerURL}`)
    await generateOpenApiSpecification(swaggerJson)
  } catch (error) {
    logger.warn(`Failed to fetch OpenAPI specification :: ${error}`)
  }
}

fetchOpenApi()
