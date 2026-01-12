FROM node:24 AS base

LABEL authors="felipeoliveirasouza"

WORKDIR /usr/src/app
COPY package*.json ./

FROM base AS deps
RUN npm ci --only-production

FROM base AS dev-deps
RUN npm ci

FROM dev-deps AS dev
COPY . .
ENV NODE_ENV=dev
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

FROM dev-deps AS builder
COPY . .
RUN npm run build

FROM node:24-slim AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=prod
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./
EXPOSE 3000
ENTRYPOINT ["node", "dist/main"]