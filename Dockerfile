
FROM node:18 AS builder

WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm build

FROM node:18 AS runner
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/.next/static ./.next/static
COPY --from=builder /usr/src/app/public ./public

EXPOSE 3000
ENV NODE_ENV=production

CMD ["node", "server.js"]