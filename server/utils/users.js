const _ = require('lodash');

[{
    id: '/#12uifomneiomf',
    name: 'Andrew',
    room: 'The office Fans'
}];

class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser (id) {
        // var users = _.remove(this.users, (user) => user.id === id);

        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        
        return user;
    }
    getUser (id) {
    // var user = _.find(this.users, {id: `${id}`});

        return this.users.find((user) => user.id === id);
    }
    getUserList (room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

//ES6 class
// class Person {
//     constructor (name, age) {
//         //si riferisce all'istanza
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription () {
//         return `${this.name} is ${this.age} years(s) old`;
//     }
// }

// var me = new Person('Stefano', 22);
// var description = me.getUserDescription();
// console.log(description);

module.exports = {Users};