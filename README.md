<p align="center">
    <img src="https://github.com/overshard/timelite/raw/master/static/logo.png"
         width="200"
         height="200"
         alt="Timelite Logo" />
</p>

# Timelite

Why is it 5 AM? Isn't there something simple I can use to track what I'm doing with all
this time?

https://timelite.app/

## Clone

For any possible way of running Timelite yourself you'll need a copy of the repo:

    git clone https://github.com/overshard/timelite.git

After you get the repo it's up to you how you want to use it. You can pull it onto a
server and run it via the docker production configuration. You can pull it locally and
either run it using now or docker to develop additional features/change things to your
liking. You can create your own Zeit Now account and deploy this there.

## Docker

For running everything via docker on both development and production. Have docker and
docker-compose installed. You may have to append `sudo` to these commands depending on
your system.

### Development

Have the `Remote - Containers` plugin installed for VSCode and
`Remote-Containers: Reopen in Container`, you can then just run `yarn start` to
have a fully functioning dev system.

### Production

Appending `-d` to the end after `up` will run this container in detached mode. We have
`restart: always` configured so on system restarts or possible crashes the container
will start back up automatically.

    docker-compose up

### Ports

To change which ports things run on you can update the `package.json` file's scripts.
You will also need to update the respective docker-compose files for dev or prod to
properly publish those ports.

### Troubleshooting

You may need to manually rebuild your docker container at times depending on changes
you have made that may not automatically trigger a rebuild. To do that you can run
either of the above commands, depending on your environment, and replace `up` with
`build`.

## Local & Zeit

For running everything natively with a zeit now deployment.

### Install

Have node version 8 or higher with npm installed and run:

    npm i -g now
    npm i

### Running

I'm deploying this project to now.sh so I use the now cli util, that's run automatically
through npm:

    npm start

### Deploying

Goes to now:

    npm run deploy

## Sponsors

Where I work, VanNoppen Marketing (https://www.vannoppen.co/), they let me code stuff on
my free time and do whatever I want with it. If you need some custom software written or
a new website check us out, we're pretty good at what we do.
