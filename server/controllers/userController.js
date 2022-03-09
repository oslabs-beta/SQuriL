// Moved to the server.js
// require('dotenv').config();
const db = require('../db/db')

const userController = {};

userController.allQueries = async (req, res, next) => {
  //coming from OAuth response => needs testing
  const { username } = res.locals
  const sqlQuery = 'SELECT q._id, q.value FROM queries q LEFT OUTER JOIN users u on q.user_id=u._id WHERE u.username=$1'
  // const { userid } = req.params;
  // const sqlQuery = 'SELECT _id, value FROM queries WHERE user_id=$1';
  try {
    const query = await db.query(sqlQuery, [username]);
    console.log(query.rows)
    res.locals.allQueries = query.rows; //array of objects
    next();
  } catch (err) {
    next({
      log: `userController.allQueries: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      message: { err: 'Error occurred in userController.allQueries. Check server log for more details.'},
    })
  }
}


module.exports = userController;