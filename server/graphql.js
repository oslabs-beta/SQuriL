/* ********* graphQL + Apollo ********* */
// we are using Appolo Server to configure GQL API
// if you want to use alternatives with our template please use graphql-tools and import makeExecutableSchema dependency to combine typeDefs and resolvers
const db = require('./db/db')
const { ApolloServer } = require('apollo-server');
// get tag template string --> apollo's dependency
const gql = require('graphql-tag');

const typeDefs = gql`
  # describe tables field
  type Users {
    _id: ID!
    username: String!
  }

  type Query {
    # info on all users 
    Users: [Users]
  }
`
const resolvers = {
  // define the root query 
  Query: {
    // show the rest of the info on the user_id = $
    Users: async (parent, args, context, info) => {
      try {
        const data = await db.query(`SELECT * FROM users WHERE _id='${args}'`)
        const result = data.rows.json()
        console.log(result)
        return result;
      } catch (error) {
        console.log(error)
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