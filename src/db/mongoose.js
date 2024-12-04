const mongoose = require('mongoose');
const { User } = require('./models/user');
const { Task } = require('./models/task');

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
    name: 'Mykola',
    email: 'email@com.net',
    password: '1234567',
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

// const task1 = new Task({
//     description: 'Learn something new',
//     completed: false,
// });
// const task2 = new Task({
//     description: 'Buy some grosseries',
//     completed: true,
// });
// const task3 = new Task({
//     description: 'Watch movies',
//     completed: false,
// });

// task3
//     .save()
//     .then((task) => {
//         console.log('Task: ', task);
//     })
//     .catch((error) => {
//         console.log('Error: ', error);
//     })
//     .finally(() => {
//         mongoose.disconnect();
//     });
