const mongoose = require('mongoose');

//example: 16:00:00 repeat 1 day
const LotteryTimeSchema = new mongoose.Schema({
    name: {type: String, unique: true},
    time: {type: String, required: [true, "can't be blank"]},  //time format HH:mm:ss
    repeat: {type: Number, default: 1},
    repeat_period: {type: String, default: 'day'}
}, {timestamps: true});

LotteryTimeSchema.methods.toJSON = function(){
    return {
        name: this.name,
        time: this.time,
        repeat: this.repeat + ' ' + this.repeat_period
    };
};

mongoose.model('LotteryTime', LotteryTimeSchema);
