FROM node:alpine

WORKDIR /home/app

COPY ./package* .

RUN npm install

COPY ./public ./public/

COPY ./index.js .

ENTRYPOINT ["node", "index.js"]
