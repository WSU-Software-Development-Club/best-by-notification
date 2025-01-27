# Base image
FROM node:18 as build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the source code
COPY . .

# Pass build argument to React build process
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}

# Build React app
RUN npm run build

# Use a lightweight web server to serve the built files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
