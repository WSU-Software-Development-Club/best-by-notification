# Use Alpine as the base image
FROM alpine:3.20

# Set the Node.js version to install
ENV NODE_VERSION=22.13.1

# Set the working directory
WORKDIR /app

# Install Node.js and npm
RUN apk add --no-cache nodejs npm

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application into the container
COPY . .

# Build the app
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
