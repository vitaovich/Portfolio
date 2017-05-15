import { Schema , model } from 'mongoose';

let ContentSchema = new Schema({
    type: {type: String, required: true, max: 10},
    details: {type: String}
});

let ProjectSchema = new Schema(
  {
    title: {type: String, required: true, max: 100},
    icon: ContentSchema,
    description: {type: String},
    contents: [ContentSchema]
  }
);

// Export model
export = model('Project', ProjectSchema);
