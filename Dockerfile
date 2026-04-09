FROM oven/bun:latest

ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1000 app && \
    adduser --system --home /app --shell /sbin/nologin --uid 1000 --ingroup app app && \
    chown -R app:app /app

WORKDIR /app

COPY package.json bun.lock /app/
RUN bun install --frozen-lockfile

COPY . .

RUN bun run next:build

USER app:app
