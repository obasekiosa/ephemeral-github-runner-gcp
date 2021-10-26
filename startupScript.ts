import * as pulumi from "@pulumi/pulumi";
import { readFileSync } from 'fs';

var Mustache = require("mustache");
let config = new pulumi.Config();

let templateView = { 
    repoOwner: config.require("repoOwner"),
    repo: config.require("repo"),
    ghToken: config.require("ghToken"),
    ghRunnerName: config.require("ghRunnerName"),
    personalAccessToken: config.require("personalAccessToken")
};

const template = readFileSync('./register-runner.sh', 'utf-8');
export const startupScript = Mustache.render(template, templateView);