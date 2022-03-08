const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { Pool } = require('pg');
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const queryRouter = require(path.join(__dirname, '/routers/queryRouter.js'));
const apiRouter = require(path.join(__dirname, '/routers/apiRouter.js'));
const userRouter = require(path.join(__dirname, '/routers/userRouter.js'));


// // Route requests to queryRouter
// app.use('query', queryRouter);

// // Route requests to apiRouter
// app.use('api', apiRouter);

// // Route requests to outputRouter
// app.use('user', userRouter);

// Unknown Route Handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));