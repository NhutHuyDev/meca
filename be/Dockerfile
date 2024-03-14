FROM node:20-alpine

WORKDIR /meca/be

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY ./src/templates/*.html ./dist/src/templates/

COPY ./src/templates/img.template/* ./dist/src/templates/img.template/

EXPOSE 8080

CMD [ "npm","start"]

