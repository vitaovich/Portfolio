var Project = require('./models/project');
var Content = require('./models/content');

this.get = function (req, res, next) {
  console.log('Get project: ' + req.params.id );
  Project.find({ '_id': req.params.id })
  .populate('icon', '_id name details')
  .populate('contents', '_id name details')
  .exec(function ( err, project ) {
      if ( err ) return handleError( err, res );
      res.send( project );
  });
  return next();
};

this.getAll = function (req, res, next) {
  console.log('Get all projects.');
  Project.find({})
  .populate('icon', '_id name details')
  .limit(100) // TODO: find better alternative other than hard coding limit
  .exec( function(err, projects) {
    if ( err ) return handleError( err, res );
    res.send( projects );
  });
  return next();
};

this.post = function (req, res, next) {
  console.log('Post a project.');

  var icon = new Content(req.body.icon);
  icon.save(function ( err ) {
    if ( err ) return handleError( err, res );

  });

  var project = new Project({ title: req.body.title, icon: icon._id});

  req.body.contents.forEach(content => {
    const contentModel = new Content(content);
    contentModel.save( (err) =>{
        if ( err ) return handleError( err, res );
    });
    project.contents.push(contentModel._id);
  });

  project.save( function ( err ) {
    if ( err ) return handleError( err, res );
  });

  res.send(project);
  return next();
};

this.put = function(req, res, next) {
  console.log( 'Put project: ' + req.params.id );
  Project.findOne({ '_id': req.params.id })
  .populate('icon', '_id name details')
  .populate('contents', '_id name details')
  .exec(function ( err, project ) {
      if ( err ) return handleError( err, res );

      project.title = req.body.title || project.title;
      updateContent(project.icon, req.body.icon);

      project.save( function ( err ) {
        if ( err ) return handleError( err, res );
      });
  });
  res.send(200);
  return next();
};

function updateContent(oldContent, newContent) {
  if(oldContent.name !== newContent.name) {
    oldContent.name = newContent.name;
    oldContent.src = newContent.src;
  }
  oldContent.details = newContent.details || oldContent.details;
  oldContent.save( function(err) {
    if ( err ) return handleError( err, res );
  });
};

this.delete = function(req, res, next) {
  console.log( 'Delete project: ' + req.params.id );
  Project.findByIdAndRemove( req.params.id, function (err, project) {
    if ( err ) return handleError( err, res );
    res.send(project);
  });
  return next();
};

function handleError(err, res) {
  res.send(404);
  console.log('\n\nFound error\n\n');
  console.log(err);
};
