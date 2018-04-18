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

    //fa partire un evento, con i dati dell'evento
    //lo mostra solo all'user connesso
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    });

    //fa partire un evento, quando l'user si connette
    //mostra i dati a tutti i connessi non a lui
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    })

    socket.on('createMessage', (message) => {
        console.log('Message created', message);
        io.emit('newMessage', {
            from: message.from,
            text:message.text,
            createdAt: new Date().getTime()
        });

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
