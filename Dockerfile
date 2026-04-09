FROM oven/bun:alpine

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY package.json bun.lock /app/
RUN bun install --frozen-lockfile

COPY . .

RUN bun run next:build

USER bun
