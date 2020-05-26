# Load node server
FROM node:10

# Change working dir to /server
WORKDIR /server

# Add files from current to /app
COPY package.json /server/package.json

# Install node packages 
RUN npm install

# If you are building your code for production
RUN npm ci --only=production

# Add source files
COPY . .

# Expose the port
EXPOSE 3000

# Run the build
CMD [ "npm", "start" ];
