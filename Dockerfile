# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /employee-gamification-app/

# Copy package.json and package-lock.json
COPY employee-gamification-app/package*.json ./

# Copy the rest of the application code
COPY employee-gamification-app/public/ public

COPY employee-gamification-app/src/ src

# Install dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 8080

# Define the command to run the app
CMD ["npm", "run", "start"]
