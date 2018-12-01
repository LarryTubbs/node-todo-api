const expect = require('expect.js');
const request = require('supertest');

const {app} = require('../server');
const {Todo} = require('../models/Todo');

beforeEach((done) => {
    Todo.deleteMany({}).then( () => done());
})

describe('POST /Todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';
        var bad = "blah";
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).to.be(text);
            }).end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }
                
                Todo.find().then( (todos) => {
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
            .send({})
            .expect(400)
            .end( (err, res) => {
                if (err) {
                    done(err);
                    return;
                }

                Todo.find().then( (todos) => {
                    expect(todos.length).to.be(0);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });
});
