FROM node:18-alpine as builder 

WORKDIR /usr/src/app

COPY package*.json .
COPY tsconfig.json .
COPY rollup.config.js .

RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine as runner

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist dist
COPY --from=builder /usr/src/app/package*.json ./

RUN npm install --omit=dev

CMD ["node", "dist/index.js"]