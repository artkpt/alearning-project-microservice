FROM node:22-alpine3.22 AS base

WORKDIR /app

COPY note-service/package*.json note-service/


FROM base AS dev

WORKDIR /app/note-service/

RUN npm install

COPY note-service/ ./

CMD ["npm", "run", "dev"]

EXPOSE 3333


FROM base AS prod

WORKDIR /app/note-service/

COPY note-service/ ./

RUN npm ci

RUN npm run build

WORKDIR /app/note-service/build

RUN npm ci --omit="dev"

CMD [ "node", "bin/server.js" ]







