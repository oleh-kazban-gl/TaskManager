const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager-api';

mongoose.connect(`${uri}/${databaseName}`);
