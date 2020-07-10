const mongoose = require('mongoose')
const { Schema } = mongoose;

const commentSchema = new Schema({
  details: { 
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('comments', userSchema);
