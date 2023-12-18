FROM node:18-alpine
WORKDIR /auth-app/
COPY public/ /auth-app/public
COPY src/ /auth-app/src
COPY config/ /auth-app/config
COPY package.json /auth-app/
RUN npm install
RUN npm run build
COPY dist /auth-app/dist
CMD ["npm", "start"]