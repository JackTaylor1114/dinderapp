# dinderapp

An incredibly useful app for assessing chair designs! There are no similarities in the design with the "Tinder" app.

### Installation

To get it running, download the folder and execute `npm install`.

Then execute `ionic serve` to run the app.

### Requirements

| What?      | Where?        | 
| -----------|:-------------:| 
| Nodejs      | https://nodejs.org/en/ | 
| Ionic     | `npm install -g ionic`   |  


### Run with Docker

#### Requirements

- Docker 18.09 or later
- docker-compose 1.23.2 or later

#### Build image

`docker build -t local/dinder .`

#### Run the Dinder App

`docker-compose up`

visit http://localhost:8100/