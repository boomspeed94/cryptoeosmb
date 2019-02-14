var webSocketServer = require('ws').Server
var wsServer = null;

const init = function(server){
  wsServer = new webSocketServer({
      server: server,
      path: '/notification'
  });
}

const send = function(params){
  const data = {
    "status": 200,
    "lottery": true,
    "winning_number": params.lottery
  }
  wsServer.clients.forEach(function each(client) {
     client.send(JSON.stringify(data));
   });
   return 200
}

module.exports = {
  init: function(server){
    init(server);
  },
  send: function(params){
    send(params);
  }
};
