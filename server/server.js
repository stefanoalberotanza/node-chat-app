const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server); //web socket server

app.use(express.static(publicPath));

//just for the Client
io.on("connection", (socket) => {
    console.log("New user connected");

    
    //fa partire un evento, con i dati dell'evento
    //lo mostra solo all'user connesso
    socket.emit('newMessage', generateMessage('Admin', 'Welcom to the chat app'));

    //fa partire un evento, quando l'user si connette
    //mostra i dati a tutti i connessi non a lui
    socket.broadcast.emit('newMessage',   generateMessage('Admin', 'New user joinend'));
    
    socket.on('createMessage', (message, callback) => {
        console.log('Message created', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createAt: newDate().getTime()
        // });
    });

    socket.on('disconnect', (socket) => {
        console.log("User was disconnect");
    });
});

//identico ad app.listent
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
