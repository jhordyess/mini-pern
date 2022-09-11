FROM node:16 as build
RUN apt-get update --no-install-recommends \
  && apt-get upgrade -y \
  && apt-get autoremove --purge -y
RUN npm i -g npm
WORKDIR /app
COPY ./frontend ./
RUN npm i
RUN npm run build

FROM nginx:latest
RUN apt-get update --no-install-recommends \
  && apt-get upgrade -y \
  && apt-get autoremove --purge -y
COPY --from=build /app/docs /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3640
CMD ["nginx", "-g", "daemon off;"]