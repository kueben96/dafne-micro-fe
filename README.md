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

For typescript migration install 

npm install --save-dev @babel/preset-typescript typescript @types/react @types/react-dom