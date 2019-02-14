const mongoose = require('mongoose');
const router = require('express').Router();
const request = require('request');
const Block = mongoose.model('Block');
const apiToken = process.env.API_BLOCKCYPHER_TOKEN === 'NULL' ? null : process.env.API_BLOCKCYPHER_TOKEN


router.post('/', function (req, res, next) {
    var blockCypherAPI = process.env.API_BLOCKCYPHER_ENDPOINT;
    if(apiToken) blockCypherAPI += '?token=' + apiToken;
     request(blockCypherAPI, { json: true }, (err, response, body) => {
        if (err) {
            res.status(403).json({errors: err});
        }
        if(response.body){
            var nowDate = new Date()
            var data = response.body;
            //var date = new Date(nowDate.getUTCFullYear() + '-' + nowDate.getUTCMonth()+1 + "-" + nowDate.getUTCDate());
            var date = new Date(Date.UTC(nowDate.getFullYear(),nowDate.getMonth(), nowDate.getDate()));
            Block.findOne({date_created: date}).then(function (block) {
                if(!block){
                    block = new Block();
                    //blockCypher response time with timezone GMT+0, need parse to, currently hardcode GMT+7
                    block.time = new Date(new Date(data.time).getTime() + 7 * 60 * 60 * 1000);
                }
                block.name = data.name;
                block.height = data.height;
                block.hash = data.hash;
                block.previous_hash = data.previous_hash;
                block.date_created = date;
                block.save().then(function () {
                    res.json({block: block.toJSON()});
                })
            }).catch(next);

        } else {
            res.sendStatus(403);
        }
    });
});

//response block today
router.get('/', function (req, res, next) {
    var nowDate = new Date()
    //var date = new Date(nowDate.getUTCFullYear() + '-' + nowDate.getUTCMonth()+1 + "-" + nowDate.getUTCDate());
    var date = new Date(Date.UTC(nowDate.getFullYear(),nowDate.getMonth(), nowDate.getDate()));
    Block.findOne({date_created: date}).then(function (block) {
        if(!block) {
            res.json({errors: 'block not found'});
        }
        res.json({block: block.toJSON()});
    }).catch(next);
});

module.exports = router;
