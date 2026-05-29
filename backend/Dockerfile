FROM node:18-alpine
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --omit=dev
COPY backend/ ./
EXPOSE 5001
CMD ["node", "server.js"]
