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
apiServer.get('/', function (req, res) {
  res.send('Welcome to Vitaliy\'s Portfolio API!');
});
apiServer.get('/projects/:id', ProjectService.get);
apiServer.get('/projectsfull/:id', ProjectService.getFull);
apiServer.get('/projects', ProjectService.getAll);
apiServer.post('/projects', ProjectService.post);
apiServer.put('/projects/:id', ProjectService.put);
apiServer.del('/projects/:id', ProjectService.delete);

//Set up mongoose connection
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var mongoDB = 'mongodb://localhost:27017';
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
