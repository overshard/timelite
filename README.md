<p align="center">
    <img src="https://raw.githubusercontent.com/overshard/timelite/master/public/static/logo.png"
         width="200"
         height="200"
         alt="Timelite Logo" />
</p>

# Timelite

Why is it 5 AM? Isn't there something simple I can use to track what I'm doing
with all this time?

https://timelite.bythewood.me/


## Why?

I want to casually track the time I spend on things without any overhead of
signing into a service or even being online. All data stays in your browser
(IndexedDB via localForage), there is no backend, and nothing is tracked or
sent anywhere.

Timelite has been a pretty great companion for me with more aggressive team
management software solutions that sometimes don't allow me to swap between
projects quickly and track time easily. I tend to hop from project to project
and task to task regularly. Larger solutions have a lot of overhead for basic
time tracking. I tend to track my time here and then input that time at the end
of the day or increments that make more sense.

For an overview of how to get this project running and why it's useful check out
the DB Tech video on it here: https://www.youtube.com/watch?v=woG6qOmxlOA


## Features

- **Timer** with pause/resume and `#hashtag` note support
- **Log** with per-day grouping, tag filtering, inline edit, manual entry,
  and import/export (CSV, JSON, Markdown)
- **Summary** with charts for hours-per-tag and hours-per-day
- **Keyboard shortcuts** — press `?` anywhere to see the full map
- **Offline-first PWA** — installable, all data stays in IndexedDB


## Clone

For any possible way of running Timelite yourself you'll need a copy of the
repo:

    git clone https://github.com/overshard/timelite.git

After you get the repo it's up to you how you want to use it.


## Development

You will need to have `bun` installed. If you don't have it yet, visit
https://bun.sh/ for installation instructions. After that you can run:

    bun install
    bun start

This will spin up Timelite to run on port 8000 which you can access via a
browser at `http://localhost:8000`.


## Production

Install Docker and docker-compose, then run the container on any server.
`restart: unless-stopped` is configured so the container comes back up after
system restarts or crashes. Appending `-d` runs it in detached mode:

    docker-compose up -d


## Ports

To change which ports things run on you can update the `package.json` file's
scripts. You will also need to update the `docker-compose.yml` file, if you use
that, to properly publish the new port.


## Troubleshooting

You may need to manually rebuild your docker container at times depending on
changes that have been made that may not automatically trigger a rebuild. To do
that you can run:

    docker-compose up -d --build

The `up` implies that you want to start the server again, `--build` will rebuild
the container and `-d`, as stated above, starts us in detached mode so you can
set it and forget it.

If you previously used an older version and now see stale service-worker /
filesystem errors in the console, the app now unregisters any old service
workers on load. A hard refresh (Ctrl+Shift+R) will clear them after one visit.
