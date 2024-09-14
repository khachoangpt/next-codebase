/* eslint-disable @typescript-eslint/no-explicit-any */
import { writeFile } from 'node:fs/promises'

import { logger } from '@/configs/logger'

/**
 * Generates an OpenAPI specification for Next.js routes based on the provided OpenAPI object and type.
 *
 * @param {OpenAPIObject} openApi - The OpenAPI object to modify.
 * @return {Promise<void>} This function does not return a value.
 */
export const generateOpenApiSpecification = async (
  openApi: any,
): Promise<void> => {
  const clonedOpenApi = structuredClone(openApi)

  if (clonedOpenApi.components?.schemas) {
    clonedOpenApi.components.schemas = {
      ...clonedOpenApi.components?.schemas,
      ...{
        CacheType: {
          type: 'string',
          enum: [
            'default',
            'force-cache',
            'no-cache',
            'no-store',
            'only-if-cached',
            'reload',
          ],
          description: 'Cache type',
        },
      },
      ...{
        NextJsOptions: {
          type: 'object',
          properties: {
            revalidate: {
              type: 'number',
              description: 'Revalidate time in seconds',
            },
            type: {
              $ref: '#/components/schemas/CacheType',
            },
            tags: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Cache tags',
            },
          },
        },
      },
    }
  }

  const paths = clonedOpenApi.paths
  const pathsArray = Object.entries(paths).map(([path, method]) => ({
    path,
    method,
  }))

  for (let i = 0; i < pathsArray.length; i++) {
    const method = pathsArray[i].method as unknown as {
      parameters: Array<object>
    }
    method.parameters = [
      {
        in: 'path',
        name: 'cache',
        description: 'Next.js option',
        schema: {
          $ref: '#/components/schemas/NextJsOptions',
        },
        required: false,
      },
    ]
  }

  const pathsObj = Object.fromEntries(pathsArray.map((i) => [i.path, i.method]))
  clonedOpenApi.paths = Object.assign(clonedOpenApi.paths, pathsObj)

  await writeFile(`docs/swagger.json`, JSON.stringify(clonedOpenApi, null, 2))
}

/**
 * Fetches the OpenAPI specification from the given URL and generates code using
 * `generateOpenApiSpecification()`.
 *
 * @param {string} swaggerURL - The URL of the OpenAPI specification.
 * @returns {Promise<any>} The generated code.
 */
export const fetchOpenApiSpec = async (swaggerURL: string): Promise<any> => {
  if (!swaggerURL) {
    logger.warn('SWAGGER_JSON_URL is not set')
    return
  }

  try {
    const response = await fetch(swaggerURL)
    const swaggerJson = await response.json()
    return swaggerJson
  } catch (error) {
    logger.warn(`Failed to fetch OpenAPI specification :: ${error}`)
  }
}
