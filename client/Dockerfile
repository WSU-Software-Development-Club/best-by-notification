# Stage 1: Build the React app
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application into the container
COPY . .

# Build the app for production
RUN npm run build

# Stage 2: Serve the React app using a lightweight server
FROM nginx:alpine

# Copy the production build from Stage 1
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the nginx server
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
