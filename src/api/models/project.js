var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ContentSchema = new Schema({
    type: {type: String, required: true, max: 10},
    details: {type: String}
});

var ProjectSchema = Schema(
  {
    title: {type: String, required: true, max: 100},
    icon: ContentSchema,
    contents: [ContentSchema]
  }
);

//Export model
module.exports = mongoose.model('Project', ProjectSchema);
