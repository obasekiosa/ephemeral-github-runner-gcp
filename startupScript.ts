import * as pulumi from "@pulumi/pulumi";
import { readFileSync } from 'fs';
import { registrationToken } from "./token-fetcher";

var Mustache = require("mustache");
let config = new pulumi.Config();

let scripts = [];
for(let i = 0; i < +config.require("runnersCount"); i++){
    scripts.push(registrationToken.then(token => {
        let templateView = { 
            repoOwner: config.require("repoOwner"),
            repo: config.require("repo"),
            ghRunnerName: `${config.require("ghRunnerName")}-${i}`,
            personalAccessToken: process.env.PAT,
            token: token,
            runnerVersion: config.require("runnerVersion")
        };
        const template = readFileSync('./register-runner.sh', 'utf-8');
        return Mustache.render(template, templateView);
    }));
}

export const startupScripts = scripts;