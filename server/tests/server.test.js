const expect = require('expect.js');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../server');
const {Todo} = require('../models/Todo');
const {User} = require('../models/User');
const {seedTodos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /Todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';
        var bad = "blah";
        request(app)
            .post('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).to.be(text);
            }).end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }
                
                Todo.find({text}).then( (todos) => {
                    expect(todos.length).to.be(1);
                    expect(todos[0].text).to.be(text);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });

    it('should not create a todo if the body is empty', (done) => {
        request(app)
            .post('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .send({})
            .expect(400)
            .end( (err, res) => {
                if (err) {
                    done(err);
                    return;
                }

                Todo.find().then( (todos) => {
                    expect(todos.length).to.be(6);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect( (res) => {
                expect(res.body.todos.length).to.be(5);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should get a specific todo', (done) => {
        request(app)
            .get(`/todos/${seedTodos[0]._id.toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect( (res) => {
                expect(res.body.todo.text).to.be(seedTodos[0].text);
            })
            .end(done);
    });

    it('should not get a todo for another user', (done) => {
        request(app)
            .get(`/todos/${seedTodos[1]._id.toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('should return a 404 for todo not found', (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('sound return 404 for invalid ObjectID', (done) => {
        request(app)
            .get(`/todos/12345`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a specific todo', (done) => {
        request(app)
            .delete(`/todos/${seedTodos[1]._id.toHexString()}`)
            .set('x-auth', users[1].tokens[0].token)
            .expect(200)
            .expect( (res) => {
                expect(res.body.todo.text).to.be(seedTodos[1].text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(seedTodos[1]._id).then((todo) => {
                    expect(todo).to.be(null);
                    done();
                }).catch((e) => {
                    return done(err);
                })
            });
    });

    it('should not remove another users todo', (done) => {
        request(app)
            .delete(`/todos/${seedTodos[1]._id.toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(seedTodos[1]._id).then((todo) => {
                    expect(todo).to.be.ok();
                    done();
                }).catch((e) => {
                    return done(err);
                });
            });
    });
    
    it('should return a 404 for todo not found', (done) => {
        request(app)
            .delete(`/todos/${new ObjectID().toHexString()}`)
            .set('x-auth', users[1].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('sound return 404 for invalid ObjectID', (done) => {
        request(app)
            .delete(`/todos/12345`)
            .set('x-auth', users[1].tokens[0].token)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos:id', () => {
    it('should update the todo', (done) => {
        var id = seedTodos[0]._id.toHexString();
        var testText = 'Updated by test';
        
        request(app)
            .patch(`/todos/${id}`)
            .set('x-auth', users[0].tokens[0].token)
            .send({
                text: testText,
                completed: true
            })
            .expect(200)
            .expect( (res) => {
                expect(res.body.todo.text).to.be(testText);
                expect(res.body.todo.completed).to.be(true);
                expect(res.body.todo.completedAt).to.be.a('number');
            })
            .end(done);
    });

    it('should not update another users todo', (done) => {
        var id = seedTodos[0]._id.toHexString();
        var testText = 'Updated by test';
        
        request(app)
            .patch(`/todos/${id}`)
            .set('x-auth', users[1].tokens[0].token)
            .send({
                text: testText,
                completed: true
            })
            .expect(404)
            .end(done);
    });

    it('should clear completedAt when todo is not completed', (done) => {
        var id = seedTodos[1]._id.toHexString();
        var testText = 'Updated by test';
             
        request(app)
            .patch(`/todos/${id}`)
            .set('x-auth', users[1].tokens[0].token)
            .send({
                text: testText,
                completed: false
            })
            .expect(200)
            .expect( (res) => {
                expect(res.body.todo.text).to.be(testText);
                expect(res.body.todo.completed).to.be(false);
                expect(res.body.todo.completedAt).to.be(null);
            }).end(done);    
    });
});

describe('GET /users/me', () => {
    it('should return a user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).to.be(users[0]._id.toHexString());
                expect(res.body.email).to.be(users[0].email);
            })
            .end(done);
    });

    it('should return a 401 if not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).to.eql({});
            })
            .end(done);
    });
});

describe('POST /users', () => {
    it('should create a user', (done) => {
        var emailAddr = 'larry.tubbs@example.com';

        request(app)
            .post('/users')
            .send({
                email: emailAddr,
                password: 'abc123'
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).to.be.ok();
                expect(res.body._id).to.be.ok();
                expect(res.body.email).to.be(emailAddr);
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }
                
                User.findOne({email: emailAddr}).then( (user) => {
                    expect(user).to.be.ok();
                    expect(user.password).to.not.be('abc123');
                    expect(user.email).to.be(emailAddr);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });

    it('should return validation errors if request invalid', (done) => {
        request(app)
            .post('/users')
            .send({
                email: 'larryexample.com',
                password: '123abc'
            })
            .expect(400)
            .expect((res) => {
                expect(res.body.errors).to.be.ok();
            }).end(done);
    });

    it('should not create a new user if email in use', (done) => {
        request(app)
            .post('/users')
            .send({
                email: users[0].email,
                password: "abc123"
            })
            .expect(400)
            .expect((res) => {
                expect(res.body.errmsg).to.be.ok();
            }).end(done);
    });

});

describe('POST /users/login', () => {
    it('should login user and return auth token', (done) => {
        request(app)
        .post('/users/login')
        .send({
            email: users[1].email,
            password: users[1].password
        })
        .expect(200)
        .expect((res) => {
            expect(res.headers['x-auth']).to.be.ok();
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            };

            User.findById(users[1]._id).then((user) => {
                expect(user.tokens[1]).property('access', 'auth');
                expect(user.tokens[1]).property('token', res.headers['x-auth']);
                return done();
            }).catch((e) => {
                return done(e);
            });
        });
    });

    it('should reject invalid login', (done) => {
        request(app)
        .post('/users/login')
        .send({
            email: users[1].email,
            password: users[1].password + 'Invalid'
        })
        .expect(400)
        .expect((res) => {
            expect(res.headers['x-auth']).to.not.be.ok();
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            };

            User.findById(users[1]._id).then((user) => {
                expect(user.tokens.length).to.be(1);
                return done();
            }).catch((e) => {
                return done(e);
            });
        });
    });
});

describe('DELETE /users/me/token', () => {
    it('should remove auth token on logout', (done) => {
        request(app)
            .delete('/users/me/token')
            .set('x-auth', users[0].tokens[0].token)
            .send()
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens.length).to.be(1);
                    return done();
                }).catch((e) => {
                    return done(e);
                });
            });
    });
});