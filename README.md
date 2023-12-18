# DaFne Micro-Frontend App

- Design Files: https://www.figma.com/file/WLF8iTjZjvnc58rI6xMdHH/DaFne_UI?node-id=31%3A21&t=G4lABVcnh6X5yhti-1
- UI Component Library: Material UI
- Vertical Split Micro-Frontend-Architecture 
- Resources: O'Reilly; Building Micro-Frontends - Scaling Teams and Projects, Empowering Developers. (Luca Mezzalira)


## Integration into Medusa Module Federation Dashboard

- cd into each application run `npm run build && npm run serve`
- or in root directory run `npm run serve`
- on https://app.medusa.codes/applications: check remotes and select remote version for each micro frontend
- Note: If you only want to upload the versions to medusa, npm start is sufficient but if you want to switch between the remotes, you should serve the dist folder
- Dont name the versions with dots e.g. "1.0.0.Blue" -> application crashes


## For dockerized applications:
- run ```docker-compose up --build```: all dev servers and the mock server are running on the same addresses. entry point is localhost:8080 for container
- the dist folders are copied inside the container

## Micro-Frontends setup instruction
- cd to root directory
- run ```docker-compose up --build```: stub server is running on localhost:8086
- run ```npm run start```: this will install and start following applications
- **container localhost:8080:** entry point for composed applications
- **marketing localhost:8081:** landing page. click 'auth' to navigate to authentication
- **auth localhost:8082:** enter user"jenny.smith@test.com" and password "user_pass" and click login
- **dafne localhost:8083:** main platform functionalities including neighborhood generation
- **theme localhost:8085:** micro-frontends consume theme from this remote
  - **theme localhost:8087:** remote Vue.js application of dafne


### notes for the developer
For typescript migration install 

npm install --save-dev @babel/preset-typescript typescript @types/react @types/react-dom