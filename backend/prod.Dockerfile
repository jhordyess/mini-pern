FROM node:18-alpine

# RUN npm i -g npm

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

COPY prisma ./prisma
COPY src ./src
COPY cmd.prod.sh ./

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ENV PORT=3000

RUN yarn prisma generate

EXPOSE 3000

CMD ["./cmd.prod.sh"]