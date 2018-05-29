//Setting up database connection
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "mysql://root:hYhzHh8LrXTcZXcWbbppAgrg@127.0.0.1:3306/fregues-dev"
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

//Setting up Express
const express = require("express");
const app = express();

//Setting up Passport
const passport = require("passport");
const session = require("express-session");

require("./services/passport")(passport); // pass passport for configuration

// required for passport
app.use(session({ secret: "ilovescotchscotchyscotchscotch" })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// load our routes and pass in our app and fully configured passport
require("./app/routes.js")(app, passport);

app.listen(5000);
