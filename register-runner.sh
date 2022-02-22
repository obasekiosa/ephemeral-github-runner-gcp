#!/bin/bash

su - ghrunner -c "cd workdir/actions-runner && \
                  ./config.sh \
                    --url https://github.com/{{owner}}/{{repo}} \
                    --token {{token}} \
                    --labels {{labels}} \
                    --disableupdate \
                    --unattended \
                    --ephemeral"

cd /home/ghrunner/workdir/actions-runner
./svc.sh install ghrunner
./svc.sh start