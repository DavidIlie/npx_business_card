#!/usr/bin/env node

"use strict";

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require("fs");
const path = require("path");

clear();

const res = fs.readFileSync(path.resolve(__dirname, "data.json"));
const user_data = JSON.parse(res);
const {
  user_name,
  user_email,
  twitter_username,
  github_username,
  personal_site,
  npx_card_handle,
  job_title,
} = user_data;

const prompt = inquirer.createPromptModule();

const questions = [
  {
    type: "list",
    name: "action",
    message: "What is next master?",
    choices: [
      {
        name: `Send me an ${chalk.green.bold("email")}?`,
        value: () => {
          open(`mailto:${user_email}`);
          console.log("\nDone. Abueno adios máster\n");
        },
      },
      {
        name: "Quit",
        value: () => {
          console.log("Abueno adios máster\n");
        },
      },
    ],
  },
];

const data = {
  name: chalk.bold.green(`                  ${user_name}`),
  work: `${chalk.white(`${job_title}`)}`,
  twitter:
    chalk.gray("https://twitter.com/") + chalk.cyan(`${twitter_username}`),
  github: chalk.gray("https://github.com/") + chalk.green(`${github_username}`),
  web: chalk.cyan(`${personal_site}`),
  npx: chalk.red("npx") + " " + chalk.white(`${npx_card_handle}`),

  labelWork: chalk.white.bold("       Work:"),
  labelTwitter: chalk.white.bold("    Twitter:"),
  labelGitHub: chalk.white.bold("     GitHub:"),
  labelWeb: chalk.white.bold("        Web:"),
  labelCard: chalk.white.bold("       Card:"),
};

const me = boxen(
  [
    `${data.name}`,
    ``,
    `${data.labelWork}  ${data.work}`,
    ``,
    `${data.labelTwitter}  ${data.twitter}`,
    `${data.labelGitHub}  ${data.github}`,
    `${data.labelWeb}  ${data.web}`,
    ``,
    `${data.labelCard}  ${data.npx}`,
    ``,
    `${chalk.italic("if you know the enemy and know yourself you need")}`,
    `${chalk.italic("not fear the results of a hundred battles.")}`,
    ``,
    `${chalk.italic("- Sun Tzu")}`,
  ].join("\n"),
  {
    margin: 1,
    float: "center",
    padding: 1,
    borderStyle: "single",
    borderColor: "green",
  }
);

console.log(me);

prompt(questions).then((answer) => answer.action());
