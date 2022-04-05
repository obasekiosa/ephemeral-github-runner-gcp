import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

export const FleetConfigureation = new aws.ec2.Fleet("example", {
    launchTemplateConfig: {
        launchTemplateSpecification: {
            launchTemplateId: aws_launch_template.example.id,
            version: aws_launch_template.example.latest_version,
        },
    },
    targetCapacitySpecification: {
        defaultTargetCapacityType: "spot",
        totalTargetCapacity: 5,
    },
});