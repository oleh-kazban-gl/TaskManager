const express = require('express');

const Task = require('../models/task');
const isUpdateValid = require('../utils/update.validator');

const router = new express.Router();

router.post('/tasks', async (request, response) => {
  try {
    const result = await new Task(request.body).save();
    response.status(201).send(result);
  } catch (error) {
    response.status(400).send(error);
  }
});

router.get('/tasks', async (request, response) => {
  try {
    const result = await Task.find({});
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});
router.get('/tasks/:id', async (request, response) => {
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

router.patch('/tasks/:id', async (request, response) => {
  const id = request.params.id;
  const update = request.body;
  const allowedUpdates = ['description', 'completed'];
  const updates = Object.keys(update);

  if (!isUpdateValid(updates, allowedUpdates)) {
    return response.status(400).send({ error: 'Invalid update options!' });
  }

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
    response.status(400).send(error);
  }
});

router.delete('/tasks/:id', async (request, response) => {
  const id = request.params.id;

  try {
    const result = await Task.findByIdAndDelete(id);
    const tasks = await Task.find({});

    if (!result) {
      return response.status(404).send();
    }

    response.status(200).send(tasks);
  } catch (error) {
    response.status(400).send(error);
  }
});

module.exports = router;
