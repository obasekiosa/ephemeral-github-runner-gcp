#!/bin/bash

su - runner -c "cd runner && \
                  ./config.sh \
                    --url https://github.com/{{owner}}/{{repo}} \
                    --token {{token}} \
                    --labels {{labels}} \
                    --disableupdate \
                    --unattended \
                    --ephemeral"

cd ~runner/runner
./svc.sh install runner
./svc.sh start