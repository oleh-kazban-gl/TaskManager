const express = require('express');

require('./db/mongoose');

const User = require('./models/user');
const Task = require('./models/task');

/*
Tasks:
post    /tasks

GET     /tasks
GET     /tasks/:id

DELETE  /tasks/:id

PATCH   /tasks/:id

Users:
post    /users

GET     /users
GET     /users/:id

DELETE  /users/:id

PATCH   /users/:id

*/

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.listen(port, () => {
  console.log(`The server is up and running on ${port} port`);
});

app.post('/users', (request, response) => {
  const user = new User(request.body);
  user
    .save()
    .then(() => {
      response.status(201).send(user);
    })
    .catch((err) => {
      response.status(400).send(err);
    });
});

app.post('/tasks', (request, response) => {
  const task = new Task(request.body);
  task
    .save()
    .then(() => {
      response.status(201).send(task);
    })
    .catch((err) => {
      response.status(400).send(err);
    });
});
