FROM node:18-alpine as builder 

WORKDIR /usr/src/app

COPY package*.json .
COPY tsconfig.json .
COPY rollup.config.js .

RUN npm install -g pnpm && \
    pnpm install

COPY . .
RUN pnpm run build

RUN rm -rf node_modules && \
    pnpm install --production

FROM node:18-alpine as runner

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist dist
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules node_modules

CMD ["sh", "-c", "sleep 10 && node dist/index.js"]