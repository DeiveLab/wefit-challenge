FROM node:18.15.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4568

RUN npx prisma migrate dev

CMD [ "npm", "start" ]