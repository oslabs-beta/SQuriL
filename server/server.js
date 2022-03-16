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


const queryRouter = require(path.join(__dirname, '/routers/queryRouter.js'));
const apiRouter = require(path.join(__dirname, '/routers/apiRouter.js'));
const userRouter = require(path.join(__dirname, '/routers/userRouter.js'));
// const outputRouter = require(path.join(__dirname, '/routers/outputRouter.js'));
const oauthRouter = require(path.join(__dirname, '/routers/oauthRouter.js'));

/* ********* graphQL + express ********* */
app.use('/graphql', graphqlHTTP({
  // setting the data types
  schema: buildSchema(`
    type Query {
      _id: ID!
      value: String!
      user_id: Int!
    }

    input QueryInput {
      value: String!
      user_id: Int!
    }
    
    type RootQuery {
      queries: [Query] 
    }

    type RootMutation {
       createQuery(queryInput: QueryInput): Query
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `), 
  // seeting up the resolvers
  rootValue: {
    // get data
    queries: () => {
      return db.query('SELECT * FROM queries')
      .then(data => {
        console.log(data.rows)
        return data.rows
      })
    },
    // mutate data
    createQuery: (args) => {
      const query = {
        value: args.queryInput.value,
        user_id: args.queryInput.user_id
      }
    }
  },
  graphiql: true
  })
);

/* ********* graphQL + express ********* */

// Route requests to queryRouter
app.use('/query', queryRouter);

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

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));