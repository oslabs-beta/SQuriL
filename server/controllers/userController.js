require('dotenv').config();
const db = require('../db/db.js')

const userController = {};

userController.checkUser = async (req, res, next) => {
  const { username } = res.locals // Used for build
  // const username = 'michaeltraps' // Used for testing
  const sqlQuery = `SELECT * FROM users WHERE username='${username}'`
  if (username == undefined) {
    console.log('Username is undefined');
    return next();
  }
  // Check for the user in the database
  try {
    const query = await db.query(sqlQuery);
    // If the query returns with an empty array, that means the user does not exist in the database
      // Set res.locals.exist to true/false for if a user is in the database or not
    query.rows.length === 0 ? res.locals.exists = false : res.locals.exists = true;
    console.log(res.locals.exists)
    return next();
  } catch (err) {
    next({
      log: `userController.checkUser: ERROR: ${err}`,
      message: { err: 'Error occurred in userController.checkUser. Check server log for more details.'},
    })
  }
}

userController.addUser = async (req, res, next) => {
  // Check if res.locals.exists is true and moves to next middleware 
  if (res.locals.exists) {
    console.log('The user already exists in the database')
    return next()
  }
  const { username } = res.locals
  const sqlQuery = `INSERT INTO users (username) VALUES ('${username}')`; // Query for after user table is changed to just _id and username



  // Add the user to the database
  try {
    const query = await db.query(sqlQuery);
    console.log(`User ${username} was added to the user table`)
    return next();
  } catch (err) {
    next({
      log: `userController.addUser: ERROR: ${err}`,
      message: { err: 'Error occurred in userController.addUser. Check server log for more details.'},
    })
  }
};

// Retreive all saved queries as User logs 
userController.allQueries = async (req, res, next) => {
  // If verifySession did not find a cookie then res.locals.username does not exist and nothing needs to be done here, move to next middleware
  if (!res.locals.username) {
    console.log('There is no user currently logged in')
    return next()
  }
  console.log('In the allQueries middleware, res.locals.username is set to ' + res.locals.username)

  // Else use username stored in res.locals.username to make the query
  const { username } = res.locals // Used for build
  // const username = 'michaeltraps' // Used for testing
  const sqlQuery = 'SELECT q._id, q.value FROM queries q LEFT OUTER JOIN users u on q.user_id=u._id WHERE u.username=$1'

  try {
    const query = await db.query(sqlQuery, [username]);
    console.log(query.rows)
    res.locals.allQueries = query.rows; //array of objects
    next();
  } catch (err) {
    next({
      log: `userController.allQueries: ERROR: ${err}`,
      message: { err: 'Error occurred in userController.allQueries. Check server log for more details.'},
    })
  }
}

module.exports = userController;