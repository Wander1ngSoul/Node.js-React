FROM node

COPY package*.json ./
RUN npm install
COPY . .

RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

EXPOSE 5000

CMD ["npm", "start", "dev"]

