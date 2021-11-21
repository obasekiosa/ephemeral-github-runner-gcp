import * as pulumi from "@pulumi/pulumi";
import { readFileSync } from 'fs';
import { registrationToken } from "./token-fetcher";

const Mustache = require("mustache");
const config = new pulumi.Config();

const scripts = [];
for(let i = 0; i < +config.require("runnersCount"); i++){
    scripts.push(registrationToken.then(token => {
        const templateView = {
            repoOwner: config.require("repoOwner"),
            repo: config.require("repo"),
            ghRunnerName: `${config.require("ghRunnerName")}-${i}`,
            personalAccessToken: process.env.PAT,
            token,
            runnerVersion: config.require("runnerVersion")
        };
        const template = readFileSync('./register-runner.sh', 'utf-8');
        return Mustache.render(template, templateView);
    }));
}

export const startupScripts = scripts;