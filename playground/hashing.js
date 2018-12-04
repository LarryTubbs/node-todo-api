const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         // save hash to db
//         console.log(hash);
//     });
// });

var hashedPassword = '$2a$10$6zNjo3RKUGHzpJpDhY4EN.aFGEzq42pH1eZVrJlb.rB47E5RAftd6';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});


// const salt = '123abc';

// var data = {
//     id: 10
// };



// var token = jwt.sign(data, salt);
// console.log('token: ', token);

// var decoded = jwt.verify(token, salt);
// console.log('decoded: ', decoded);



// const {SHA256} = require('crypto-js');

//var message = 'I am a string';
// var hash = SHA256(message).toString();
// const salt = 'somesecret';

// console.log(`Message: ${message}`);
// console.log('Hash: ', hash);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + salt).toString()
// };

// // // simulate a hack
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(data).toString());


// var resultHash = SHA256(JSON.stringify(data) + salt).toString();

// if (resultHash === token.hash) {
//     // hash good
//     console.log('data was not changed');
// } else {
//     // hash bad
//     console.log('data was changed.  Do not trust!');
// };

