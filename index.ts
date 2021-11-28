import { network } from "./network";
import { firewall } from "./firewall";
import { instanceTemplate } from "./instance-template"
import { instanceGroup } from "./instance-group";

export const instanceTemplateName = instanceTemplate.name;
export const instanceGroupName = instanceGroup.name;
export const networkName = network.name;
export const firewallName = firewall.name;