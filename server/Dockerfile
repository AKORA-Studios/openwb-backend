# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci -q




# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
RUN npm i -g typescript
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN tsc





# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs\
    && adduser -S nextjs -u 1001 
#    && chsh -s /usr/sbin/nologin root

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
COPY --from=builder /app/src ./src
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
# COPY --from=builder --chown=nextjs:nodejs /app/.env ./.env


EXPOSE 3000
ENV PORT 3000

RUN mkdir /app/test
VOLUME [ "/app/test" ]

# Show current folder structure in logs
#RUN ls -al -R -I "node_modules" -I "maps"  -I "dists"
USER nextjs
CMD [ "node",  "./dist/index.js" ]