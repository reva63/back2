FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run the app with a minimal image
FROM node:20-alpine

WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy the built application
COPY --from=build /app/dist ./dist

# Expose port and set environment variables
EXPOSE 5000
ENV NODE_ENV production

CMD ["node", "dist/main"]