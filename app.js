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

// Without view option specified, data is returned as JSON.
// Here we are mounting on a separate sub-path... so to get at the about page for example, we would access http://localhost:3000/json/about
// NOTE that the order of middleware(s) are important, so we need to put this first to route any requests to "/json" and handle as putting
// this middleware after will never invoke it
app.use('/json', markdownServe.middleware({
    rootDirectory: path.resolve(__dirname, 'content'),
}));

app.use(markdownServe.middleware({
    rootDirectory: path.resolve(__dirname, 'content'),
    view: 'markdown'
}));

var skills = Object.keys(module.exports.dependencies);
console.log(skills);

for (i = 0; i < skills.length; i++) {
  var skill = skills[i];
  console.log(skill);

  var readmeFile = gfm.sync(__dirname, skill, 'content/README.md');
  console.log(readmeFile);

  if (readmeFile != false) {
    app.use('/' + skill, markdownServe.middleware({
        rootDirectory: path.resolve(__dirname, 'node_modules/'+ skill +'/content'),
        view: 'markdown'
    }));
  }
}

app.listen(app.get('port'), function(){
    var h = (app.get('host') || os.hostname() || 'unknown') + ':' + app.get('port');
    console.log('Express server listening at ' + h);
});
