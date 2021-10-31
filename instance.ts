import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { network } from "./network";
import { startupScript } from "./startupScript";

let config = new pulumi.Config();

let ghRunnerName = config.require("ghRunnerName");
let labels = {
    "provided-by": "pulumi",
    "env": `${config.require("env")}`
};

let scheduling = {
    preemptible: true,
    onHostMaintenance: "TERMINATE",
    automaticRestart: false
};

let metadata ={
    "ssh-keys": `${config.require("sshKeys")}`,
    "startup-script": startupScript
};

let bootDisk = {
    autoDelete: true,
    deviceName: `${ghRunnerName}-boot-disk`,
    mode: "READ_WRITE",
    initializeParams: {
        size: +config.require("bootDiskSizeInGB"),
        // type: config.require("bootDiskType"),
        image: config.require("machineImage")
    }
};

let serviceAccount = {
    scopes: [],
    email: config.require("serviceAccountEmail")
};

let instanceArguments = {
    machineType: `projects/${process.env.GOOGLE_PROJECT}/zones/${config.require("zone")}/machineTypes/${config.require("machineType")}`,
    zone: `projects/${process.env.GOOGLE_PROJECT}/zones/${config.require("zone")}`,
    labels: labels,
    scheduling: scheduling,
    metadata: metadata,
    networkInterfaces: [{
        network: network.id,
        accessConfigs: [{}] // accessConfigs must include a single empty config to request an ephemeral IP
    }],
    bootDisk: bootDisk,
    allowStoppingForUpdate: true,
    serviceAccount: serviceAccount
};

// Create a Virtual Machine Instance
export const computeInstance = new gcp.compute.Instance(`${ghRunnerName}-instance`, instanceArguments);