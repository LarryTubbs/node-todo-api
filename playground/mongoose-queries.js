const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
// const {Todo} = require('../server/models/Todo');
const {User} = require('../server/models/User');

var id = '5c02835f2393dec87990063a';

if (! ObjectID.isValid(id)) {
    console.log('ID not valid');
    return;
};

User.findById(id).then((user) => {
    if (!user) {
        console.log('user not found');
        return;
    }
    console.log(user);
}).catch((e) => {
    console.log(e);
});

// var id = '5c02f0e637e14bce805785d411';
// if (! ObjectID.isValid(id)) {
//     console.log('id not valid');
//     return;
// }


// Todo.find({
//     _id: id
// }).then( (todos) => {
//     if (todos.length === 0) {
//         console.log('id not found');
//         return;
//     };
//     console.log('Todos via find(): ', todos);
// });

// Todo.findOne({
//     _id: id
// }).then( (todo) => {
//     if (!todo) {
//         console.log('id not found');
//         return;
//     };
//     console.log('Todo via findOne(): ', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         console.log('id not found');
//         return;
//     };
//     console.log('Todo via findById: ', todo)
// }).catch((e) => {
//     console.log(e);
// });