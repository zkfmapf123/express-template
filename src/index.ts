import express from 'express'
import morgan from 'morgan'
import { envConfig } from './configs/env.config'
import { HttpConnector } from './configs/http.config'

const { PORT } = envConfig.getEnv()
const httpConnect = new HttpConnector(express(), PORT, process.env.NODE_ENV)

httpConnect
  .setHTTPMiddleware(morgan('tiny'))
  .setHTTPMiddleware(express.json())
  .setHTTPMiddleware(express.urlencoded({ extended: false }))
  .setErrorHandling()
  .start(process.env.NODE_ENV === 'dev' ? false : true)
