const passport = require('../core/passport');

const checkJWT = () => {
  return passport.authenticate('jwt', { session: false });
};

module.exports = checkJWT;
