import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";


export const group = new aws.ec2.SecurityGroup("sec-group-name", {
    ingress: [
        {protocol: "tcp", fromPort: 22, toPort: 22, cidrBlocks: ["0.0.0.0/0"] },
    ]
});

export const subnet = new aws.ec2.Subnet("subnet-name", {
    // vpcId: selected.then(selected => selected.vpcId),
    vpcId: group.vpcId,
    cidrBlock: "0.0.0.0/0",
});