FROM node:20 AS builder

ENV NODE_ENV production

WORKDIR /var/www/apps/queue
COPY . /var/www/apps/queue

RUN npm install --omit=optional

RUN npm run build


FROM node:20 AS prod

ENV NODE_ENV production

WORKDIR /var/www/apps/queue
COPY --from=builder /var/www/apps/queue/dist /var/www/apps/queue
COPY --from=builder /var/www/apps/queue/node_modules /var/www/apps/queue/node_modules

CMD node /var/www/apps/queue/index.js
