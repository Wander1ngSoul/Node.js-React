FROM node

COPY package*.json ./
RUN npm install
COPY ../client .

RUN npm run build

RUN apk add --no-cache python3 make g++

EXPOSE 5000

CMD ["npm", "start", "dev"]

