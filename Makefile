export NEXT_TELEMETRY_DISABLED=1

.PHONY: install run build push clean

run:
	bun start

install:
	bun install

build:
	bun run next:build

push:
	git remote | xargs -I R git push R master

clean:
	rm -rf node_modules
	rm -rf .next
