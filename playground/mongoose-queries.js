const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/Todo');

var id = '5c02f0e637e14bce805785d4';

Todo.find({
    _id: id
}).then( (todos) => {
    console.log('Todos via find(): ', todos);
});

Todo.findOne({
    _id: id
}).then( (todo) => {
    console.log('Todo via findOne(): ', todo);
});

Todo.findById(id).then((todo) => {
    console.log('Todo via findById: ', todo)
});