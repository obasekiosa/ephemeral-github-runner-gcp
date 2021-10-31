import * as gcp from "@pulumi/gcp";
import { network } from "./network";
import * as pulumi from "@pulumi/pulumi";

let config = new pulumi.Config();
let ghRunnerName = config.require("ghRunnerName");

const computeFirewall = new gcp.compute.Firewall(`${ghRunnerName}-firewall`, {
    network: network.id,
    allows: [{
        protocol: "tcp",
        ports: [ "22" ],
    }],
});

export const firewall = computeFirewall;