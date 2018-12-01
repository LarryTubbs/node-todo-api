const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

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

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }).catch( (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (! ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    };

    Todo.findById(id).then((todo) => {
        if (!todo) {
            res.status(404).send();
            return;
        };
        res.status(200).send({todo});
    }).catch((e) => {
        res.status(400).send();
        return;
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (! ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    };

    Todo.findByIdAndDelete(id).then((todo) => {
        if (!todo) {
            res.status(404).send();
            return;
        };
        res.status(200).send({todo});
    }).catch((e) => {
        res.status(400).send();
        return;
    });
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server listening on port ', port);
});

module.exports = {app};

