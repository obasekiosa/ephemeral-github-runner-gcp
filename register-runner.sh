#!/usr/bin/bash

apt-get install -y wget curl jq
mkdir actions-runner && cd actions-runner

curl -O -L https://github.com/actions/runner/releases/download/v2.283.3/actions-runner-linux-x64-2.283.3.tar.gz
tar xzf ./actions-runner-linux-x64-2.283.3.tar.gz

token=$(curl -s -XPOST \
    -H "authorization: token {{personalAccessToken}}" \
    https://api.github.com/repos/{{repoOwner}}/{{repo}}/actions/runners/registration-token |\
    jq -r .token)

./bin/installdependencies.sh
./config.sh --url https://github.com/{{repoOwner}}/{{repo}} --token ${token} --name {{ghRunnerName}} --work _work --ephemeral
./run.sh