var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProjectSchema = Schema(
  {
    title: {type: String, required: true, max: 100},
    icon: [{ type: Schema.Types.ObjectId, ref : 'Image' }],
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// // Virtual for author's full name
// ProjectSchema
// .virtual('name')
// .get(function () {
//   return this.family_name + ', ' + this.first_name;
// });
//
// // Virtual for author's URL
// ProjectSchema
// .virtual('url')
// .get(function () {
//   return '/catalog/author/' + this._id;
// });

//Export model
module.exports = mongoose.model('Project', ProjectSchema);
