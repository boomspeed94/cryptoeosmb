var router = require('express').Router();
var auth = require('../../app/auth');

// var { Api, JsonRpc, RpcError } = require('eosjs');
// var JsSignatureProvider = require('eosjs/dist/eosjs-jssig').default;
// var fetch = require('node-fetch');
// var { TextDecoder, TextEncoder } = require('text-encoding');
// var defaultPrivateKey = ["5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr"];
// var signatureProvider = new JsSignatureProvider(defaultPrivateKey);
// var rpc = new JsonRpc('http://jungle2.cryptolions.io:80', {fetch});
// var api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder, textEncoder: new TextEncoder});
// // var {rpc, api} = require('../../src/eosapi')
// var ress = rpc.get_account('fnx2exchange').then(function(res){
//   console.log(res);
//   console.log(res.account_name);
//   res.json(JSON.stringify(res));
// });

var Eos = require('eosjs');

// Default configuration
var config = {
  chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473', // 32 byte (64 char) hex string
  // keyProvider: ['5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr'], // WIF string or array of keys..
  keyProvider: ['5JnGLYHHhndGpdkQ9bfpbHvgvpUX8zNWSrbNEBWdWzDWknh6ZXP'], // WIF string or array of keys..
  httpEndpoint: 'http://jungle2.cryptolions.io:80',
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // API activity
  sign: true
}
var eos = Eos(config);

router.get('/accounts', auth.required, function(req, res, next){
  console.log("get account");
  eos.getInfo({}).then(function(result){
    // console.log(result);
  });

  eos.getAccount('fnx2exchange').then(function(result){
    // console.log(result);
  });

  // eos.transfer();

  eos.getAbi('fnx2exchange').then(function(result){
    // console.log(result);
  });

  eos.getTableRows(true, 'fnx2exchange', 'fnx2exchange', 'accounts', '', 0, 0, 100).then(function(rows, more){
    console.log(rows);
  })

  res.json({message: 'Truong Ne'});
});

module.exports = router;
