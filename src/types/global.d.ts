import type messages from '#/messages'

type Messages = typeof messages

declare global {
  type IntlMessages = Messages

  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      SWAGGER_JSON_URL: string
      NEXT_PUBLIC_API_URL: string
      NEXT_PUBLIC_MAINTENANCE_MODE: 'true' | 'false'
    }
  }
}
