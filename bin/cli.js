#! /usr/bin/env node
var pkginfo = require('pkginfo')(module, 'dependencies');
const publisher = require('./publish.js');
var shell = require("shelljs");
shell.config.silent = true;

var cli = require('cli'), options = cli.parse({
    quest: [ 'q', 'Quest Name', 'string', null ],
    dir: [ 'd', 'Directory', 'string', shell.pwd()],
    skill: [ 's', 'Skill Name', 'string', null ]
});

if(process.argv.length == 2){
  usage();
}
if(process.argv.length > 2){
  args = process.argv.slice(2);
}

switch(args[0]) {
    case "init":
        optionSet("dir", options.dir);
        optionSet("quest", options.quest);
        initQuest(options.dir, options.quest);
        break;
    case "init-skill":
        optionSet("dir", options.dir);
        optionSet("skill", options.skill);
        initSkill(options.dir, options.skill);
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
  console.log("binder init --quest <name> (--dir <path>)");
  console.log("binder add --skill=<name> (--dir <path>)");
  console.log("binder remove --skill=<name> (--dir <path>)");
  console.log("binder serve (--dir <path>)");
  console.log("binder publish (--dir <path>)");
  shell.exit(0);
}

function initQuest(path, name){
    console.log("Creating new " + name + " Quest");
    binder_path = path + "/" + name;
    shell.mkdir('-p', [binder_path]);
    shell.cd(binder_path)
    shell.exec("npm init -f");
    shell.exec("npm install --save broomyocymru/binder");
}

function initSkill(path, name){
    //console.log("Creating new " + name + " Skill");
    //binder_path = path + "/" + name;
    //shell.mkdir('-p', [binder_path]);
    //shell.cd(binder_path)
    //shell.exec("npm init -f");
    console.log("init-skill - not currently available");
    shell.exit(1);
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
