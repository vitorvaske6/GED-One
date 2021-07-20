#!/bin/sh

export COMPOSE_FILE_PATH="${PWD}/target/classes/docker/docker-compose.yml"

if [ -z "${M2_HOME}" ]; then
  export MVN_EXEC="mvn"
else
  export MVN_EXEC="${M2_HOME}/bin/mvn"
fi

start() {
    docker volume create gedone-acs-volume
    docker volume create gedone-db-volume
    docker volume create gedone-ass-volume
    docker-compose -f "$COMPOSE_FILE_PATH" up --build -d
}

start_share() {
    docker-compose -f "$COMPOSE_FILE_PATH" up --build -d gedone-share
}

start_acs() {
    docker-compose -f "$COMPOSE_FILE_PATH" up --build -d gedone-acs
}

down() {
    if [ -f "$COMPOSE_FILE_PATH" ]; then
        docker-compose -f "$COMPOSE_FILE_PATH" down
    fi
}

purge() {
    docker volume rm -f gedone-acs-volume
    docker volume rm -f gedone-db-volume
    docker volume rm -f gedone-ass-volume
}

build() {
    $MVN_EXEC clean package
}

build_share() {
    docker-compose -f "$COMPOSE_FILE_PATH" kill gedone-share
    yes | docker-compose -f "$COMPOSE_FILE_PATH" rm -f gedone-share
    $MVN_EXEC clean package -pl gedone-share,gedone-share-docker
}

build_acs() {
    docker-compose -f "$COMPOSE_FILE_PATH" kill gedone-acs
    yes | docker-compose -f "$COMPOSE_FILE_PATH" rm -f gedone-acs
    $MVN_EXEC clean package -pl gedone-integration-tests,gedone-platform,gedone-platform-docker
}

tail() {
    docker-compose -f "$COMPOSE_FILE_PATH" logs -f
}

tail_all() {
    docker-compose -f "$COMPOSE_FILE_PATH" logs --tail="all"
}

prepare_test() {
    $MVN_EXEC verify -DskipTests=true -pl gedone-platform,gedone-integration-tests,gedone-platform-docker
}

test() {
    $MVN_EXEC verify -pl gedone-platform,gedone-integration-tests
}

case "$1" in
  build_start)
    down
    build
    start
    tail
    ;;
  build_start_it_supported)
    down
    build
    prepare_test
    start
    tail
    ;;
  start)
    start
    tail
    ;;
  stop)
    down
    ;;
  purge)
    down
    purge
    ;;
  tail)
    tail
    ;;
  reload_share)
    build_share
    start_share
    tail
    ;;
  reload_acs)
    build_acs
    start_acs
    tail
    ;;
  build_test)
    down
    build
    prepare_test
    start
    test
    tail_all
    down
    ;;
  test)
    test
    ;;
  *)
    echo "Usage: $0 {build_start|build_start_it_supported|start|stop|purge|tail|reload_share|reload_acs|build_test|test}"
esac