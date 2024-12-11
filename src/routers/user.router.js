const express = require('express');

const User = require('../models/user');
const isUpdateValid = require('../utils/update.validator');

const router = new express.Router();

router.post('/users', async (request, response) => {
  try {
    const result = await new User(request.body).save();
    response.status(201).send(result);
  } catch (error) {
    response.status(400).send(error);
  }
});

router.get('/users', async (request, response) => {
  try {
    const result = await User.find({});
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});
router.get('/users/:id', async (request, response) => {
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

router.patch('/users/:id', async (request, response) => {
  const id = request.params.id;
  const update = request.body;
  const allowedUpdates = ['firstName', 'lastName', 'email', 'password'];
  const updates = Object.keys(update);

  if (!isUpdateValid(updates, allowedUpdates)) {
    return response.status(400).send({ error: 'Invalid update options!' });
  }

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
    response.status(400).send(error);
  }
});

router.delete('/users/:id', async (request, response) => {
  const id = request.params.id;

  try {
    const result = await User.findByIdAndDelete(id);
    const users = await User.find({});

    if (!result) {
      return response.status(404).send();
    }

    response.status(200).send(users);
  } catch (error) {
    response.status(400).send(error);
  }
});

module.exports = router;
