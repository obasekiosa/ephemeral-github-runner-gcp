import * as pulumi from "@pulumi/pulumi";
import axios from "axios";

let config = new pulumi.Config();
let token: string = "";
let githubDomain = `https://api.github.com/repos/${config.require("repoOwner")}/${config.require("repo")}/actions/runners/registration-token`;
let registrationTokenRequestConfig = {
    headers: {
        "Authorization": `token ${process.env.PAT}`,
        "Accept": "application/vnd.github.v3+json"
    } 
}

async function fetchToken() {
    try {
        return axios.post(githubDomain, null, registrationTokenRequestConfig)
            .then(res => res.data.token);
      } catch (error) {
        console.log(error);
        return token;
      }
}

export const registrationToken = fetchToken();