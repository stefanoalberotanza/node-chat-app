var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Stefano';
        var text ='This is a test';
        var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct message location', () => {
        var from = 'Admin';
        var lat = 41;
        var log = 17;
        var location = generateLocationMessage(from, lat, log);
        var url = `https://www.google.com/maps?q=41,17`;

        expect(location.createdAt).toBeA('number');
        expect(location).toInclude({from, url});
    })
});