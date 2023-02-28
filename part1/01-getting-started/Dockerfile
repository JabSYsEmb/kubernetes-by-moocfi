FROM node:alpine

WORKDIR /home/app

COPY ./package* .

RUN npm install 

COPY ./node.js .

ENTRYPOINT ["node", "node.js"]
