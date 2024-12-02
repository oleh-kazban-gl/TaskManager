const mongoose = require('mongoose');
const { User } = require('./models/user');

const uri = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager-api';

mongoose
    .connect(`${uri}/${databaseName}`)
    .then((response) => {
        console.log('Connection response: ', response);
    })
    .catch((error) => {
        console.log('Connection error: ', error);
    })
    .finally(() => {
        console.log('Finally');
    });

// const me = new User({
//   name: 'Oleh',
//   age: 44
// });
// me.save().then(response => {
//   console.log('Save: ', response);
// }).catch(error => {
//   console.log('Save error: ', error);
// });

const user = new User({
    name: 'Andrew',
    age: 40,
});
user.save()
    .then((response) => {
        console.log('Save: ', response);
    })
    .catch((error) => {
        console.log('Save error: ', error);
    })
    .finally(() => {
        mongoose.disconnect();
    });
