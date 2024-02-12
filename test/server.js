const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    socket.on('join room', (room) => {
        socket.join(room);
    });

    socket.on('leave room', (room) => {
        socket.leave(room);
    });

    socket.on('send message', (room, message) => {
        io.to(room).emit('receive message', message);
    });
});

server.listen(3000, () => console.log('Server started on port 3000'));