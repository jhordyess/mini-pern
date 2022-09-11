FROM node:16
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
RUN apt-get update --no-install-recommends \
  && apt-get upgrade -y \
  && apt-get autoremove --purge -y
RUN npm i -g npm
WORKDIR /usr/src/app
COPY ./backend .
RUN npm i
RUN npm run db:build
EXPOSE 4062
CMD [ "npm", "start" ]