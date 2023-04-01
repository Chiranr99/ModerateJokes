FROM node:17

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

ENV PORT=8098

EXPOSE 8098

CMD ["node", "server.js"]