FROM node:0.10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN groupadd -r node \
&&  useradd -r -m -g node node

COPY . /usr/src/app/
RUN chown -R node:node /usr/src/app

USER node
RUN npm install 

WORKDIR /usr/src/app/dist # change to distribution folder
ENV NODE_ENV production
CMD [ "npm", "start" ]
EXPOSE 8080