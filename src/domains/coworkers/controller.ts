import { Request, Response, Router } from 'express'
import { apiDocument } from '../../decorators/document.decorator'
import { Controller } from '../../utils'
import { coworkersRepository } from '../../repositories'
import { coworkerSchemaParamas, coworkerUserParams } from './schema'
import { schemaMiddleware } from '../../middlewares/schema.middleware'
import { OptionResponseReturn } from '../../lib/core-fp/fp'

enum UrlParams {
  COWERKERS = '/coworkers',
  COWORKERS_USER = '/coworkers/user',
}

class CoWorkersCheckContrller implements Controller {
  public initRoutes() {
    const r = Router()

    r.get(UrlParams.COWERKERS, this.getCoworkers)
    r.put(UrlParams.COWERKERS, schemaMiddleware(coworkerSchemaParamas), this.PutCoWorkers)
    r.get(UrlParams.COWORKERS_USER, schemaMiddleware(coworkerUserParams), this.getUserUseId)
    r.delete(UrlParams.COWERKERS, schemaMiddleware(coworkerUserParams), this.deleteUserUseId)
    return r
  }

  @apiDocument({
    url: UrlParams.COWERKERS,
    method: 'GET',
    description: 'get cowerkers list',
  })
  private async getCoworkers(req: Request, res: Response) {
    const users = await coworkersRepository.retrieve()

    return OptionResponseReturn(
      users,
      res,
      (res) => res.status(200).json(users),
      (res) => res.status(500).json(users)
    )
  }

  @apiDocument({
    url: UrlParams.COWERKERS,
    method: 'PUT',
    description: 'update coworker user',
  })
  private async PutCoWorkers(req: Request, res: Response) {
    const setData = await coworkersRepository.setData(req.body)
    return OptionResponseReturn(
      setData,
      res,
      (res) => res.status(200).json(setData),
      (res) => res.status(500).json(setData)
    )
  }

  @apiDocument({
    url: UrlParams.COWORKERS_USER,
    method: 'POST',
    description: 'get user use id',
  })
  private async getUserUseId(req: Request, res: Response) {
    const getUser = await coworkersRepository.retrieveFindById(req.body)
    return OptionResponseReturn(
      getUser,
      res,
      (res) => res.status(200).json(getUser),
      (res) => res.status(500).json(getUser)
    )
  }

  @apiDocument({
    url: UrlParams.COWERKERS,
    method: 'DELETE',
    description: 'delete user use id',
  })
  private async deleteUserUseId(req: Request, res: Response) {
    const deleteUser = await coworkersRepository.deleteById(req.body)
    return OptionResponseReturn(
      deleteUser,
      res,
      (res) => res.status(200).json(deleteUser),
      (res) => res.status(500).json(deleteUser)
    )
  }
}

export const coworkerController = new CoWorkersCheckContrller()
