FROM node:20.19.5-alpine3.22

LABEL owner="mgmengalidevops@gmail.com"

WORKDIR /app

RUN adduser devops --disabled-password --gecos ""

COPY package*.json .

RUN npm install

COPY --chown=devops:devops --chmod=755 . .

EXPOSE 3000

USER devops

ENTRYPOINT [ "node", "index.js" ]