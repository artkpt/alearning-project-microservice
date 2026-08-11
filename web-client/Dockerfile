FROM node:22-alpine3.22 AS base

WORKDIR /app

COPY web-client/package*.json web-client/


FROM base AS dev

WORKDIR /app/web-client

RUN npm install

COPY web-client/ ./

EXPOSE 5173

CMD ["npm", "run", "dev"]



FROM base AS build

WORKDIR /app/web-client

RUN npm ci

COPY web-client/ ./

RUN npm run build

FROM nginx:1.26-alpine AS prod

COPY --from=build /app/web-client/dist/ /usr/share/nginx/html

COPY web-client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

