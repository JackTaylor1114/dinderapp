FROM node:latest

WORKDIR /usr/src/app/

ADD package.json /usr/src/app/

RUN npm install --verbose

ADD ./src/ /usr/src/app/src/
ADD ./ts*json /usr/src/app/
ADD ionic.config.json /usr/src/app/

CMD ["npm", "start"]