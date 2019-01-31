const mongoose = require('mongoose');

const LotteryTimeSchema = new mongoose.Schema({
    name: {type: String, unique: true},
    time: String  //time format HH:mm:ss
}, {timestamps: true});

mongoose.model('LotteryTime', LotteryTimeSchema);
