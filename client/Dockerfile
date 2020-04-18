FROM node:10-alpine

ARG CACHEBUST=1 
COPY ./ /

ENV apiRoot=http://localhost:3005
ENV WSURL=http://localhost:3005

RUN npm install && npm run build
RUN npm install -g serve

EXPOSE 3000

ENTRYPOINT ["serve", "./build"]