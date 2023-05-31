FROM node:19.1.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package.json /usr/src/app/package.json
COPY yarn.lock /usr/src/app/yarn.lock
 
RUN yarn install --frozen-lockfile
RUN apt-get update
RUN apt-get install -y vim

# Copying local source files to container
COPY . .

# Buildign app
RUN yarn build
EXPOSE 3000
ENV PORT 3000

# Running the app
CMD ["yarn", "dev"]