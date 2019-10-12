# Timelite

Why is it 5 AM? Isn't there something simple I can use to track what I'm doing with all
this time?

## Docker

For running everything via docker on both development and production. Have docker and
docker-compose installed. You may have to append `sudo` to this commands depending on
your system.

### Development

    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

### Production

    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

### Ports

To change which ports things run on you can update the `package.json` file's scripts.
You will also need to update the respective docker-compose files for dev or prod to
properly publish those ports.

### Troubleshooting

You may need to manually rebuild your docker instances at times depending on changes
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
