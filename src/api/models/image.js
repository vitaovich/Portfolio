var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ImageSchema = Schema(
  {
    name: {type: String, required: true, max: 100},
    src: {type: String, required: true },
  }
);

// Virtual for author's full name
ImageSchema
.virtual('file')
.get(function () {
  return this._id;
});

//Export model
module.exports = mongoose.model('Image', ImageSchema);
