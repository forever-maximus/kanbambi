const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', (ws, req) => {
  var id = req.url.split('=')[1];
  ws.clientId = id;
});

wss.updateOtherClients = (id, data) => {
  wss.clients.forEach(client => {
    if (client.clientId !== id) client.send(JSON.stringify(data));
  });
}

module.exports = wss;