const mongoose = require('mongoose');

const BlockSchema = new mongoose.Schema({
  name: String,
  height: {type: String, unique: true},
  hash: {type: String, unique: true},
  time: Date,
  previous_hash: String,
  date_created: Date
}, {timestamps: true});

BlockSchema.methods.toJSON = function(){
  return {
    name: this.name,
    height: this.height,
    hash: this.hash,
    time: this.time.toUTCString()
  };
};

mongoose.model('Block', BlockSchema);
