# DaFne Micro-Frontend App

- Design Files: https://www.figma.com/file/WLF8iTjZjvnc58rI6xMdHH/DaFne_UI?node-id=31%3A21&t=G4lABVcnh6X5yhti-1

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

### Kubernetes deployment
* needs access to the gitlab repository
* simply do
```shell
./deploy.sh -b true -c $CONTEXT -s true frontend frontend-prod
```
to build and deploy every pod of the frontend.
* Each pod can be individually build from within its directory:
```shell
cd auth
usage: ./deploy.sh [-h | --help] [Optional -b] [Optional -c] [Optional -d] [Optional -t] <service_group> <service_name>
    -b = buildoption           the option of build image from Repo can be true or false default=false
    -c = context               kubectl context to deploy to, default=dafne@k8.smsy.haw-hamburg.de (production)
    -d = deploy_file           the filename for the file which will be deployed default=deploy.yml / deploy_minikube.yml
    -s = substitute            this option defines if you want to substitute filename with context default=false
    -t = tag                   the tag if you want to build an image deafult=latest
    service_group              the path of the service for docker, e.g [experiments/]
    service_name               the name of the service to deploy

./deploy.sh -a auth -b true -c $CONTEXT frontend frontend-prod
```
* if `-c minikube` and `-s true` are set, the deployment will happen on your local machine.