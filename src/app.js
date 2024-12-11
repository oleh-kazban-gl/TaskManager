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

app.post('/users', async (request, response) => {
  try {
    const result = await new User(request.body).save();
    response.status(201).send(result);
  } catch (error) {
    response.status(400).send(error);
  }
});

app.get('/users', async (request, response) => {
  try {
    const result = await User.find({});
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});
app.get('/users/:id', async (request, response) => {
  const _id = request.params.id;

  try {
    const result = await User.findById(_id);

    if (!result) {
      return response.status(404).send();
    } else {
      response.send(result);
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

app.patch('/users/:id', async (request, response) => {
  const id = request.params.id;
  const update = request.body;

  try {
    const result = await User.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return response.status(404).send();
    } else {
      response.send(result);
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete('/users/:id', async (request, response) => {
  const id = request.params.id;

  try {
    const result = await User.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).send();
    }

    response.status(200).send(result);
  } catch (error) {
    response.status(400).send(error);
  }
});

app.post('/tasks', async (request, response) => {
  try {
    const result = await new Task(request.body).save();
    response.status(201).send(result);
  } catch (error) {
    response.status(400).send(error);
  }
});

app.get('/tasks', async (request, response) => {
  try {
    const result = await Task.find({});
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});
app.get('/tasks/:id', async (request, response) => {
  const _id = request.params.id;

  try {
    const result = await Task.findById(_id);

    if (!result) {
      return response.status(404).send();
    } else {
      response.send(result);
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

app.patch('/tasks/:id', async (request, response) => {
  const id = request.params.id;
  const update = request.body;

  try {
    const result = await Task.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return response.status(404).send();
    } else {
      response.send(result);
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete('/tasks/:id', async (request, response) => {
  const id = request.params.id;

  try {
    const result = await Task.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).send();
    }

    response.status(200).send(result);
  } catch (error) {
    response.status(400).send(error);
  }
});
