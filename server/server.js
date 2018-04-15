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

    socket.on('disconnect', (socket) => {
        console.log("User was disconnect");
    });
});


//identico ad app.listent
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
