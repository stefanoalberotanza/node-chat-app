const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server); //web socket server

app.use(express.static(publicPath));

//just for the Client
io.on("connection", (socket) => {
    console.log("New user connected");

    socket.emit('newEmail', {
        from: 'mike@example.com',
        text: 'Hey. What is going on.',
        createdAt: 123
    });

    socket.emit('newMessage', {
        from: 'Stefano',
        text:'Hey, im sending new message',
        createdAt: 123
    });

    socket.on('createMessage', (message) => {
        console.log('Message created', message);
    });

    socket.on('disconnect', (socket) => {
        console.log("User was disconnect");
    });
});


//identico ad app.listent
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
