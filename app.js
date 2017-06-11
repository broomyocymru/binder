var express = require('express'),
    path = require('path'),
    os = require('os'),
    logger = require('morgan'),
    errorHandler = require('errorhandler'),
    markdownServe = require('markdown-serve'),
    pkginfo = require('pkginfo')(module, 'dependencies'),
    gfm = require('get-module-file');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.resolve(__dirname, 'jade-views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.static(path.resolve(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
    app.set('host', 'http://localhost');
}

app.use('/json', markdownServe.middleware({
    rootDirectory: path.resolve(__dirname, 'content'),
}));

var dependencies = Object.keys(module.exports.dependencies);
var skills = [];

app.use(markdownServe.middleware({
    rootDirectory: path.resolve(__dirname, 'content'),
    view: 'markdown',
}));

for (i = 0; i < dependencies.length; i++) {
  var skill = dependencies[i];
  var skillFile = gfm.sync(__dirname, skill, 'quest.yml');

  if (skillFile != false) {
    console.log("Hosting Skill " +  skill)
    skills.append(skill);

    rootDir = path.resolve(__dirname, 'node_modules/'+ skill);
    console.log(rootDir);
    app.use('/' + skill, markdownServe.middleware({
        rootDirectory: rootDir,
        view: 'markdown'
    }));
  }
}

app.listen(app.get('port'), function(){
    var h = (app.get('host') || os.hostname() || 'unknown') + ':' + app.get('port');
    console.log('Express server listening at ' + h);
});
