<p align="center">
    <img src="https://raw.githubusercontent.com/overshard/timelite/master/public/static/logo.png"
         width="200"
         height="200"
         alt="Timelite Logo" />
</p>

# Timelite

Why is it 5 AM? Isn't there something simple I can use to track what I'm doing
with all this time?

https://timelite.app/


## Why?

I want to casually track the time I spend on things without any overhead of
signing into a service or even being online. Timelite is a progressive web app
and works just fine without an internet connection, all data is stored locally
and I don't track anything.

Timelite has been a pretty great companion for me with more aggressive team
management software solutions that sometimes don't allow me to swap between
projects quickly and track time easily. I tend to hop from project to project
and task to task regularly. Larger solutions have a lot of overhead for basic
time tracking. I tend to track my time here and then input that time at the end
of the day or increments that make more sense.


## Clone

For any possible way of running Timelite yourself you'll need a copy of the
repo:

    git clone https://github.com/overshard/timelite.git

After you get the repo it's up to you how you want to use it.


## Development

You will need to have a version of `node` installed and `yarn`. If you already
have `node` but don't know if you have yarn you probably just have `npm` and
can install yarn with `npm i -g yarn`. After that you can run:

    yarn install
    yarn start

This will spin up Timelite to run on port 8000 which you can access via a
browser at `http://localhost:8000`.

I won't really go into how to get `node` installed here, if you need help with
that feel free to submit an issue but the best place to start would be just
searching for `how to install node on <your operating system here>`. There are
plenty of great guides out there as it is very popular.


## Production

You can either push to [Vercel](https://vercel.com/) with an update to the
`vercel.json` file to change the alias or install Docker and docker-compose and
use that on any server.

With docker appending `-d` to the end after `up` will run this container in
detached mode. We have `restart: unless-stopped` configured so on system
restarts or crashes the container will start back up automatically.

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
