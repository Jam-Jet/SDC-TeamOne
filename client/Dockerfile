FROM node:alpine

#sets the working directory to app
WORKDIR /app

#copies package.json to app folder
COPY package*.json ./

#install dependencies
RUN npm install

#copy files over
COPY . .

#build vite site
RUN npm run build

EXPOSE 3004

CMD node webserver.cjs