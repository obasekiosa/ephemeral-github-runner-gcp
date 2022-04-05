import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as fs from "fs";

const LauchConfiguration = new aws.ec2.LaunchTemplate("foo", {
    blockDeviceMappings: [{
        deviceName: "/dev/sda1",
        ebs: {
            volumeSize: 20,
        },
    }],
    capacityReservationSpecification: {
        capacityReservationPreference: "open",
    },
    cpuOptions: {
        coreCount: 4,
        threadsPerCore: 2,
    },
    creditSpecification: {
        cpuCredits: "standard",
    },
    disableApiTermination: true,
    ebsOptimized: "true",
    elasticGpuSpecifications: [{
        type: "test",
    }],
    elasticInferenceAccelerator: {
        type: "eia1.medium",
    },
    iamInstanceProfile: {
        name: "test",
    },
    imageId: "ami-test",
    instanceInitiatedShutdownBehavior: "terminate",
    instanceMarketOptions: {
        marketType: "spot",
    },
    instanceType: "t2.micro",
    kernelId: "test",
    keyName: "test",
    licenseSpecifications: [{
        licenseConfigurationArn: "arn:aws:license-manager:eu-west-1:123456789012:license-configuration:lic-0123456789abcdef0123456789abcdef",
    }],
    metadataOptions: {
        httpEndpoint: "enabled",
        httpTokens: "required",
        httpPutResponseHopLimit: 1,
        instanceMetadataTags: "enabled",
    },
    monitoring: {
        enabled: true,
    },
    networkInterfaces: [{
        associatePublicIpAddress: "true",
    }],
    placement: {
        availabilityZone: "us-west-2a",
    },
    ramDiskId: "test",
    vpcSecurityGroupIds: ["sg-12345678"],
    tagSpecifications: [{
        resourceType: "instance",
        tags: {
            Name: "test",
        },
    }],
    userData: Buffer.from(fs.readFileSync(`${path.module}/example.sh`), 'binary').toString('base64'),
});