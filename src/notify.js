var webSocketServer = require('ws').Server
var wsServer = null;

function noop() {
}

function heartbeat() {
  this.isAlive = true;
}

const init = function(server){
  wsServer = new webSocketServer({
    server: server,
    path: '/notification'
  });

  wsServer.on('connection', function connection(ws) {
    ws.isAlive = true;
    ws.on('pong', heartbeat);
  });

}

const interval = setInterval(function ping() {
  wsServer.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping(noop);
  });
}, 30000);

const send = function(params){
  const data = {
    "status": 200,
    "lottery": true,
    "winning_number": params.lottery
  }
  wsServer.clients.forEach(function each(client) {
    if (client.isAlive === false) return client.terminate();
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
