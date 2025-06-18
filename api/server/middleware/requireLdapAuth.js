const passport = require('passport');
const { logger } = require('~/config');

const requireLdapAuth = (req, res, next) => {
  passport.authenticate('ldapauth', (err, user, info) => {
    if (err) {
      logger.error('(requireLdapAuth) Error at passport.authenticate', { error: err });
      return next(err);
    }
    if (!user) {
      logger.warn('(requireLdapAuth) Error: No user');
      return res.status(404).send(info);
    }
    req.user = user;
    next();
  })(req, res, next);
};
module.exports = requireLdapAuth;
