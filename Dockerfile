FROM node:17-alpine as builder
WORKDIR /app
COPY package-lock.json .
COPY package.json .
RUN npm install 
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]