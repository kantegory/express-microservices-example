FROM node:20 AS builder

ENV NODE_ENV production

WORKDIR /var/www/apps/student
COPY . /var/www/apps/student

RUN npm install --omit=optional

RUN npm run build


FROM node:20 AS prod

ENV NODE_ENV production

WORKDIR /var/www/apps/student
COPY --from=builder /var/www/apps/student/dist /var/www/apps/student
COPY --from=builder /var/www/apps/student/node_modules /var/www/apps/student/node_modules

CMD node /var/www/apps/student/index.js
