const isUpdateValid = (updates, allowedUpdates) =>
  updates.every((u) => allowedUpdates.includes(u));

module.exports = isUpdateValid;
