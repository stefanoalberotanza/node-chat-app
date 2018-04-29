var socket = io();

socket.on('connect', function (){
    console.log('Connected to server');
});

socket.on('disconnect', function (){
    console.log('Disconnected from server');
});

//riceve l'evento, ci fa qualcosa
socket.on('newMessage', function(message) {
    var formatTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formatTime
    });

    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function(message) {
    var formatTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formatTime
    });
    
    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function(message) {
    var li = jQuery('<li></li>')
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.form}:`);
    a.attr(`href`, message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    var messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert("Geolocation not supported by your browser.");
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert("Geolocation not supported by your browser.");
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('Unable to fetch location.');
    });
});