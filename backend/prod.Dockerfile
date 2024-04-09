FROM node:18-alpine

WORKDIR /app

COPY package.json cmd.prod.sh ./
COPY prisma ./prisma
COPY src ./src

RUN yarn

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["./cmd.prod.sh"]