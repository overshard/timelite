FROM node:10

WORKDIR /app

COPY package.json package-lock.json /app/
RUN yarn install

COPY . .

RUN yarn run build:prod
