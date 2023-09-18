FROM node:18-alpine as build

# RUN npm i -g npm

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

COPY src ./src
COPY .eslintrc.cjs .prettierrc index.html vite.config.js ./

RUN yarn build


FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist .

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3640

CMD ["nginx", "-g", "daemon off;"]