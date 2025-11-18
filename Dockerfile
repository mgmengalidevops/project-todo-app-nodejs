FROM ubuntu

LABEL owner="mgmengalidevops@gmail.com"

ARG NODE_VERSION=20

WORKDIR /app

RUN apt update && \
  apt-get install -y curl && \
  curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - && \
  apt-get install -y nodejs && \
  echo "Node Version: " && node -v

RUN adduser devops --disabled-password --gecos ""

COPY --chown=devops:devops --chmod=755 . .

EXPOSE 3000

RUN npm install

USER devops

ENTRYPOINT [ "node", "index.js" ]