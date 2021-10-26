import * as gcp from "@pulumi/gcp";

// Create a network
export const network = new gcp.compute.Network("network", {});