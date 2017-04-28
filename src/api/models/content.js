var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ContentSchema = Schema(
  {
    name: {type: String, required: true, max: 100},
    src: {type: String, required: true },
    details: {type: String, required: true}
  }
);

//Export model
module.exports = mongoose.model('Content', ContentSchema);
