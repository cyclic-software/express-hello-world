FROM node:14-alpine
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install
# Copy app files
COPY . .
# Expose port
EXPOSE 3000
# Start the app
CMD [ "yarn", "start" ]