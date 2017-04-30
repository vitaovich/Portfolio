var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var apiServer = express();
var config = require('./config');
var ProjectService = require('./project.service');

apiServer.use(bodyParser.json());
apiServer.use(cors());
apiServer.listen(config.port, function() {
  console.log('Vitaliy\'s Portfolio api server listening on port ' + config.port);
});
apiServer.get('/api/', function (req, res) {
  res.send('Welcome to Vitaliy\'s Portfolio API!');
});
apiServer.get('/api/projects/:id', ProjectService.get);
apiServer.get('/api/projectsfull/:id', ProjectService.getFull);
apiServer.get('/api/projects', ProjectService.getAll);
apiServer.post('/api/projects', ProjectService.post);
apiServer.put('/api/projects/:id', ProjectService.put);
apiServer.del('/api/projects/:id', ProjectService.delete);

//Set up mongoose connection
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var mongoDB = 'mongodb://localhost:27017';
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
