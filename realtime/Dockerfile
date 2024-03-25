FROM node:20-alpine

WORKDIR /meca/realtime

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD [ "npm","start"]

