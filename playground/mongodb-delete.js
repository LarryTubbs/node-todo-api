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

    // delete many
    var criteria = {text: 'Eat Lunch'};
    // db.collection('Todos').deleteMany(criteria).then( (result) => {
    //     console.log(result);
    // });

    // delete one
    // db.collection('Todos').deleteOne(criteria).then( (result) => {
    //     console.log(`deleted ${result.result.n} documents`);
    // });
    
    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete(criteria).then((result) => {
    //     console.log(result);
    // });

    // find and delete all documents with {name: 'Larry'}
    criteria = {name: 'Larry'};
    db.collection('Users').deleteMany(criteria).then((result) => {
        console.log(result);
    });

    db.collection('Users').deleteOne({_id: new ObjectID('5c01f85009e58fc41261c952')}).then((result) => {
        console.log(result);
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

