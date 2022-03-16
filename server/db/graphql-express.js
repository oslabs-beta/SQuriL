/* ********* graphQL + express ********* */
const db = require('./db/db')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql');
const { createQuery } = require('./controllers/queryController');
const { title } = require('process');

/* ********* graphQL + express ********* */
app.use('/graphql', graphqlHTTP({
  // setting the data types
  schema: buildSchema(`
    type Query {
      _id: ID!
      value: String!
      user_id: Int!
    }

    type RootQuery {
      queries: [Query] 
    }

    schema {
      query: RootQuery
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
    // createQuery: (args) => {
    //   const query = {
    //     value: args.queryInput.value,
    //     user_id: args.queryInput.user_id
    //   }
    // }
  },
  graphiql: true
  })
);


// query { //query or mutations
//   queries { //getting the data resolver
//     value    //be specific of things you want to get from [Query] declared type
//     user_id
//   }
// }

// mutations {
//   createQuery(queryInput: {value: "schema1", user_id: "2"}) // 
//     title // be specific what you want to return OF the newly created query (: Query)
//     description 
// } // ==>
// "createQuery": {
//   "value": "schema1",
//   "user_id": "2"
// }

/* ********* END ********* */
