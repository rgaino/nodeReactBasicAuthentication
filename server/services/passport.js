const LocalStrategy = require("passport-local").Strategy;
const User = require("../models").User;
var bcrypt = require("bcrypt");

generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

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
        process.nextTick(function() {
          User.findOne({ where: { email: email } }).then(existingUser => {
            if (existingUser) {
              console.log("user exists");
              return done(null, existingUser);
            } else {
              var newUser = new User();
              newUser.email = email;
              newUser.name = req.body.name;
              newUser.password = generateHash(password);

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
