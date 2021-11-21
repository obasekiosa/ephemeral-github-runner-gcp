import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";

// Create a network
const config = new pulumi.Config();
const ghRunnerName = config.require("ghRunnerName");

export const network = new gcp.compute.Network(`${ghRunnerName}-network`, {});