const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const logger = require("simple-node-logger").createSimpleLogger();
logger.setLevel("debug");
const loggerMiddleware = require("./services/middleware").loggerMiddleware;

//Setting up database connection
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "mysql://root:hYhzHh8LrXTcZXcWbbppAgrg@127.0.0.1:3306/fregues-dev",
  {
    logging: false
  }
);

sequelize
  .authenticate()
  .then(() => {
    logger.info("Connection has been established successfully.");
  })
  .catch(err => {
    logger.error("Unable to connect to the database:", err);
  });

//Setting up Express and Passport
require("./services/passport")(passport);

// required for passport
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({ secret: "auf39b9un19u3nc9u23bf9u2bfu92bfaAQAnq" })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(loggerMiddleware);

// load our routes and pass in our app and fully configured passport
require("./app/routes.js")(app, passport);

app.listen(5000);
