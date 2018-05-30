const LocalStrategy = require("passport-local").Strategy;
const User = require("../models").User;
var bcrypt = require("bcrypt");

generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// expose this function to our app using module.exports
module.exports = function(passport) {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {
          // find a user whose email is the same as the forms email
          // we are checking to see if the user trying to login already exists
          // User.findOne({ 'email' :  email }, function(err, user) {
          User.findOne({ where: { email: email } }).then(existingUser => {
            // check to see if theres already a user with that email
            if (existingUser) {
              console.log("user exists");
              return done(null, existingUser);
            } else {
              // if there is no user with that email
              // create the user

              var newUser = new User();

              // set the user's local credentials
              newUser.email = email;
              newUser.name = req.body.name;
              newUser.password = generateHash(password);

              // save the user
              newUser.save().then(newUserser => {
                return done(null, newUser);
              });
            }
          });
        });
      }
    )
  );
};
