# node-boilerplate v2

## Prestart

```sh
    sh alias.sh

    npm install       -> pnpm install
    npm install [lib] -> pnpm add [lib]
    npm run build     -> pnpm run build
```

## Tech

- pnpm
- rollup (bundler)
- express + typescript
- Joi
- Sequalize (DB Connect)
- docker + docker-compose

## Folder Architecture

```sh
    |- src                      ## Root Folder
        |- configs              ## App 구동시 필요한 설정들 입니다.
        |- middlewares          ## Middleware 목록입니다
        |- base                 ## Model
        |- repositores          ## DB Layer
        |- domains              ## Domain
            |- ...services      ## Domain Services
        |- utils                ## Utils
```

```sh
    |- lib
        |- core-fp              ## 함수형 프로그래밍 lib
```

## Reference

- <a href="https://sequelize.org/docs/v6/core-concepts/raw-queries/"> Sequalize Raw Queries</a>

- <a href="https://pnpm.io/ko/pnpm-cli"> pnpm </a>
