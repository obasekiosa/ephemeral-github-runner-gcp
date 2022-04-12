import * as aws from "@pulumi/aws";


export const group = new aws.ec2.SecurityGroup("ghrunner-security-group", {
    ingress: [
        {protocol: "tcp", fromPort: 22, toPort: 22, cidrBlocks: ["0.0.0.0/0"] },
    ],
    egress: [
        { protocol: "tcp", fromPort: 22, toPort: 22, cidrBlocks: ["0.0.0.0/0"] },
    ],
    tags: {
        "Name":"ghrunner"
    },
});