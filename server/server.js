const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/User');

var app = express();
app.use(bodyParser.json());

// define rest API endpoints
app.post('/todos', (req, res) => {
    var newTodo = new Todo({
        text: req.body.text
    });
    newTodo.save().then( (doc) => {
        res.send(doc);
    }).catch( (e) => {
        res.status(400).send(e);
    });
});


var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server listening on port ', port);
});

// var newTodo = new Todo({
//     text: 'Make coffee'
// });

// newTodo.save().then( (doc) => {
//     console.log(doc);
//     console.log('Saved to database');
// }).catch( (e) => {
//     console.log('unable to save Todo to db: ', e);
// });

// var newUser = new User({
//     email: 'l_squared@hotmail.com'
// });

// newUser.save().then( (doc) => {
//     console.log('user saved: ', JSON.stringify(doc, undefined, 2));
// }).catch( (e) => {
//     console.log('unable to save user: ', JSON.stringify(e, undefined, 2));
// });
