FROM node:18.1.0

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .


RUN yarn build


EXPOSE 3000


CMD ["yarn", "dev"]
