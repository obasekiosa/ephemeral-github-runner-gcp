import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { network } from "./network";
import { startupScripts } from "./startupScript";

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

let bootDisk = {
    autoDelete: true,
    deviceName: `${ghRunnerName}-boot-disk`,
    mode: "READ_WRITE",
    initializeParams: {
        size: +config.require("bootDiskSizeInGB"),
        type: config.require("bootDiskType"),
        image: config.require("machineImage")
    }
};

let serviceAccount = {
    scopes: [ config.require("serviceAccountScopes") ],
    email: config.require("serviceAccountEmail")
};

// Create a Virtual Machine Instance
let instances: gcp.compute.Instance[] = [];
for(let i = 0; i < +config.require("runnersCount"); i++){
    instances.push(new gcp.compute.Instance(`${ghRunnerName}-instance-${i}`, {
        machineType: config.require("machineType"),
        zone: config.require("zone"),
        labels: labels,
        scheduling: scheduling,
        metadata: { 
            "startup-script": pulumi.secret(startupScripts[i])
        },
        networkInterfaces: [{
            network: network.id,
            accessConfigs: [{}] // accessConfigs must include a single empty config to request an ephemeral IP
        }],
        bootDisk: bootDisk,
        allowStoppingForUpdate: true,
        serviceAccount: serviceAccount
    }));
}
export const computeInstances = instances;