import * as gcp from "@pulumi/gcp";
import { network } from "./network";

// Create a network
const computeFirewall = new gcp.compute.Firewall("firewall", {
    network: network.id,
    allows: [{
        protocol: "tcp",
        ports: [ "22" ],
    }],
});