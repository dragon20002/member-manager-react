# Create Node Docker container
FROM node:latest
MAINTAINER dragon20002@naver.com

# Copy sources to container
COPY . /usr/src/app

# Change working directory in container
WORKDIR /usr/src/app

# Install npm dependency
RUN npm install

# Open port 8081
EXPOSE 8081

# Run
CMD npm run serve
