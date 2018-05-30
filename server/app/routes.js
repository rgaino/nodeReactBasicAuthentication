const logger = require("simple-node-logger").createSimpleLogger();
logger.setLevel("debug");
const encription = require("../services/encryption");

const User = require("../models").User;

module.exports = function(app, passport) {
  // app.get('/api/login', function(req, res) {
  //     res.render('login.ejs', { message: req.flash('loginMessage') });
  // });
  //
  // app.get('/signup', function(req, res) {
  //     res.render('signup.ejs', { message: req.flash('signupMessage') });
  // });

  // app.get("/profile", isLoggedIn, function(req, res) {
  // app.get("/", function(req, res) {
  //   res.send({ path: "/" });
  // });

  app.get("/api/profile", isLoggedIn, function(req, res) {
    // res.send(req.user);
    res.send({ path: "/profile" });
  });

  app.get("/api/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.post("/api/signup", function(req, res) {
    logger.debug(req.body);

    //all parameters must be present
    if (
      !req.body.userName ||
      !req.body.userEmail ||
      !req.body.userPassword ||
      !req.body.userPasswordConfirmation
    ) {
      logger.info(
        "Post to /api/signup failed due to some fields not being present."
      );
      res.status(422).send("Todos os campos são obrigatórios.");
      return;
    }

    //password and password confirmation must be equal
    if (req.body.userPassword !== req.body.userPasswordConfirmation) {
      logger.info(
        "Post to /api/signup failed due password and password confirmation not matching."
      );
      res.status(422).send({
        error_message: "A confirmação da senha está diferente da senha."
      });
      return;
    }

    logger.info("Will findOrCreate new user.");
    User.findOrCreate({
      where: { email: req.body.userEmail },
      defaults: {
        email: req.body.userEmail,
        name: req.body.userName,
        password: encription.generateHash(req.body.userPassword)
      }
    }).spread((user, created) => {
      if (created) {
        logger.info("User did not exist and was created.");
        res.send({ user_id: user.id });
      } else {
        logger.info("User with email already exists and was not created.");
        res
          .status(422)
          .send({ error_message: "Usuário com o email já existe." });
      }
    });

    // res.send(req.body);
  });

  // app.post(
  //   "/api/signup",
  //   passport.authenticate("local-signup", {
  //     successRedirect: "/profile", // redirect to the secure profile section
  //     failureRedirect: "/signup" // redirect back to the signup page if there is an error
  //   })
  //   (req, res) => {
  //     console.log(req.body);
  //     res.send(req.body);
  //   }
  // );
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();

  // if they aren't redirect them to the home page
  res.redirect("/");
}
