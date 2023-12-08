#!/bin/bash -e

APP=$0
SERVICE_PATH_PREFIX="git.haw-hamburg.de:5000/dafne"

printHelp() {
  echo "usage: ""${APP}"" [-h | --help] [Optional -b] [Optional -c] [Optional -d] [Optional -t] <service_group> <service_name>"
  echo "    -b = buildoption           the option of build image from Repo can be true or false default=false"
  echo "    -c = context               kubectl context to deploy to, default=dafne@k8.smsy.haw-hamburg.de (production)"
  echo "    -d = deploy_file           the filename for the file which will be deployed default=deploy.yml / deploy_minikube.yml"
  echo "    -s = substitute            this option defines if you want to substitute filename with context default=false"
  echo "    -t = tag                   the tag if you want to build an image deafult=latest"
  echo "    service_group              the path of the service for docker, e.g [experiments/]"
  echo "    service_name               the name of the service to deploy"
  echo "example: ./deploy.sh -c minikube -d kafdrop-deploy.yml infrastructure kafka"
  exit 1
}

CONTEXT="dafne@k8.smsy.haw-hamburg.de"
BUILD_OPTION="false"
DEPLOY_FILE="deploy.yml"
TAG="latest"
SUBSTITUTE="false"

# Verarbeiten der optionalen Parameter
while getopts "a:c:b:d:s:t:" opt; do
  case $opt in
    a)
      MICRO_APP="$OPTARG"
      ;;
    c)
      CONTEXT="$OPTARG"
      ;;
    b)
      BUILD_OPTION="$OPTARG"
      ;;
    d)
      DEPLOY_FILE="$OPTARG"
      ;;
    s)
      SUBSTITUTE="$OPTARG"
      ;;
    t)
      TAG="$OPTARG"
      ;;
    \?)
      echo "Ungültige Option: -$OPTARG" >&2
      exit 1
      ;;
  esac
done

# Verschieben der verarbeiteten Optionen, um nicht verarbeitete Argumente zu erhalten
shift $((OPTIND-1))

if [[ "$1" =~ ^- ]]; then
  printHelp
fi

if [[ -z "$2" ]]; then
  printHelp
fi


SERVICE_GROUP=$1
SERVICE_NAME=$2
DOCKER_TAG="${SERVICE_PATH_PREFIX}/${SERVICE_GROUP}/${SERVICE_NAME}/${MICRO_APP:${TAG}}"

if [[ "$SUBSTITUTE" == "true" ]]; then
  echo "Filename: ${DEPLOY_FILE}"
  DEPLOY_FILE_PREFIX="${DEPLOY_FILE%.*}"  # Entfernen der Endung (.yml)
  echo "Fileprefix: ${DEPLOY_FILE_PREFIX}"
  DEPLOY_FILE="${DEPLOY_FILE_PREFIX}_${CONTEXT}.yml"
fi

if [[ "$CONTEXT" == "minikube" ]]; then
  echo "switching to minikube docker"
  eval $(minikube -p minikube docker-env)
fi

if [[ "$BUILD_OPTION" == "true" ]]; then
  echo building application with tag "${DOCKER_TAG}" 
  npm ci
  npm run build
  docker build -t "${DOCKER_TAG}" .
  docker push "${DOCKER_TAG}"
fi

echo Deploying file "${DEPLOY_FILE}" to "${CONTEXT}"
kubectl apply -f "${DEPLOY_FILE}" --context="${CONTEXT}" -n dafne