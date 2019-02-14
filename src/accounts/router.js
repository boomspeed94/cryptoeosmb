const router = require('express').Router();
const auth = require('../jwt/auth');
// const blockexplorer = require('blockchain.info/blockexplorer')
//const blockexplorer = require('blockchain.info/blockexplorer').usingNetwork(3) //todo: testnet

const { Api, JsonRpc, RpcError } = require('eosjs');
const JsSignatureProvider = require('eosjs/dist/eosjs-jssig').default;
const fetch = require('node-fetch');
const { TextDecoder, TextEncoder } = require('text-encoding');
const defaultPrivateKey = ["5JnGLYHHhndGpdkQ9bfpbHvgvpUX8zNWSrbNEBWdWzDWknh6ZXP"];
const signatureProvider = new JsSignatureProvider(defaultPrivateKey);
const rpc = new JsonRpc('http://jungle2.cryptolions.io:80', {fetch});
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder, textEncoder: new TextEncoder});

//testing fnx2exchange
router.get('/', auth.required, function(req, res, next){
  const accountName = req.body.account.name
  if(!accountNam){
    return res.status(422).json({errors: {account_name: "can't be null"}});
  }

  try{
    rpc.get_account(accountName).then(function(result){
      res.json(result)
    });
  } catch(ex){
    if (ex instanceof RpcError)
        res.json(JSON.stringify(e.json, null, 2));
    else res.json(ex)
  }
});

//code: fnx2exchange, scope: fnx2exchange
router.get('/tablerows', auth.required, function(req, res, next){
  try{
    const code = req.body.account.code;
    const scope = req.body.account.code;
    const limit = 100;
    if(!code){
      return res.status(422).json({errors:{'missing properties': "code"}});
    }
    if(!scope){
      return res.status(422).json({errors:{'missing properties': "scope"}});
    }
    rpc.get_table_rows({
        json: true,              // Get the response as json
        code: code,     // Contract that we target
        scope: scope,         // Account that owns the data
        table: 'accounts',        // Table name
        limit: limit,               // Maximum number of rows that we want to get
        reverse: false,         // Optional: Get reversed data
        show_payer: false,      // Optional: Show ram payer
      }).then(function(result){
          res.json(result);
      });
  } catch(ex){
    if (ex instanceof RpcError)
        res.json(JSON.stringify(e.json, null, 2));
    else res.json(ex)
  }
});

router.post('/transact', function(req, res, next){
  (async () => {
    try {
      const account = req.body.transfer.account
      const toAccount = req.body.transfer.to
      const quantity = req.body.quantity //format float with 8
      const result = await api.transact({
        actions: [{
          account: 'fnx2exchange',
          name: 'transfer',
          authorization: [{
            actor: 'fnx2exchange',
            permission: 'active'
          }],
          data: {
            from: 'fnx2exchange',
            to: 'fnxlotto1111',
            quantity: '0.10000000 NAV',
            memo: '',
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });

      console.log(result);
  } catch (e) {
    console.log('\nCaught exception: ' + e);
    if (e instanceof RpcError)
      console.log(JSON.stringify(e.json, null, 2));
  }
  })();

});

// callBlockChain = function callBlockChain(){
//   console.log("call here");
//   return new Promise((resolve, reject) => {
//     blockexplorer.getBlocks(milliseconds).then(function(result){
//       console.log("how long for return result");
//       return resolve(result)
//     }).catch(err => {
//       return reject(err)
//     })
//   })
//
//   // try{
//   //   var milliseconds = (new Date).getTime();
//   //   console.log(milliseconds);
//   //   const options = {}
//   //   blockexplorer.getBlocks(milliseconds).then(function(result){
//   //     console.log(result);
//   //     return result
//   //   });
//   // }catch(ex){
//   //   console.log("\nHas errors: " + ex);
//   //   return ex
//   // }
// }
// const jwt = require('jsonwebtoken');
// router.get('/blockexplorer', function(req, res, next){
//   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjM2RmNDA5YzM1ZTFiMzc2ODgxZmJkNiIsInVzZXJuYW1lIjoidHJ1b25ndGVzdHMiLCJleHAiOjE1NTM2MTYwODAsImlhdCI6MTU0ODQzMjA4MH0.DcvW3OTDLwPeoso0VCje1ORbinYK9uXTXRnLSbldBMI'
//   jwt.verify(token, 'secret-key', function (err, decoded) {
//                 if (err) {
//                   console.log("err: " + err);
//                     // cb(false, 401, 'Unauthorized')
//                 } else {
//                     info.req.user = decoded //[1]
//                     console.log('ok');
//                     // cb(true)
//                 }
//             })
//   res.json({message: 'truong ne'})
// });

module.exports = router;
