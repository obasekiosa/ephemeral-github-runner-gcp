SHELL:=/bin/bash
stack=dev1
include .env
up:
	pulumi stack select ${stack}
	pulumi up --config-file config.yaml -y

down:
	pulumi stack select ${stack}
	pulumi destroy --config-file config.yaml -y