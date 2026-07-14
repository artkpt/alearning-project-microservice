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

COPY packages/ /app/packages

RUN npm ci 

COPY . .

RUN npm run build:backend

RUN npm ci --omit="dev" -w=alearning-backend

CMD [ "node", "apps/alearning-backend/build/bin/server.js" ]







