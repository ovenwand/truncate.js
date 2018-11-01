#!/usr/bin/env bash

CLEAR='\n\033c'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
BLUE='\033[1;34m'
NC='\033[0m'

if [[ -z $1 ]]; then
    echo -e "${CLEAR}${BLUE}Enter new version: ${NC}"
    read VERSION
    echo -e "\n"
else
    VERSION=$1
fi

read -p "Releasing ${VERSION} - are you sure? (y/n) " -n 1 -r

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${CLEAR}Releasing ${VERSION} TruncateJS - ${GREEN}Version ${VERSION}${NC}"

    echo -e "\n${YELLOW}Checking for errors...${NC}"
    npm run lint || exit 1

    echo -e "\n${YELLOW}Running test...${NC}"
    npm run test || exit 1

    echo -e "\n${YELLOW}Building library...${NC}"
    npm run bundle || exit 1

    echo -e "\n${YELLOW}Commiting...${NC}"
    git add -A
    git commit -m "build: ${VERSION}"
    npm version ${VERSION} --message "build: release %s" || exit 1

    echo -e "\n${YELLOW}Publishing a new release...${NC}"
    git push origin v${VERSION}
    git push
    npm publish --access public

    echo -e "\n${GREEN}BUILD FINISHED WITH SUCCESS!${NC}"
fi
