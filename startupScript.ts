import * as pulumi from "@pulumi/pulumi";
import { readFileSync } from 'fs';
import { registrationToken } from "./token-fetcher";

/* tslint:disable-next-line:no-var-requires */
const Mustache = require("mustache");
const config = new pulumi.Config();

export const startupScript = registrationToken.then(token => {
    const templateView = {
        repoOwner: config.require("repoOwner"),
        repo: config.require("repo"),
        ghRunnerName: `${config.require("ghRunnerName")}`,
        personalAccessToken: process.env.PAT,
        token,
        runnerVersion: config.require("runnerVersion")
    };
    const template = readFileSync('./register-runner.sh', 'utf-8');
    return Mustache.render(template, templateView);
});