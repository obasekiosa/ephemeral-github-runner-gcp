import * as pulumi from "@pulumi/pulumi";
import { readFileSync } from 'fs';
import { registrationToken } from "./token-fetcher";

var Mustache = require("mustache");
let config = new pulumi.Config();

const startupScriptParsed = registrationToken.then(token => {
    let templateView = { 
        repoOwner: config.require("repoOwner"),
        repo: config.require("repo"),
        ghRunnerName: config.require("ghRunnerName"),
        personalAccessToken: process.env.PAT,
        token: token
    };
    const template = readFileSync('./register-runner.sh', 'utf-8');
    return Mustache.render(template, templateView);
});


export const startupScript = startupScriptParsed;