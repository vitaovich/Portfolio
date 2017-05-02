var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var apiServer = express();
var config = require('./config');
var ProjectService = require('./project.service');

apiServer.use(bodyParser.json());
apiServer.use(cors());

var router = express.Router();

router.get('/', function (req, res) {
  res.send('Welcome to Vitaliy\'s Portfolio API!');
});
router.get('/projects/:id', ProjectService.get);
router.get('/projects', ProjectService.getAll);
router.post('/projects', ProjectService.post);
router.put('/projects/:id', ProjectService.put);
router.delete('/projects/:id', ProjectService.delete);

apiServer.use('/api', router);

apiServer.listen(config.port, function() {
  console.log('Vitaliy\'s Portfolio api server listening on port ' + config.port);
});

//Set up mongoose connection
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var mongoDB = 'mongodb://localhost:27017';
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
