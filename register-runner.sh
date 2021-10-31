#!/bin/bash

useradd -m ghrunner
sudo -iu ghrunner
cd /home/ghrunner
mkdir -p workdir/actions-runner && cd workdir/actions-runner
curl -O -L https://github.com/actions/runner/releases/download/v2.283.3/actions-runner-linux-x64-2.283.3.tar.gz
tar xzf ./actions-runner-linux-x64-2.283.3.tar.gz

./bin/installdependencies.sh
export RUNNER_ALLOW_RUNASROOT="1"
./config.sh --url https://github.com/{{repoOwner}}/{{repo}} --token {{token}} --name {{ghRunnerName}} --work _work --runnergroup default --labels self-hosted --ephemeral
./run.sh