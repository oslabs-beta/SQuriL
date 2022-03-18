const fetch = require('node-fetch');
require('dotenv').config();

const authController = {};

authController.getToken = async (req, res, next) => {
  const requestToken = req.query.code;
  const url = `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${requestToken}&scope=user,repo`;

  try {
    const tokenJSON = await fetch(url, {
      method: 'POST',
      headers: {'Accept': 'application/json'}
    });
    const token = await tokenJSON.json();
    res.locals.access_token = token.access_token;
    console.log(token)
    return next();
  } catch(err) {
    return next({
      log: `Error in authController.getToken Err: ${err.message}`,
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};

authController.getProfile = async (req, res, next) => {
  const url = 'https://api.github.com/user';
  try {
    const profileInfoJSON = await fetch(url,{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'token ' + res.locals.access_token,
      },
    });
    const profileInfo = await profileInfoJSON.json();
    res.locals.profile = profileInfo;
    next();
  } catch(err) {
    return next({
      log: `Error in authController.getProfile Err: ${err.message}`,
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};

module.exports = authController;