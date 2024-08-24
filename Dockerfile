# Use the official Node.js image.
FROM node:18

# Set the working directory.
WORKDIR /usr/src/app

# Install dependencies.
COPY package*.json ./
RUN npm install

# Copy the rest of the application code.
COPY . .

# Expose port and start the server.
EXPOSE 3000
CMD [ "npm", "start" ]
