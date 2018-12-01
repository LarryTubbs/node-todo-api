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
  
//   db.collection('Todos').insertOne({
//     text: 'Something to do',
//     completed: false
//     }, (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(JSON.stringify(result.ops, undefined, 2));
//         }
//     });
    db.collection('Users').insertOne({
        name: 'Larry',
        age: 50,
        location: 'North Richland Hills'
        }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(JSON.stringify(result.ops, undefined, 2));
                console.log(result.ops[0]._id.getTimestamp());
            }
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

