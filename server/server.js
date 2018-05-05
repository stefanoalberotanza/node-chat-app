const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server); //web socket server
var users = new Users();

app.use(express.static(publicPath));

//just for the Client
io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required.');
        };

        
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        // socket.leave('La stanza');

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        //fa partire un evento, con i dati dell'evento
        //lo mostra solo all'user connesso
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        //fa partire un evento, quando l'user si connette
        //mostra i dati a tutti i connessi non a lui
        socket.broadcast.to(params.room).emit('newMessage',   generateMessage('Admin', `${params.name} has joinend`));
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    });
});

//identico ad app.listent
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
