
FROM node:18 AS builder

WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .
RUN pnpm build

FROM node:18 AS runner
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/package.json ./package.json

EXPOSE 3000
ENV NODE_ENV=production

CMD ["pnpm", "start"]