SHELL:=/bin/bash
stack=dev1
config=config.yaml
auto-approve?=

up:
	pulumi stack init ${stack}
	pulumi update --diff --config-file ${config} ${auto-approve}

down:
	pulumi stack select ${stack}
	pulumi destroy --config-file ${config} ${auto-approve}
	pulumi stack rm ${stack} ${auto-approve}