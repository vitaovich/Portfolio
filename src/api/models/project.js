var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ContentSchema = new Schema({
    name: {type: String, required: true, max: 100},
    src: {type: String, required: true },
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
