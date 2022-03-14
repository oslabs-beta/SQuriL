// // POOL - allows multiple simultaneous database queries
// const { Pool } = require('pg');

// //or native libpq bindings
// const pg = require('pg')

// var conString = "postgres://tkzilovn:m5yA9sMSYjH85UM3tfI6dG0JfsarQSAV@jelani.db.elephantsql.com/tkzilovn" //Can be found in the Details page
// var client = new pg.Client({
//   user: "tkzilovn",
//   host: "jelani.db.elephantsql.com",
//   password: "m5yA9sMSYjH85UM3tfI6dG0JfsarQSAV",
//   database: "tkzilovn",
// });
// client.connect();

// // create a new pool here using the connection string above
// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URI,
// });
// // We export an object that contains a property called query,
// // which is a function that returns the invocation of pool.query() after logging the query
// // This will be required in the controllers to be the access point to the database

// module.exports = {
//   query: (text, params, callback) => {
//     console.log('executed query', text);
//     return pool.query(text, params, callback)
//   }
// }

// Using the new client connection method, clean up the rest when we know FOR SURE that everything is working okay
const pg = require('pg');

const client = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});
client.connect();

module.exports = client;

