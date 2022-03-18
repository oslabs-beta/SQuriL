/* ********* graphQL + Apollo ********* */
// we are using Appolo Server to configure GQL API
// if you want to use alternatives with our template please use graphql-tools and import makeExecutableSchema dependency to combine typeDefs and resolvers
require("dotenv").config();
const db = require('./db/db')
const { ApolloServer } = require('apollo-server');
// get tag template string --> apollo's dependency
const gql = require('graphql-tag');

const typeDefs = gql`
  # describe tables field
  # ! means its unique
  type Users {
    _id: ID
    username: String
  }
  type Queries {
    _id: ID!
    value: String
    user_id: [Users] #make sure its in [] 
  }

  # indicate by what filters selections will be availabe for the user input
  input UsersFind {
    _id: Int! # user_id?
  }
  # this schema allows the following query:
  # ! means its required
  type Query {
    # show based on the ID
    users_id(_id: ID!): [Users]
    queries_id(_id:ID!): [Users]
    # show all 
    users: [Users]
    Allqueries: [Queries]
    # show me all queries(many) by this user(one)
    # filter 'many' --> by foreign keys 
    # filter_Queries_by_Users(find: UsersFind): [Queries]
    queries: [Queries]
  }
  extend type Query {
    queries(find: UsersFind!): [Queries]
  }
`
const resolvers = {
  // resolver for Query type
  Query: {
    users: async () => {
      // console.log(args)
      try {
        const data = await db.query('SELECT * FROM users')
        return data.rows;
      } catch (error) {
        throw new Error(error);
      }
    },
    Allqueries: async (parent, args, context, info) => {
      try {
        const data = await db.query(`SELECT * FROM queries`)
        return data.rows;
      } catch (error) {
        throw new Error(error);
      }
    },
    users_id: async (parent, args) => {
      try {
        const data = await db.query(`SELECT * FROM users WHERE _id='${args._id}'`)
        return data.rows;
      } catch (error) {
        throw new Error(error);
      }
    },
    queries_id: async (parent, args) => {
      try {
        const data = await db.query(`SELECT * FROM queries WHERE _id='${args._id}'`)
        return data.rows;
      } catch (error) {
        throw new Error(error);
      }
    },
    // filter by foreign keys aka give queries based on used_id
    queries: async (parent, args, context, info) => {
      const { find } = args
      console.log(args.find._id)
      try {
        const data = await db.query(`SELECT * FROM queries WHERE user_id='${find._id}'`)
        console.log(data.rows)
        return data.rows;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  // resolver for ONLY subfields of the table types
  // define the specific subquery of the root Queries 
  // parent is the result of the queries: [Queries]
  // this will not show in the queries -> only for the purposes of def spec. fields on types
  // useful for avoiding joining the tables if they are connected by primary and foreign keys
  Queries: {
    user_id: async (parent, args) => {
      try {
        const data = await db.query(`SELECT * FROM users WHERE _id='${parent.user_id}'`)
        return data.rows;
      } catch (error) {
        throw new Error(error);
      }
    },
  }  
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const PORT = 5000;
server.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));