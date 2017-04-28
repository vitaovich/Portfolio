var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProjectSchema = Schema(
  {
    title: {type: String, required: true, max: 100},
    icon: { type: Schema.Types.ObjectId, ref : 'Content' },
    contents: [ {type: Schema.Types.ObjectId, ref: 'Content' } ]
  }
);

//Export model
module.exports = mongoose.model('Project', ProjectSchema);
