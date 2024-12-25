import Joi from 'joi'

export interface CoworkersSchemaParams {
  id?: number // pk
  job: string
  name: string
  email: string
  isLeader: number
}

export const coworkerSchemaParamas = Joi.object<CoworkersSchemaParams>({
  id: Joi.number().optional(),
  job: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  isLeader: Joi.number().valid(0, 1),
})

export const coworkerUserParams = Joi.object<CoworkersSchemaParams>({
  id: Joi.number().required(),
})
