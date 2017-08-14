#! /usr/bin/env node
const publisher = require('./publish.js');
const createFork = require('./fork-creator.js');

var shell = require("shelljs");
shell.config.silent = true;

var cli = require('cli'), options = cli.parse({
    quest: [ 'q', 'Quest Name', 'string', null ],
    dir: [ 'd', 'Directory', 'string', shell.pwd()],
    skill: [ 's', 'Skill Name', 'string', null ],
    githubUser: [ 'gu', 'GitHub Username', 'string', null],
    githubPass: [ 'gp', 'GitHub Password', 'string', null]
});

if(process.argv.length == 2){
  usage();
}

if(process.argv.length > 2){
  args = process.argv.slice(2);
}

switch(args[0]) {
    case "create-quest":
        optionSet("dir", options.dir);
        //optionSet("quest", options.quest);
        optionSet("githubUser", options.githubUser);
        optionSet("githubPass", options.githubPass);
        createQuest(options.dir, options.quest, options.githubUser, options.githubPass);
        break;
    case "create-skill":
        optionSet("dir", options.dir);
        //optionSet("skill", options.skill);
        optionSet("githubUser", options.githubUser);
        optionSet("githubPass", options.githubPass);
        createSkill(options.dir, options.skill, options.githubUser, options.githubPass);
        break;
    case "add":
        optionSet("dir", options.dir);
        optionSet("skill", options.skill);
        add(options.dir, options.skill);
        break;
    case "remove":
        optionSet("dir", options.dir);
        optionSet("skill", options.skill);
        remove(options.dir, options.skill);
        break;
    case "serve":
        optionSet("dir", options.dir);
        serve(options.dir);
        break;
    case "publish":
        optionSet("dir", options.dir);
        publish(options.dir);
        break;
    default:
      usage();
}

function usage(){
  console.log("Usage:");
  console.log("binder create-quest --githubUser <github-username> --githubPass <github-password> (--dir <path>)");
  console.log("binder create-skill --githubUser <github-username> --githubPass <github-password> (--dir <path>)");
  console.log("binder add --skill=<name> (--dir <path>)");
  console.log("binder remove --skill=<name> (--dir <path>)");
  console.log("binder serve (--dir <path>)");
  console.log("binder publish (--dir <path>)");
  shell.exit(0);
}

function createQuest(path, name, githubUser, githubPass) {
  console.log("Creating new Quest from Capgemini/quest-template");

  const QUEST_TEMPLATE = 'quest-template';
  forkAndCloneTemplateRepository(githubUser, githubPass, QUEST_TEMPLATE, path);
}

function createSkill(path, name, githubUser, githubPass) {
  console.log("Creating new Skill from Capgemini/skill-template");

  const SKILL_TEMPLATE = 'skill-template';
  forkAndCloneTemplateRepository(githubUser, githubPass, SKILL_TEMPLATE, path);
}

function forkAndCloneTemplateRepository(githubUser, githubPass, template, path) {
  var forkRepo = createFork(githubUser, githubPass, template);

  var performPostForkActions = new Promise((resolve, reject) => {
    console.log('Finished fork');
    shell.cd(path);
    shell.exec(`git clone https://github.com/${githubUser}/${template}`);
    resolve();
  });

  Promise.all([forkRepo, performPostForkActions]);
}

function add(path, skill){
    console.log("Add Skill");
    shell.cd(path)
    shell.exec("npm install --save " + skill);
}

function remove(path, skill){
    console.log("Remove quest");
    shell.cd(path);
    shell.exec("npm uninstall --save " + skill);
}

function serve(path){
    console.log("Serve Binder");
    shell.cd(path);
    shell.exec("node " + path +"/node_modules/binder/app.js");
}

function publish(path){
    console.log("Publish Quest");
    shell.cd(path);
    publisher(path);
}

function optionSet(name, value){
  if(value==null){
      console.log(name + " is required.");
      shell.exit(1);
  }
}
