const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// requiring in dotenv to use environment variable process.env.POSTGRES_URI from .env file
require('dotenv').config();

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const schemaRouter = require(path.join(__dirname, '/routers/schemaRouter.js'));
const apiRouter = require(path.join(__dirname, '/routers/apiRouter.js'));
const userRouter = require(path.join(__dirname, '/routers/userRouter.js'));
// const outputRouter = require(path.join(__dirname, '/routers/outputRouter.js'));
const oauthRouter = require(path.join(__dirname, '/routers/oauthRouter.js'));

// telling the host site that if we are in prod -> serve this build file
app.use('/', express.static('./build'));

// Route requests to schemaRouter
app.use('/schemas', schemaRouter);

// Route requests to apiRouter --> convert the db to gql schema
app.use('/api', apiRouter);

// Route requests to outputRouter
app.use('/user', userRouter);

// Route requests to outputRouter --> convert the gql schema to TS schema
// app.use('/output', outputRouter);

// Route requests to oauthRouter
app.use('/oauth', oauthRouter);

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

// for Heroku to choose first available port || 3000 is used of running on the local server
// const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT || 3000, () => console.log(`Listening on PORT: ${process.env.PORT}`));
