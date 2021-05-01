# 실행 명령어
#   $ docker build -t {image_tag} .
#   $ docker run -d -p {prefer_port}:8081 {image_tag}

# Create Node Docker container
FROM node:latest
MAINTAINER tairian20002@gmail.com

# Copy sources to container
COPY . /usr/src/app

# Change working directory in container
WORKDIR /usr/src/app

# Install npm dependency
RUN yarn install

# Open port 8081
EXPOSE 8081

# Run
CMD yarn start
