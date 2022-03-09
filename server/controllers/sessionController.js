require('dotenv').config();
const jwt = require('jsonwebtoken');


const sessionController = {};

// Create a JWT cookie using the user from GitHub Oauth
sessionController.createSession = async (req, res, next) => {
  try {
    console.log('createsession')
    console.log(res.locals.profile)
    const { login } = res.locals.profile
    const token = jwt.sign({ username: login }, process.env.JWT_SECRET);
    res.cookie('user', token);
    return next();
  } catch (err) {
    return next({
      log: `Error in sessionController.createSession Err: ${err.message}`,
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
}

// Decodes the cookie and assigns the user to res.locals.username
sessionController.verifySession = async (req, res, next) => {
  try {
  if (req.cookies.user) {
    const decoded = jwt.verify(req.cookies.user, process.env.JWT_SECRET);
    if (decoded.username !== undefined) {
      res.locals.username = decoded.username;
      return next();
    } 
  } else {
    // Not sure what to add here, as it stands this just moves to the next part of the chain if the user is not verified or if the cookie does not exist
    return next();
  }
  } catch (err) {
    return next({
      log: `Error in sessionController.verifySession Err: ${err.message}`,
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
}


module.exports = sessionController;