import winston, { format } from 'winston'
const { combine, timestamp, json, prettyPrint, simple, printf } = winston.format

class Logger {
  private logger: winston.Logger

  constructor() {
    this.logger = winston.createLogger({
      format: combine(timestamp({ format: 'YYYY-MM-DD hh:mm:ss' }), prettyPrint(), format.splat(), format.simple(), json()),
      transports: [
        new winston.transports.Console({
          format: combine(
            // Show detailed logs on console (pretty print in the terminal)
            timestamp({ format: 'YYYY-MM-DD hh:mm:ss' }),
            simple(),
            format.colorize(), // Colors for different levels
            printf(({ timestamp, level, message }) => {
              return `${timestamp} [${level}]: ${message}`
            })
          ),
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/debug.log', level: 'debug' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
      ],
    })
  }

  public info(...message: any[]) {
    this.logger.info(message)
  }

  public error(...message: any[]) {
    this.logger.error(message)
  }

  public debug(...message: any[]) {
    this.logger.debug(message)
  }

  public warn(...message: any[]) {
    this.logger.warn(message)
  }
}

export const logger = new Logger()
