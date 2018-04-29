var moment = require('moment');

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    }
};

var generateLocationMessage = (from, lat, lon) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${lon}`,
<<<<<<< HEAD
        createdAt: moment().valueOf()
    }
}

module.exports = {generateMessage, generateLocationMessage}; 
=======
        createdAt: new Date().getTime()
    }
}

module.exports = {generateMessage, generateLocationMessage};
>>>>>>> 14f5d488d67d6dcce746280412ea80047f7818de
