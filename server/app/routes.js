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
    console.log(req.body);
    // console.log("redirecting to /");
    // res.redirect("/");
    res.send(req.body);
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
