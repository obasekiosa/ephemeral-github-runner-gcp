import { computeInstances } from "./instance";
import { network } from "./network";
import { firewall } from "./firewall";

export const instanceName = computeInstances;
export const networkName = network.name;
export const firewallName = firewall.name;