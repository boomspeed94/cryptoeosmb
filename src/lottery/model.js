const mongoose = require('mongoose');

const LotterySchema = new mongoose.Schema({
  type: {type: String, default: 'JackPot'},
  white_ball_1: {type: Number, required: [true, "can't be blank"], min: 1, max: 69},
  white_ball_2: {type: Number, required: [true, "can't be blank"], min: 1, max: 69},
  white_ball_3: {type: Number, required: [true, "can't be blank"], min: 1, max: 69},
  white_ball_4: {type: Number, required: [true, "can't be blank"], min: 1, max: 69},
  white_ball_5: {type: Number, required: [true, "can't be blank"], min: 1, max: 69},
  red_ball: {type: Number, required: [true, "can't be blank"], min: 1, max: 26},
  date_created: Date,
}, {timestamps: true});

LotterySchema.methods.toJSON = function(){
  return {
    'type': this.type,
    'white_ball_1': this.white_ball_1,
    'white_ball_2': this.white_ball_2,
    'white_ball_3': this.white_ball_3,
    'white_ball_4': this.white_ball_4,
    'white_ball_5': this.white_ball_5,
    'red_ball': this.red_ball,
    'date_created': this.date_created.toUTCString(),
  };
};

mongoose.model('Lottery', LotterySchema);
