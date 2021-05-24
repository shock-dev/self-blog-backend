import passport from '../core/passport';

const checkJWT = () => {
  return passport.authenticate('jwt', { session: false });
};

export default checkJWT;
