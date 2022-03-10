require('dotenv').config();
const db = require('../db/db.js')

const userController = {};

userController.addUser = async (req, res, next) => {
//check for user in the database
//if the user is not in the database, add the user to the database
console.log('in the adduser controller')
const sqlQuery = 'SELECT * from users';
db.query(sqlQuery)
    .then(payload => {
      res.locals = payload.rows;
      // console.log('res.locals is now:', res.locals)
      next();
    }).catch(err=>{
      return next({
        log:'Error!',
        message:'Cant get players'
      });
    });
};


module.exports = userController;