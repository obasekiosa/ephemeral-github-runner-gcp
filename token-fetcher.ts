import * as pulumi from "@pulumi/pulumi";
import axios from "axios";

const config = new pulumi.Config();
const token: string = "";
const githubDomain = `https://api.github.com/repos/${config.require("repo")}/actions/runners/registration-token`;
const registrationTokenRequestConfig = {
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
        return token;
      }
}

export const registrationToken = fetchToken();