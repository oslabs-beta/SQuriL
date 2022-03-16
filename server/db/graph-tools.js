// import db 
// many: 1 ==>  the array field can be omitted.
// queries: 1 user 


const typeDefs = `
  // describe tables 
  type Users {
    _id: ID!
    username: String!
  }

  type Queries {
    _id: ID!
    value: String
    user_id: Users! //1 required user / query ID
  }

  input Queries_by_Users {
    user_id: ID!
  }


  // this schema allows the following query:
  type Query {
    // info on one user
    perUsers(id: ID!): Users  
    // info on all users 
    allUsers: [Users]

    // possible queries for Query table
    perQueries(id: ID!): Queries
    allQueries: [Queries]
    Queries_by_Users(where: Queries_by_Users ): [Queries] 
  }

  # we need to tell the server which types represent the root query
  # and root mutation types. We call them RootQuery and RootMutation by convention.
  schema {
    query: Query
  }
`
const resolvers = {
  // define the root query 
  Query: {
    // show the rest of the info on the user_id = $
    Users: async (parent, args, context, info) => {
      const data = await db.query(`SELECT * FROM users WHERE _id='${args}'`)
      const result = data.rows.json()
      return result;
    },
    // show all users that exist in the tb
    allUsers: async (parent, args, context, info) => {
      const data = await db.query('SELECT * FROM users')
      const result = data.rows.json()
      return result;
    },
    // show query based on this id
    Queries: async (parent, args, context, info) => {
      const data = await db.query(`SELECT * FROM queries WHERE _id='${args}'`)
      const result = data.rows.json()
      return result;
    },
    // show all existing queries
    allQueries: async (parent, args, context, info) => {
      const data = await db.query('SELECT * FROM queries')
      const result = data.rows.json()
      return result;
    },
    // show me all queries based on user_id (filter by users aka args act like filters to show only selected)
    Queries_by_Users: async (parent, args, context, info) => {
      const data = await db.query('SELECT _id, value FROM queries q LEFT OUTER JOIN users u on q.user_id=u._id WHERE u.username=$1')
      const result = data.rows.json 
    }      
  }
},


