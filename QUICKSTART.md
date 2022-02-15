# Prerequisits

Before starting with this guide, check the list of prerequisits below, and make sure you have all prerequisits done:

- [ ] You have access to a GCP project
- [ ] You have a service account all set up in your GCP project
- [ ] You have a service account key downloaded in `json` format
- [ ] You have a storage bucket all set up in your GCP project
- [ ] You have your Github personal access token created and available

# Quickstart

Once you have prerequisits in place, you can check out this quickstart. This will enable you to deploy self-hosted Github runners from your local development machine:

1. clone the repository (or your fork)
2. `cd` to the repo root
3. copy the service account key inside the project root, and rename it to `key.json`
4. create a file called `.env` in the project root and set the contents of the file to:
```
export PAT=<your personal access token>
export GOOGLE_PROJECT=<google project id>
export PULUMI_CONFIG_PASSPHRASE=<whichever passphrase you wish>
export GOOGLE_CLOUD_KEYFILE_JSON=key.json
export GS_BUCKET=<path to the GCP bucket in format 'gs://bucket_name'>
export REPO=<short path to the repo in format 'repo-owner/repo-name'>
export GCE_SA_EMAIL=<the email of GCP service account you have created>
export GOOGLE_REGIOn=<GCP region eg 'europe-west4'>
export GOOGLE_ZONE=<GCP zone eg 'europe-west4-a'>
```
5. create a file called `config.yaml` in the project root and set the contents of the file to:
```
config:
  ephemeral-github-runner:bootDiskSizeInGB: "200"
  ephemeral-github-runner:bootDiskType: pd-balanced
  ephemeral-github-runner:ghRunnerName: ghrunner
  ephemeral-github-runner:machineImage: <path to the GCP machine image with Github runner installed>
  ephemeral-github-runner:machineType: <machine type of your choice>
  ephemeral-github-runner:runnersCount: "1"
  ephemeral-github-runner:serviceAccountScopes: https://www.googleapis.com/auth/cloud-platform
```

# Deploying runners

To deploy runners from your local development machine, notice that there is a `Makefile` in the project root. It acts as a wrapper around several `pulumi` commands for deploying, destroying and loging in with pulumi. Tp deploy runners, make sure you are in the project root and execute:

```
source .env
make login
make up
```

To destroy runners, make sure you are in the project root, and execute:
```
make down
```

# A bit more complicated example

`Makefile` has several variables defined:

| Variable      | Required    | Default     | Description                                                                   | Possible values |
| ------------- | ----------- | ----------- | ----------------------------------------------------------------------------- | --------------- |
| stack         | no          | dev1        | Name of the Pulumi stack. This is native to Pulumi, imagine it as a namespace |                 |
| config        | no          | config.yaml | Path to the config file in `yaml` format                                      |                 |
| auto-approve  | no          |             | A flag that enables/disables the Pulumi command prompt                        |    [-n / -y]    |

To customise the behaviour of Pulumi, you can use above mentioned variables. For example, let's deploy Pulumi stack with:
- name: `myFirstStack
- config: `my-configuration.yaml` (assuming this file exists in your project root)
- auto-approve: `ß`

Your make command to deploy the stack would look like this:
```
make up stack=myFirstStack config=my-configuration.yaml auto-approve=-y
```

And your command to destroy the stack would look like this:
```
make down stack=myFirstStack config=my-configuration.yaml auto-approve=-y
```

Note: if `auto-approve` is set to `-n`, then you will just tell Pulumi not to do the action you already wanted it to do. If you leave out the `auto-approve` flag, Pulumi will prompt you if you wish you action to take place or not. 