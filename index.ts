import { computeInstance } from "./instance";
import { network } from "./network";
import { firewall } from "./firewall";

export const instanceName = computeInstance.name;
export const networkName = network.name;
export const firewallName = firewall.name;