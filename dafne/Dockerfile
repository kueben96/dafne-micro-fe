FROM node:18-alpine
WORKDIR /dafne-app/
COPY public/ /dafne-app/public
COPY src/ /dafne-app/src
COPY config/ /dafne-app/config
COPY package.json /dafne-app/
RUN npm install
RUN npm run build
COPY dist /dafne-app/dist
CMD ["npm", "start"]