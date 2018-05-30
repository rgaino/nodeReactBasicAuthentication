const logger = require("simple-node-logger").createSimpleLogger();
logger.setLevel("debug");

//Setting up database connection
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "mysql://root:hYhzHh8LrXTcZXcWbbppAgrg@127.0.0.1:3306/fregues-dev"
);

sequelize
  .authenticate()
  .then(() => {
    logger.info("Connection has been established successfully.");
    // const User = require("./models").User;
    // User.findAll().then(users => {
    //   users.map(user => {
    //     console.log(user.email, user.name, user.password);
    //   });
    // });
  })
  .catch(err => {
    logger.error("Unable to connect to the database:", err);
  });

//Setting up Express
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

//Setting up Passport
const passport = require("passport");
const session = require("express-session");

require("./services/passport")(passport); // pass passport for configuration

// required for passport
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({ secret: "ilovescotchscotchyscotchscotch" })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// load our routes and pass in our app and fully configured passport
require("./app/routes.js")(app, passport);

app.listen(5000);
