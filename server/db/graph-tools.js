// import db 
// many: 1 ==>  the array field can be omitted.
// queries: 1 user 


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
    user_id: Users #1 required user / query ID ****
  }

  # define inputs to be used in Query resolvers functions
  input Queries_by_Users {
    user_id: ID!
  }
  # this schema allows the following query:
  # ! means its required
  type Query {
    # info on one user
    Users(_id: ID!): [Users]  #so even though we get one user, we put [Users] for graphQl map out the results per parameters in the output
    # info on all users 
    allUsers: [Users]

    # possible queries for Query table
    Queries(_id: ID!): [Queries]
    allQueries: [Queries]
    Queries_by_Users(find: Queries_by_Users ): [Queries] 
  }
`
const resolvers = {
  // define the root query 
  Query: {
    // show the rest of the info on the user_id = $
    Users: async (parent, args, context, info) => {
      try {
        const data = await db.query(`SELECT * FROM users WHERE _id='${args._id}'`)
        return data.rows;
      } catch (error) {
        throw new Error(error);
      }
    },
    // show all users that exist in the tb
    allUsers: async (parent, args, context, info) => {
      try {
        const data = await db.query('SELECT * FROM users')
        return data.rows; 
      } catch (error) {
        throw new Error(error)
      }
    },
    // show query based on this id
    Queries: async (parent, args, context, info) => {
      try {
        const data = await db.query(`SELECT * FROM queries WHERE _id='${args._id}'`)
        return data.rows;
      } catch (error) {
        throw new Error(error);
      }
    },
    // show all existing queries
    allQueries: async (parent, args, context, info) => {
      console.log(args)
      try {
        const data = await db.query('SELECT * FROM queries')
        console.log(data.rows)
        return data.rows;
      } catch (error) {
        throw new Error(error);
      }
    },
    // many to one
    // show me all queries based on user_id (filter by users aka args act like filters to show only selected)
    Queries_by_Users: async (parent, args, context, info) => {
      const data = await db.query('SELECT _id, value FROM queries q LEFT OUTER JOIN users u on q.user_id=u._id WHERE u.username=$1')
      const result = data.rows.json 
    },      
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})


