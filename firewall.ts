import * as gcp from "@pulumi/gcp";
import { network } from "./network";
import * as pulumi from "@pulumi/pulumi";

let config = new pulumi.Config();
let ghRunnerName = config.require("ghRunnerName");

export const firewall = new gcp.compute.Firewall(`${ghRunnerName}-firewall`, { network: network.id });