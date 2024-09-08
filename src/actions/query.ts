import type { ApiError } from '@/client/api'

export type ErrorObject = {
  url: string
  status: number
  statusText: string
  body: {
    message?: string
    error?: string
    statusCode?: number
  }
  request: object
}

type QueryOptions<T> = {
  queryFn: () => T | Promise<T>
}

export type QueryResult<T> = {
  error?: ErrorObject
  data?: Awaited<T>
}

/**
 * Executes a query function and handles errors by returning an object with error details or query result data.
 *
 * @param {QueryOptions<T>} queryFn - The query function to be executed.
 * @return {Promise<QueryResult<T>>} An object containing either an error or the query result data.
 */
export const query = async <T>({
  queryFn,
}: QueryOptions<T>): Promise<QueryResult<T>> => {
  let result: Awaited<T> | undefined = undefined

  try {
    result = await queryFn()
  } catch (error) {
    const err = error as ApiError
    const errorObject: ErrorObject = {
      url: err.url,
      status: err.status,
      statusText: err.statusText,
      body: err.body as ErrorObject['body'],
      request: err.request,
    }

    return { error: errorObject, data: undefined }
  }

  return { error: undefined, data: result }
}
