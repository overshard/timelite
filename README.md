# Timelite

Why is it 5 AM? Isn't there something simple I can use to track what I'm doing with all
this time?

## Docker

For running everything via docker.

### Install

Have docker and docker-compose installed and run:

    docker-compose build

### Running

    docker-compose up

## Local

For running everything natively.

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
