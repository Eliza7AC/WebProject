import express from 'express';
import { Server } from 'ws';
import messagesRouter from "./services/messages-routage";
import scoresRouter from "./services/scores-routage";
import usersRouter from "./services/users-routage";

const app = express();
const url = require('url');

app.use(express.json());
app.use(express.static('./dist/app'));
app.use('/messages', messagesRouter);
app.use('/scores', scoresRouter);
app.use('/users', usersRouter);

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

app.get('*', function(req, res) {
  var fullUrl = req.protocol + '://' + req.get('host') + '#' + req.originalUrl;
  res.redirect(fullUrl);
});

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
