const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('../../models/Todo');
const {User} = require('../../models/User');

const userOneID = new ObjectID();
const userTwoID = new ObjectID();

const users = [{
    _id: userOneID,
    email: 'larry.tubbs@tubbsfamily.org',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneID, access: 'auth'}, 'abc123').toString()
    }]
},{
    _id: userTwoID,
    email: 'lori.tubbs@tubbsfamily.org',
    password: 'userTwoPass'
}];

// create seed data
const seedTodos = [{
    _id: new ObjectID(),
    text: '1st test todo'
},{
    _id: new ObjectID(),
    text: '2nd test todo',
    completed: true,
    completedAt: new Date().getTime()
},{
    _id: new ObjectID(),
    text: '3rd test todo'
},{
    _id: new ObjectID(),
    text: '4th test todo'
},{
    _id: new ObjectID(),
    text: '5th test todo'
},{
    _id: new ObjectID(),
    text: '6th test todo'
}];

const populateTodos = (done) => {
    Todo.deleteMany({}).then( () => {
        Todo.insertMany(seedTodos);
        return;
    }).then(() => done());
};

const populateUsers = (done) => {
    User.deleteMany({}).then( () => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(() => done());
};

module.exports = {
    seedTodos,
    populateTodos,
    users,
    populateUsers
};