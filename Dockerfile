FROM node:10

WORKDIR /app

RUN npm i -g now

COPY package.json package-lock.json /app/
RUN npm i

COPY . .

RUN npm i
