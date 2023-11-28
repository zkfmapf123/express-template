import dotenv from 'dotenv'

export interface envParams {
  PORT: number
  DB_PORT: number
  DB_HOST: string
  DB_DATABASE: string
  DB_PASSWORD: string
}

dotenv.config({
  path: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod',
})

class EnvConfig {
  getEnv(): envParams {
    return {
      PORT: Number(process.env.PORT) || 3000,
      DB_PORT: Number(process.env.DB_PORT),
      DB_HOST: process.env.DB_HOST,
      DB_DATABASE: process.env.DB_DATABASE,
      DB_PASSWORD: process.env.DB_PASSWORD,
    }
  }
}

export const envConfig = new EnvConfig()
