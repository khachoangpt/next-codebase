/* eslint-disable @typescript-eslint/no-empty-object-type */
import type messages from '#/messages'

type Messages = typeof messages

declare global {
  interface IntlMessages extends Messages {}

  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      SWAGGER_JSON_URL: string
      NEXT_PUBLIC_API_URL: string
    }
  }
}
