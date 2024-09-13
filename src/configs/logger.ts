import type { Logger } from 'pino'
import pino from 'pino'

export const logger: Logger =
  process.env.NODE_ENV === 'production'
    ? pino()
    : pino({
        transport: { target: 'pino-pretty', options: { colorize: true } },
      })
