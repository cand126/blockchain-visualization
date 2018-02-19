var io = require('socket.io')();
var socket = {};

socket.io = io;

io.on('connection', function(socket){
  console.log('A user connected');
});

module.exports = socket;