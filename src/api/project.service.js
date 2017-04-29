var Project = require('./models/project');

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
