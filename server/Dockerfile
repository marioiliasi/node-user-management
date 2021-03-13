FROM alpine:latest

USER root

RUN apk add --update nodejs npm

RUN node -v

ADD src ./user/src

COPY package.json ./user
COPY package-lock.json ./user
COPY tsconfig.json ./user

WORKDIR user

RUN npm install
RUN npm run compile

EXPOSE 3000

CMD ["node", "src/app/mongo.ts"]
