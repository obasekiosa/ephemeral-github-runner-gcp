import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { instanceTemplate } from "./instance-template";

const config = new pulumi.Config();
const ghRunnerName = config.require("ghRunnerName");

export const instanceGroup = new gcp.compute.InstanceGroupManager(`${ghRunnerName}-instance-group`, {
    baseInstanceName: ghRunnerName,
    zone: process.env.GOOGLE_ZONE,
    versions: [{
        instanceTemplate: instanceTemplate.id,
    }],
    targetSize: +config.require("runnersCount")
});