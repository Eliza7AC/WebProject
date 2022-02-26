import express from 'express';
import { Server } from 'ws';

const app = express();
const url = require('url');
app.use(express.static('./dist/app'))
app.get('/', function(req, res) {
  res.sendFile('index.html');
})
app.get('*', function(req, res) {
  var fullUrl = req.protocol + '://' + req.get('host') + '#' + req.originalUrl;
  res.redirect(fullUrl);
})
app.listen(4200);


const wsServer = new Server({port:8080});

wsServer.on('connection', function(ws) {
  ws.on('message', function(message) {
    wsServer.broadcast(message);
  });
  ws.send('Successfully connected to the chat');
});

wsServer.broadcast = function broadcast(data) {
  wsServer.clients.forEach(function each(client) {
    client.send(data);
  });
};
