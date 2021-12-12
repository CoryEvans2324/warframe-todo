FROM node:16.13.0-alpine3.14 as deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

FROM node:16.13.0-alpine3.14 as builder

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build && npm prune --production


FROM node:16.13.0-alpine3.14 as runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/src/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD [ "node_modules/.bin/next", "start" ]