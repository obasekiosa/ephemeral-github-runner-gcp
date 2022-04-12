import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as fs from "fs";

import { group } from "./network";


export const RunnerTemplate = new aws.ec2.LaunchTemplate("ghrunner-template", {
    blockDeviceMappings: [{
        deviceName: "/dev/sda1",
        ebs: {
            volumeSize: 8,
        },
    }],
    // capacityReservationSpecification: {
    //     capacityReservationPreference: "open",
    // },

    // cpuOptions: {  // can't be used for t2.micro
    //     coreCount: 4,
    //     threadsPerCore: 2,
    // },
    creditSpecification: {
        cpuCredits: "standard",
    },
    // disableApiTermination: true, // only for non spot instances

    // ebsOptimized: "true",

    // elasticGpuSpecifications: [{
    //     type: "test",
    // }],

    // elasticInferenceAccelerator: {
    //     type: "eia1.medium",
    // },

    // iamInstanceProfile: { // only needed to give instance some role
    //     name: "test",
    // },

    imageId: "ami-00ee4df451840fa9d",
    instanceInitiatedShutdownBehavior: "terminate",
    instanceMarketOptions: {
        marketType: "spot",
    },
    instanceType: "t2.micro",

    // kernelId: "test",

    keyName: "ghrunner-key", // used for instance ssh login auth


    // licenseSpecifications: [{
    //     licenseConfigurationArn: "arn:aws:license-manager:eu-west-1:123456789012:license-configuration:lic-0123456789abcdef0123456789abcdef",
    // }],
    // metadataOptions: {
    //     httpEndpoint: "enabled",
    //     httpTokens: "required",
    //     httpPutResponseHopLimit: 1,
    //     instanceMetadataTags: "enabled",
    // },

    monitoring: {
        enabled: true,
    },

    networkInterfaces: [{
        associatePublicIpAddress: "true",
        securityGroups: [group.id],
    }],

    placement: {
        availabilityZone: "us-west-2a",
    },
    // ramDiskId: "test",

    // vpcSecurityGroupIds: [group.id],

    // tagSpecifications: [{
    //     resourceType: "ghrunner",
    //     tags: {
    //         Name: "ghrunner",
    //     },
    // }],
    // userData: Buffer.from(fs.readFileSync("${required_file}").toString(), "binary").toString("base64"), // fs.readFileSync(`${path.module}/example.sh`), 'binary').toString('base64'),
});