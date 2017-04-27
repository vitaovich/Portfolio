var Project = require('./models/project');

this.get = function (req, res, next) {
  console.log('Get project: ' + req.params.id );
  Project.find({ 'id': req.params.id })
  .populate('icon', '_id name')
  .exec(function (err, project) {
      if (err) return handleError(err);
      res.send(project);
  });
  return next();
};

this.getAll = function (req, res, next) {
  console.log('Get all projects.');
  res.send(200);
  return next();
};

this.post = function (req, res, next) {
  console.log('Post a project.');
  res.send(200);
  return next();
};

this.put = function(req, res, next) {
  console.log('Put project: ' + req.params.id );
  res.send(200);
  return next();
};

this.delete = function(req, res, next) {
  console.log('Delete a project.');
  res.send(200);
  return next();
};

// TODO: Remove this function
this.welcome = function (req, res, next) {
  // res.send('Welcome to Portfolio REST API');
  var image = new Image({
    name: 'My silly image',
    src: 'Image source data'
  });
  image.save(function (err) {
    if (err) return handleError(err);
  });
  var project = new Project({title: 'MyImage', icon: image._id});
  project.save(function (err) {
    if (err) return handleError(err);
  });
  res.send(project);
}
