const express = require('express');

require('./db/mongoose');

const userRouter = require('./routers/user.router');
const taskRouter = require('./routers/task.router');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`The server is up and running on ${port} port`);
});
