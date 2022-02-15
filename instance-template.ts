import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { startupScript } from "./startupScript";
import { network } from "./network";

const config = new pulumi.Config();

const ghRunnerName = config.require("ghRunnerName");
const labels = {
    "provided-by": "pulumi",
};

const scheduling = {
    preemptible: true,
    onHostMaintenance: "TERMINATE",
    automaticRestart: false
};

const bootDisk = {
    autoDelete: true,
    deviceName: `${ghRunnerName}-boot-disk`,
    mode: "READ_WRITE",
    diskType: config.require("bootDiskType"),
    diskSizeGb: +config.require("bootDiskSizeInGB"),
    sourceImage: config.require("machineImage")
};

const serviceAccount = {
    scopes: [ config.require("serviceAccountScopes") ],
    email: process.env.GCE_SA_EMAIL
};

export const instanceTemplate = new gcp.compute.InstanceTemplate(`${ghRunnerName}-instance-template`, {
    machineType: config.require("machineType"),
    labels,
    scheduling,
    disks: [ bootDisk ],
    metadata: {
        "startup-script": pulumi.secret(startupScript)
    },
    networkInterfaces: [{
        network: network.id,
        accessConfigs: [{}] // accessConfigs must include a single empty config to request an ephemeral IP
    }],
    serviceAccount
});