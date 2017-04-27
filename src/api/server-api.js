var restify = require('restify');
var config = require('./config');
var Project = require('./models/project');
var ProjectService = require('./project.service');
var Image = require('./models/image');

var server = restify.createServer({
  name: config.name,
});

// server.use(restify.fullResponse());
// server.use(restify.bodyParser());
// server.use(restify.queryParser());

server.listen(config.port, function() {
  console.log('%s listening at %s', server.name, server.url);
});

server.get('/', ProjectService.welcome);

server.get('/projects/:id', ProjectService.get);
server.get('/projects', ProjectService.getAll);
server.post('/projects', ProjectService.post);
server.put('/projects/:id', ProjectService.put);
server.del('/projects/:id', ProjectService.delete);

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017';
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
