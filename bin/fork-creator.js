const GitHub = require('github-api');

module.exports = function createRepoForkPromise(githubUser, githubPass, templateName) {
  const gh = new GitHub({
    username: githubUser,
    password: githubPass
  });

  var repo = gh.getRepo('Capgemini', templateName);

  return new Promise((resolve, reject) => {
    repo.fork();
    resolve();
  });
}
