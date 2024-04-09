FROM node:18-alpine as build

WORKDIR /app

COPY src ./src
COPY package.json .eslintrc.cjs index.html vite.config.js ./

RUN yarn

RUN yarn build


FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist .

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3640

CMD ["nginx", "-g", "daemon off;"]