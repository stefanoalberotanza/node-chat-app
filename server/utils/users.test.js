const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node'
        },{
            id: '2',
            name: 'Jen',
            room: 'React'
        },{
            id: '3',
            name: 'July',
            room: 'Node'
        }]
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Stefano',
            room: 'The Office Fans'
        }

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        users.removeUser('2');

        expect(users.users).toEqual([{
            id: '1',
            name: 'Mike',
            room: 'Node'
        },{
            id: '3',
            name: 'July',
            room: 'Node'
        }]);
    });

    it('should not remove user', () => {
        users.removeUser('4');
        
        expect(users.users).toEqual([{
            id: '1',
            name: 'Mike',
            room: 'Node'
        },{
            id: '2',
            name: 'Jen',
            room: 'React'
        },{
            id: '3',
            name: 'July',
            room: 'Node'
        }]);
    });

    it('should find user', () => {
        var user = users.getUser('3');
        expect(user.id).toBe('3');
    });

    it('should not find user', () => {
        var user = users.getUser('4');

        expect(user).toNotExist();
    });

    it('shoukd return names for React corse', () => {
        var userList = users.getUserList('React');

        expect(userList).toEqual(['Jen']);
    });


    it('shoukd return names for node corse', () => {
        var userList = users.getUserList('Node');

        expect(userList).toEqual(['Mike', 'July']);
    });
});