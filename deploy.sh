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

# Verarbeiten der optionalen Parameter
while getopts ":c:b:d:s:t:" opt; do
  case $opt in
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

(cd auth &&
    ./deploy.sh -a auth -b "${BUILD_OPTION}" -c "${CONTEXT}" -s "${SUBSTITUTE}" -t "${TAG}" frontend frontend-prod)
(cd container && 
    ./deploy.sh -a container -b "${BUILD_OPTION}" -c "${CONTEXT}" -s "${SUBSTITUTE}" -t "${TAG}" frontend frontend-prod)
(cd dafne &&
    ./deploy.sh -a dafne -b "${BUILD_OPTION}" -c "${CONTEXT}" -s "${SUBSTITUTE}" -t "${TAG}" frontend frontend-prod)
(cd marketing &&
    ./deploy.sh -a marketing -b "${BUILD_OPTION}" -c "${CONTEXT}" -s "${SUBSTITUTE}" -t "${TAG}" frontend frontend-prod)
(cd neighborhood &&
    ./deploy.sh -a neighborhood -b "${BUILD_OPTION}" -c "${CONTEXT}" -s "${SUBSTITUTE}" -t "${TAG}" frontend frontend-prod)
(cd theme &&
    ./deploy.sh -a theme -b "${BUILD_OPTION}" -c "${CONTEXT}" -s "${SUBSTITUTE}" -t "${TAG}" frontend frontend-prod)