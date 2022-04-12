// import { network, subnetwork } from "./network";
// import { instanceTemplate } from "./instance-template"
// import { instanceGroup } from "./instance-group";
// import { GCPolicy } from "@pulumi/gcp/bigtable";

// export const instanceTemplateName = instanceTemplate.name;
// export const instanceGroupName = instanceGroup.name;
// export const networkName = network.name;
// export const subnetworkName = subnetwork.name;

import {asg, subnetId} from "./aws/index";
import { template } from "./aws/index";

export const templateId = template;
export const secgroupId = subnetId;

export const asgid = asg;
