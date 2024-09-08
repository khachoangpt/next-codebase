import chalk from 'chalk'
import winston from 'winston'

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
        winston.format.printf((info) => {
          switch (info.level) {
            case 'info':
              info.level = chalk.green(info.level.toUpperCase())
              info.message = chalk.green(info.message)
              break
            case 'warn':
              info.level = chalk.yellow(info.level.toUpperCase())
              info.message = chalk.yellow(info.message)
              break
            case 'error':
              info.level = chalk.red(info.level.toUpperCase())
              info.message = chalk.red(info.message)
              break
            case 'debug':
              info.level = chalk.blue(info.level.toUpperCase())
              info.message = chalk.blue(info.message)
              break
            default:
              break
          }
          return `[${info.level}] ${info.timestamp} :: ${info.message}`
        }),
      ),
    }),
  ],
})
