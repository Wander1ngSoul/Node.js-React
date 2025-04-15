FROM node:18-alpine as build
WORKDIR /app
COPY packge&.json ./
RUN npm install

COPY . .
RUN npm run build
FROM nginx:apline
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80