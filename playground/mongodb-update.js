const {MongoClient, ObjectId} = require('mongodb');
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

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectId("5c01f4fa230c7dc3f4124972")
    // }, {
    //     $set: {completed: false}
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(JSON.stringify(result, undefined, 2));
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectId("5c01f725a2003bc40df80317")
    }, {
        $set: {name: 'Larry'},
        $inc: { age: 1}
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });
    
    client.close();
});

