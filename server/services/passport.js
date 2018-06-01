const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models").User;
const encryption = require("./encryption");
const logger = require("simple-node-logger").createSimpleLogger();
logger.setLevel("debug");

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    //TODO: error handling
    User.findById(id).then(function(user) {
      done(null, user);
    });
  });

  passport.use(
    "local",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "userEmail",
        passwordField: "userPassword",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {
        logger.debug("On local-login strategy function. Will look for User now.", email, password);

        User.findOne({ where: { email: email } }).then(existingUser => {
          if (existingUser) {
            logger.debug("Email exists, will check pwd: ", password, existingUser.password);
            encryption
              .comparePasswordWithHash(password, existingUser.password)
              .then(passwordMatches => {
                if (passwordMatches) {
                  logger.debug("Password matches.");
                  return done(null, existingUser);
                } else {
                  logger.debug("Password does not match.");
                  return done(null, false);
                }
                return done(null, existingUser);
              });
          } else {
            logger.debug("User with email does not exists, returning with error.");
            return done("Email ou senha inválidos.");
          }
        });
      }
    )
  );
};
