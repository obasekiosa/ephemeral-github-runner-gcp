#!/bin/bash

useradd -m ghrunner
cd /home/ghrunner
mkdir -p workdir/actions-runner && cd workdir/actions-runner
curl -O -L https://github.com/actions/runner/releases/download/v2.283.3/actions-runner-linux-x64-2.283.3.tar.gz
tar xzf ./actions-runner-linux-x64-2.283.3.tar.gz
chown -R ghrunner ~ghrunner && /home/ghrunner/workdir/actions-runner/bin/installdependencies.sh

sh -c 'cat <<EOF> /etc/systemd/system/ghrunner-reg.service
[Unit]
Description=Deregister GitHub Runner

[Service]
User=ghrunner
Type=oneshot
ExecStart=-/bin/bash -c "cd /home/ghrunner/workdir/actions-runner && ./config.sh --url https://github.com/{{repoOwner}}/{{repo}} --token {{token}} --name {{ghRunnerName}} --work _work --runnergroup default --labels self-hosted --ephemeral && ./run.sh"

[Install]
WantedBy=multi-user.target
EOF'

sh -c 'cat <<EOF> /etc/systemd/system/ghrunner-dereg.service
[Unit]
Description=Register GitHub Runner

[Service]
User=ghrunner
Type=oneshot
ExecStart=-/bin/bash -c "cd /home/ghrunner/workdir/actions-runner && ./config.sh remove --token {{token}}"

[Install]
WantedBy=multi-user.target
EOF'

sudo systemctl daemon-reload
sudo systemctl start ghrunner-reg.service