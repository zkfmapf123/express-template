import Joi from 'joi'

export interface TestSchemaParams {
  name: string
}

export const testSchema = Joi.object<TestSchemaParams>({
  name: Joi.string().required(),
})
