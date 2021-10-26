import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { network } from "./network";
import { startupScript } from "./startupScript";

let config = new pulumi.Config();

// Create a Virtual Machine Instance
export const computeInstance = new gcp.compute.Instance("instance", {
    machineType: config.require("machineType"),
    zone: config.require("zone"),
    metadataStartupScript: startupScript,
    bootDisk: { initializeParams: { image: config.require("machineImage") } },
    networkInterfaces: [{
        network: network.id,
        // accessConfigus must includ a single empty config to request an ephemeral IP
        accessConfigs: [{}],
    }],
});