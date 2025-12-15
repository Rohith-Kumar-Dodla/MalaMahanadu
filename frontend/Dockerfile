# -------- BUILD STAGE --------
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files first (for caching)
COPY package.json package-lock.json ./

RUN npm install

# Copy the rest of the frontend
COPY . .

# Build the Vite app
RUN npm run build

# -------- PRODUCTION STAGE --------
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built frontend files
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
