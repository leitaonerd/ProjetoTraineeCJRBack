FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

COPY .env ./

RUN npm run build

EXPOSE 3001

CMD ["npm","run","start"]