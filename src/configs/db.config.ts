import { Sequelize } from 'sequelize'
import { Configs } from '../utils'
import { ERROR } from '../utils/params/enums'
import { envParams } from './env.config'
import { logger } from './logger.config'

class DBConfig implements Configs {
  private dbConn: Sequelize
  constructor() {}

  async init({ DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT }: envParams): Promise<void> {
    this.dbConn = new Sequelize(`mysql://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
      username: 'root',
      database: DB_DATABASE,
      password: DB_PASSWORD,
      dialect: 'mysql',
      logging: false,
      pool: {
        max: 10,
        min: 0,
        idle: 30000,
      },
    })

    try {
      await this.dbConn.authenticate()
      logger.info('DB Connection has been established successfully')
    } catch (e) {
      logger.error(e)
      throw new Error(ERROR.DB_CONNECT_ERROR)
    }
  }

  beforeHook(): void {
    throw new Error('Method not implemented.')
  }
  afterHook(): void {
    throw new Error('Method not implemented.')
  }
}

export const dbConfig = new DBConfig()
