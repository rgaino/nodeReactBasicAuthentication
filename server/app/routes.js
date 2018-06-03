const passport = require("passport");
const encription = require("../services/encryption");
const middleware = require("../services/middleware");
const User = require("../models").User;
const logger = require("simple-node-logger").createSimpleLogger();
logger.setLevel("debug");

module.exports = function(app, passport) {
  app.get("/api/current_user", (req, res) => {
    //TODO: should not return password or any other sensitive information
    res.send(req.user);
  });

  app.get("/api/logout", function(req, res) {
    req.logout();
    logger.debug("Logged out.");
    res.send({ success_message: "Sessão encerrada." });
  });

  //User REST (so far only creates)
  app.post("/api/user", function(req, res) {
    //TODO: after creating a user, log them in

    logger.debug(req.body);

    //all parameters must be present
    if (
      !req.body.userName ||
      !req.body.userEmail ||
      !req.body.userPassword ||
      !req.body.userPasswordConfirmation
    ) {
      logger.info("Post to /api/signup failed due to some fields not being present.");
      res.status(422).send("Todos os campos são obrigatórios.");
      return;
    }

    //password and password confirmation must be equal
    if (req.body.userPassword !== req.body.userPasswordConfirmation) {
      logger.info(
        "Post to /api/signup failed due password and password confirmation not matching."
      );
      res.status(422).send({
        error_message: "As senhas precisam ser iguais."
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
        res.send({ success_message: "Usuário criado com sucesso." });
      } else {
        logger.info("User with email already exists and was not created.");
        res.status(422).send({ error_message: "Usuário com o email já existe." });
      }
    });
  });

  app.post("/api/login", function(req, res, next) {
    logger.debug(req.body);
    passport.authenticate("local", function(err, user, info) {
      logger.debug("on passport.authenticate with ", err, user, info);
      if (err) {
        logger.debug("Error authenticating:", err);
        return next(err);
      }
      if (!user) {
        logger.debug("User not present, returning error message");
        return res.status(422).send({ error_message: "Usuário ou senha invalidos" });
      }
      req.logIn(user, function(err) {
        if (err) {
          logger.debug("Error logging in:", err);
          return next(err);
        }
        logger.debug("Login successful, returning success message");
        logger.debug(user);
        return res.send({ success_message: "Olá " + user.name });
      });
    })(req, res, next);
  });
};
