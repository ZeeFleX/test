FROM node:10-alpine

ARG CACHEBUST=1 
COPY ./ /

RUN yarn install && yarn compile

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]