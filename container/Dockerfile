FROM node:18-alpine
WORKDIR /container-app/
COPY public/ /container-app/public
COPY src/ /container-app/src
COPY config/ /container-app/config
COPY package.json /container-app/
RUN npm install
RUN npm run build
COPY dist /container-app/dist
CMD ["npm", "start"]