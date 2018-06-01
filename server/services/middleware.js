const logger = require("simple-node-logger").createSimpleLogger();
logger.setLevel("debug");
const util = require("util");

const authenticationMiddleware = function() {
  return function(req, res, next) {
    if (req.isAuthenticated()) {
      logger.debug("User is authenticated");
      return next();
    }
    logger.debug("User is NOT authenticated");
    res.redirect("/");
  };
};

const loggerMiddleware = function(req, res, next) {
  const logString = req.method + " on " + req.originalUrl;
  logger.debug(logString);
  next();
};

module.exports = {
  authenticationMiddleware,
  loggerMiddleware
};
