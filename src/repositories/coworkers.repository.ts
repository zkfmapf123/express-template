import { logger } from '../configs'
import { dbConfig } from '../configs/db.config'
import { CoworkersSchemaParams } from '../domains/coworkers/schema'
import { failed, passed } from '../lib/core-fp/option'

class CoworkersRepository {
  private TABLE_NAME = 'coworkers'

  async retrieve() {
    try {
      const [results, _] = await dbConfig.dbConn.query(`select * from ${this.TABLE_NAME}`)

      logger.info('users : ', results?.length)
      return passed<CoworkersSchemaParams[]>(results as CoworkersSchemaParams[])
    } catch (e) {
      logger.error(e)
      return failed<CoworkersSchemaParams>(null)
    }
  }

  async retrieveFindById({ id }: CoworkersSchemaParams) {
    try {
      const [result, _] = await dbConfig.dbConn.query(`select * from ${this.TABLE_NAME} where id = :id`, {
        replacements: {
          id,
        },
      })

      return passed<CoworkersSchemaParams>(result[0] as CoworkersSchemaParams)
    } catch (e) {
      logger.error(e)
      return failed<CoworkersSchemaParams>(null)
    }
  }

  async setData({ job, name, email, isLeader }: CoworkersSchemaParams) {
    try {
      const [_, metadata] = await dbConfig.dbConn.query(
        `insert into ${this.TABLE_NAME} (job, name, email, isLeader) values(:job,:name,:email,:isLeader)`,
        {
          replacements: {
            job,
            name,
            email,
            isLeader,
          },
        }
      )

      // success
      if (metadata === 1) {
        return passed<CoworkersSchemaParams>(null)
      }

      return failed<CoworkersSchemaParams>(null)
    } catch (e) {
      logger.error(e)
      return failed<CoworkersSchemaParams>(null)
    }
  }

  async deleteById({ id }: CoworkersSchemaParams) {
    try {
      const [result, _] = await dbConfig.dbConn.query(`delete from ${this.TABLE_NAME} where id = :id`, {
        replacements: {
          id,
        },
      })

      return passed<CoworkersSchemaParams>(result[0] as CoworkersSchemaParams)
    } catch (e) {
      logger.error(e)
      return failed<CoworkersSchemaParams>(null)
    }
  }
}

export const coworkersRepository = new CoworkersRepository()
