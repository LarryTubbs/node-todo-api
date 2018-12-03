require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/User');
var {authenticate} = require('./middleware/authenticate');

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

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ["text", "completed"]);

    if (! ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    };

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    };

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ["email", "password"]);

    var newUser = new User(body);
    newUser.save().then( () => {
        return newUser.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(newUser);
    }).catch( (e) => {
        res.status(400).send(e);
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

var port = process.env.PORT;
app.listen(port, () => {
    console.log('Server listening on port ', port);
});

module.exports = {app};

