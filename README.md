[![releases](https://badgen.net/github/releases/pavlovic-ivan/ephemeral-github-runner?icon=github&color=orange)](https://github.com/pavlovic-ivan/ephemeral-github-runner/releases)
[![licence](https://badgen.net/github/license/pavlovic-ivan/ephemeral-github-runner?icon=github)](https://github.com/pavlovic-ivan/ephemeral-github-runner/blob/main/LICENSE.md)
[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

# ephemeral-github-runner
A Pulumi TypeScript project that deploys ephemeral Github runner

# Setup
```
pulumi new gcp-typescript
pulumi stack rm -s dev
pulumi login --local
pulumi stack init --secrets-provider=passphrase
```

# config
```
export PULUMI_CONFIG_PASSPHRASE=<value>
```
or
```
export PULUMI_CONFIG_PASSPHRASE_FILE=<value>
```

The ID of the project to apply any resources to. This can also be specified using any of the following environment variables (listed in order of precedence): `GOOGLE_PROJECT`, `GOOGLE_CLOUD_PROJECT`, `GCLOUD_PROJECT`, `CLOUDSDK_CORE_PROJECT`.

Contents of a file that contains your service account private key in JSON format. You can download your existing Google Cloud service account file from the Google Cloud Console, or you can create a new one from the same page. Credentials can also be specified using any of the following environment variables (listed in order of precedence): `GOOGLE_CREDENTIALS`, `GOOGLE_CLOUD_KEYFILE_JSON`, `GCLOUD_KEYFILE_JSON`. The GOOGLE_APPLICATION_CREDENTIALS environment variable can also contain the path of a file to obtain credentials from. If no credentials are specified, the provider will fall back to using the Google Application Default Credentials. If you are running Pulumi from a GCE instance, see Creating and Enabling Service Accounts for Instances for details.

The region to operate under, if not specified by a given resource. This can also be specified using any of the following environment variables (listed in order of precedence): `GOOGLE_REGION`, `GCLOUD_REGION`, `CLOUDSDK_COMPUTE_REGION`.

The zone to operate under, if not specified by a given resource. This can also be specified using any of the following environment variables (listed in order of precedence): `GOOGLE_ZONE`, `GCLOUD_ZONE`, `CLOUDSDK_COMPUTE_ZONE`.

or set with:
```
pulumi config set gcp:<option>
```

# node -v
v14.16.1

export PULUMI_CONFIG_PASSPHRASE=
export GOOGLE_PROJECT=
how to provide creds

```
pulumi login gs://ilgpu_pulumi_state
```