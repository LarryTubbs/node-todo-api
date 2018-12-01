const {MongoClient, ObjectID} = require('mongodb');
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'TodoApp';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect( (err) => {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    // db.collection('Todos').find({
    //     _id: new ObjectID('5c01fc8702e5312f6aedd826')
    // }).toArray().then((docs) =>{
    //     console.log('Todos:');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('unable to fetch todos', err);
    // });

    // db.collection('Todos').find().count().then((result) =>{
    //     console.log('Number of Todos: ', result);
    // }, (err) => {
    //     console.log('unable to fetch todos', err);
    // });
    db.collection('Users').find({name: 'Larry'}).toArray().then((docs) =>{
        console.log('Todos:');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('unable to fetch todos', err);
    });
    client.close();
});


// MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
//     if (error) {
//         console.log('unable to connect to mongodb server');
//         return;
//     };
//     console.log('connected to mongodb server');

//     db.collection('Todos').insertOne({
//         text: 'Something to do',
//         completed: false
//     }, (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(result);
//         }
//     });
//     db.close();

// });

