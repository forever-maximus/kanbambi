const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', (ws, req) => {
  var id = req.url.split('=')[1];
  ws.clientId = id;
  ws.boardId = 0; // board 0 will represent the homepage

  // frontend client will send updates about which board it is subscribed to
  ws.on('message', (data) => {
    const update = JSON.parse(data);
    ws.boardId = update.currentBoard;
  });
});

wss.updateOtherClients = (id, boardId, data, eventType, details = {}) => {
  const updateData = {
    payload: data, 
    eventType: eventType, 
    details: details
  };
  
  wss.clients.forEach(client => {
    if (client.clientId !== id && client.boardId === boardId) {
      client.send(JSON.stringify(updateData));
    }
  });
}

module.exports = wss;