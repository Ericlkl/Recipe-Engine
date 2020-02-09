# use node as the base images
FROM node

# Setting /app as the working directory
WORKDIR /app
# Copy all the files to /app
COPY . /app

RUN npm run project-install

EXPOSE 5000

CMD npm run start