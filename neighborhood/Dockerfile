FROM node:18-alpine
# install simple http server for serving static content
# RUN npm install -g http-server
WORKDIR /neighborhood-app
COPY public/ /neighborhood-app/public
COPY src/ /neighborhood-app/src
COPY config/ /neighborhood-app/config
COPY package*.json /neighborhood-app
RUN npm install
RUN npm run build
COPY dist /neighborhood-app/dist
EXPOSE 8087
# CMD [ "http-server", "dist" ]
CMD ["npm", "start"]