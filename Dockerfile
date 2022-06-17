FROM alpine:3.16

RUN apk add --update --no-cache \
      nodejs yarn

RUN addgroup -S -g 1000 app && \
    adduser -S -h /app -s /sbin/nologin -u 1000 -G app app && \
    chown -R app:app /app

WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn install

COPY . .

RUN npx next build

USER app:app
