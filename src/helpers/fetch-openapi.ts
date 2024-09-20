import '@/configs/env'

import { logger } from '@/configs/logger'
import { generateOpenApiSpecification } from '@/utils/generate-openapi-specs'

/**
 * Fetches OpenAPI specification from the given URL and generates the necessary
 * TypeScript definitions and API clients.
 *
 * This function is called by the `fetch-openapi` script and is used to generate
 * the API clients and TypeScript definitions for the Next.js API.
 *
 * The URL is read from the `SWAGGER_JSON_URL` environment variable. If the
 * variable is not set, the function logs an error and does nothing.
 *
 * The function fetches the OpenAPI specification from the given URL, parses it
 * as JSON and then passes it to the `generateOpenApiSpecification` function.
 *
 * If the fetching fails, the function logs an error and throws an exception.
 */
const fetchOpenApi = async () => {
  const swaggerURL = process.env.SWAGGER_JSON_URL
  if (!swaggerURL) {
    logger.error('SWAGGER_JSON_URL is not set')
    throw new Error('SWAGGER_JSON_URL is not set')
  }

  try {
    const response = await fetch(swaggerURL)
    const swaggerJson = await response.json()
    logger.info(`Fetched OpenAPI specification :: ${swaggerURL}`)
    await generateOpenApiSpecification(swaggerJson)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    const errorMessage =
      'Failed to fetch OpenAPI specification. Make sure you are setting SWAGGER_JSON_URL correctly.'

    logger.error(errorMessage)
    throw new Error(errorMessage)
  }
}

fetchOpenApi()
