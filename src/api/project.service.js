var Project = require('./models/project');
var fs = require('fs');

this.get = function (req, res) {
  console.log('Get project: ' + req.params.id );
  Project.findOne({ _id: req.params.id })
  .select('-icon.src -contents.src')
  .exec(function ( err, project ) {
      if ( err ) return handleError( err, res );
      console.log(project);
      res.send( project );
  });
};

this.getAll = function (req, res) {
  console.log('Get all projects.');
  Project.find({})
  .select('-icon.src -contents.src')
  .limit(100) // TODO: find better alternative other than hard coding limit
  .exec( function(err, projects) {
    if ( err ) return handleError( err, res );
    res.send( projects );
  });
};

this.post = function (req, res) {
  console.log('Post a project.');
  console.log(req.body);
  var project = new Project(req.body);
  project.save( err => {
    if ( err ) return handleError( err, res );
  });

  var imageBuffer = decodeBase64Image(req.body.icon.src);
  fs.writeFile('src/assets/' + req.body.icon.name, imageBuffer.data, err => {
    if(err) return console.log(err);
  });

  req.body.contents.forEach(content => {
    var imageBuffer = decodeBase64Image(content.src);
    fs.writeFile('src/assets/' + content.name, imageBuffer.data, err => {
      if(err) return console.log(err);
    });
  });

  res.send(project);
};

this.put = function(req, res) {
  var id = req.params.id;
  console.log( 'Put project: ' + req.params.id );
  Project.findByIdAndUpdate(id, req.body, { new: true }, (err, project) => {
        if ( err ) return handleError( err, res );
        res.send(project);
  });
};

this.delete = function(req, res) {
  console.log( 'Delete project: ' + req.params.id );
  Project.findByIdAndRemove( req.params.id, function (err, project) {
    if ( err ) return handleError( err, res );
    res.send(project);
  });
};

function handleError(err, res) {
  res.send(404);
  console.log('\n\nFound error\n\n');
  console.log(err);
};

function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}
