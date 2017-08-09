var docPublisher = require('doc-publisher');
var fs = require('fs');

module.exports = function publish(path) {

  var package_json = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const dependencies = Object.keys(package_json.dependencies);

  let dependencyKeys = dependencies.filter((key) => {
    return key.startsWith('skill');
  });

  docPublisher(dependencyKeys);
}
