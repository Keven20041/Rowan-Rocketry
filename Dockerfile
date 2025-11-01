# Use an official Node runtime as a parent image
FROM node:20

# Switch to a non-root user for better security
USER node

# Set the working directory in the container
WORKDIR /usr/src/rocketryweb

# Copy package.json and package-lock.json
COPY --chown=node:node package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the app's source code
COPY --chown=node:node . .

# The app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define the command to run the app using CMD which defines the runtime
CMD ["node", "server.js"]