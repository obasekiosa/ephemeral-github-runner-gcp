import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

import { RunnerTemplate } from "./instance-template";

export const RunnerAutoScaleGroup = new aws.autoscaling.Group("ghrunner-auto-scaling-group", {
    availabilityZones: ["us-west-2a"],
    desiredCapacity: 1,
    maxSize: 1,
    minSize: 1,
    launchTemplate: {
        id: RunnerTemplate.id,
        version: RunnerTemplate.latestVersion.apply(v => `${v}`),
    },
});