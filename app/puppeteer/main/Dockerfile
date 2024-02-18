# Use the official Node.js 14 image as a parent image
FROM node:14

# # Set environment variables
ARG INFLUX_API
ARG ORG_NAME
ARG BUCKET_NAME
ARG WRITE_USER_TOKEN

# Set environment variables
ENV INFLUX_API=$INFLUX_API \
    ORG_NAME=$ORG_NAME \
    BUCKET_NAME=$BUCKET_NAME \
    WRITE_USER_TOKEN=$WRITE_USER_TOKEN

# Set the working directory in the container
WORKDIR /usr/src/app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# Install any dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .
# CMD ["node", "datapoint.js"]

RUN chmod +x pushDatapointToInlfuxdb.sh  
# need to change this file

# # Set the command to run your script
# CMD ["./pushDatapointToInlfuxdb.sh"]
