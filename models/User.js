const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: false
  },
  comments: [
    {
			type: Schema.Types.ObjectId,
			ref: 'comments'
		}
  ]
}, { timestamps: true });

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);
