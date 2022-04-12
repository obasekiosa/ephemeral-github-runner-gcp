import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

import { RunnerAutoScaleGroup } from "./instance";
import { RunnerTemplate } from "./instance-template";
import {group} from "./network";

export const subnetId = group.id;
export const Vpc = group.vpcId;

export const template = RunnerTemplate.id;
export const asg = RunnerAutoScaleGroup.id;