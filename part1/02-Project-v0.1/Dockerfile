FROM node:alpine

WORKDIR /home/app

COPY ./package*.json .

RUN npm install

COPY ./index.js .

CMD ["node", "index.js"]
