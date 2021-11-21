import * as gcp from "@pulumi/gcp";
import { network } from "./network";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();
const ghRunnerName = config.require("ghRunnerName");

const computeFirewall = new gcp.compute.Firewall(`${ghRunnerName}-firewall`, {
    network: network.id,
    allows: [{
        protocol: "tcp",
        ports: [ "80" ],
    }],
});

export const firewall = computeFirewall;