<p align="center">
    <img src="https://github.com/overshard/timelite/raw/master/public/static/logo.png"
         width="200"
         height="200"
         alt="Timelite Logo" />
</p>

# Timelite

Why is it 5 AM? Isn't there something simple I can use to track what I'm doing
with all this time?

https://timelite.app/

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

## Production

Appending `-d` to the end after `up` will run this container in detached mode.
We have `restart: always` configured so on system restarts or crashes the
container will start back up automatically.

    docker-compose up

## Ports

To change which ports things run on you can update the `package.json` file's
scripts. You will also need to update the docker-compose file production to
properly publish the new port.

## Troubleshooting

You may need to manually rebuild your docker container at times depending on
changes that have been made that may not automatically trigger a rebuild. To do
that you can run:

    docker-compose build

## Sponsors

Where I work, VanNoppen Marketing (https://www.vannoppen.co/), they let me code
stuff on my free time and do whatever I want with it. If you need some custom
software written or a new website check us out, we're pretty good at what we do.
