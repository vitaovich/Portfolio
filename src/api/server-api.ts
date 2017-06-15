import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');
let apiServer = express();
let config = require('./config');
import { ProjectService } from './project.service';

apiServer.use(bodyParser.json());
apiServer.use(cors());

let router = express.Router();

router.get('/', function (req, res) {
  res.send('Welcome to Vitaliy\'s Portfolio API!');
});

let pService = new ProjectService();
router.get('/projects/:id', pService.get);
router.get('/projects', pService.getAll);
router.post('/projects', pService.post);
router.put('/projects/:id', pService.put);
router.delete('/projects/:id', pService.delete);

apiServer.use('/api', router);

apiServer.listen(config.port, function() {
  console.log('Vitaliy\'s Portfolio api server listening on port ' + config.port);
});

// Set up mongoose connection
import mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let mongoDB = 'mongodb://localhost:27017';
mongoose.connect(mongoDB);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
