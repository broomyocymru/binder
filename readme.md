# Binder

A cli tool for creating/adding quests and skills.

## Installation
* Clone this repo `git clone https://github.com/gwolverson/binder`
* Run `npm install -g`

## Usage

The Binder cli can be used to create new quests and skills or add skills to an existing quest.

### Creating Quests / Skills

By running the command below, binder will create a new quest or skill in the location of your choosing. It does this by forking and then cloning the quest or skill template located at https://github.com/Capgemini/quest-template & https://github.com/Capgemini/skill-template respectively.

* Creating quests: `binder create-quest --dir <DIR_TO_CLONE_TO> --githubUser <GITHUB_USER --githubPass <GITHUB_PASSWORD>`
* Creating skills: `binder create-skill --dir <DIR_TO_CLONE_TO> --githubUser <GITHUB_USER --githubPass <GITHUB_PASSWORD>`

### Adding Skills (WIP)


### Serving Content (WIP)

* From the root of binder run `node app.js`
* Browse to http://localhost:3000', /chap1, /chap2 etc.

#### Notes:

* Adventure Pack (repo, npm)
  * Quest A(repo, npm)
    * Specific Skill (embedded within quest files)
    * Common Skill (repo, npm)
    * …
  * Quest B (repo, npm)
    * Common Skill (repo, npm)
    * …


AHL Code @
https://github.com/andrewharmellaw/quest-dist-sys-eng-java-apprentice
