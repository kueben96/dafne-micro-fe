FROM node:18-alpine
WORKDIR /marketing-app/
COPY public/ /marketing-app/public
COPY src/ /marketing-app/src
COPY config/ /marketing-app/config
COPY package.json /marketing-app/
RUN npm install
RUN npm run build
COPY dist /marketing-app/dist
CMD ["npm", "start"]