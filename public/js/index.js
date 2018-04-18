var socket = io();

    socket.on('connect', function (){
        console.log('Connected to server');
    });

    socket.on('disconnect', function (){
        console.log('Disconnected from server');
    });

    //riceve l'evento, ci fa qualcosa
    socket.on('newMessage', function(message) {
        console.log('New Message', message);
    });