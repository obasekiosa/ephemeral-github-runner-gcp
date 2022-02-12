SHELL:=/bin/bash
stack=dev1
config=config.yaml
auto-approve?=

up:
	pulumi stack init -s ${stack}
	pulumi config set ephemeral-github-runner:repo $(REPO) --config-file ${config}
	pulumi up --diff --config-file ${config} ${auto-approve}

down:
	pulumi stack select ${stack}
	pulumi destroy --config-file ${config} ${auto-approve}
	pulumi stack rm ${stack} ${auto-approve}
	pulumi config rm ephemeral-github-runner:repo --config-file ${config}

login:
	pulumi login $(GS_BUCKET)