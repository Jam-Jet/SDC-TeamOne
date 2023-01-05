FROM node:alpine

#sets the working directory to app
WORKDIR /app

#copies package.json to app folder
COPY package*.json ./

#install dependencies
RUN npm install

#copy files over
COPY . .

ENV PORT 3003
EXPOSE 3003

CMD node server.js
