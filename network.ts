import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";

// Create a network
let config = new pulumi.Config();
let ghRunnerName = config.require("ghRunnerName");

export const network = new gcp.compute.Network(`${ghRunnerName}-network`, {});