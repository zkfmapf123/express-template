import dotenv from 'dotenv'

interface envParams {
  PORT: number
}

dotenv.config({
  path: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod',
})

class EnvConfig {
  getEnv(): envParams {
    return {
      PORT: Number(process.env.PORT) || 3000,
    }
  }
}

export const envConfig = new EnvConfig()
