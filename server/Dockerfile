# Load node server
FROM node:10

# Change working dir to /server
WORKDIR /server

# Add files from current to /app
COPY package.json /server/package.json

# Install node packages 
RUN npm install

# Add source files
COPY . .

# Run the build
CMD [ "npm", "start" ];

# Expose the port
EXPOSE 5000