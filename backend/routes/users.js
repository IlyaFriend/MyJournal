var express = require("express");
var bodyParser = require("body-parser");
var User = require("../models/user");
var passport = require("passport");
var authenticate = require("../authenticate");
var cors = require("./cors");

var router = express.Router();
router.use(bodyParser.json());

router
  .route("/")
  .get(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    function (req, res, next) {
      User.find({})
        .then((users) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(users);
        })
        .catch((err) => {
          next(err);
        });
    }
  );

router.post("/signup", cors.corsWithOptions, (req, res, next) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
        console.log(err);
        return;
      }
      if (req.body.firstname) user.firstname = req.body.firstname;
      if (req.body.lastname) user.lastname = req.body.lastname;
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({ err: err });
          return;
        }
        passport.authenticate("local")(req, res, () => {
          var token = authenticate.getToken({ _id: user._id });
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({
            success: true,
            token: token,
            id: user._id,
            username: req.user.username,
            admin: req.user.admin,
            status: "Registration Successful!",
          });
        });
      });
    }
  );
});

router.post(
  "/login",
  cors.corsWithOptions,
  passport.authenticate("local"),
  (req, res) => {
    try {
      var token = authenticate.getToken({ _id: req.user._id });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        token: token,
        id: req.user._id,
        username: req.user.username,
        admin: req.user.admin,
        status: "You are successfully logged in!",
      });      
    }
    catch (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({ err: err });
    }
  }
);

router
  .route("/:username")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    User.findByUsername(req.params.username)
      .then(
        (user) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(user);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => {
        next(err);
      });
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    if (req.body.newPassword) {
      console.log(req.body.password);
      User.findByIdAndUpdate(
        req.params.username,
        { password: req.body.password },
        { new: true }
      )
        .then(
          (user) => {
            console.log("\n", "" + req.body.oldPassword, req.body.newPassword);
            user.changePassword(
              "" + req.body.oldPassword,
              req.body.newPassword,
              function (err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Password changed successfully!");
                }
              }
            );
            console.log(1.1, user);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(user);
          },
          (err) => {
            console.log(1.2);
            console.log(err);
            next(err);
          }
        )
        .catch((err) => {
          console.log(1.3);
          console.log(err);
          next(err);
        });
    } else {
      console.log(2);
      User.findByIdAndUpdate(
        req.params.username,
        { $set: req.body },
        { new: true }
      )
        .then(
          (user) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(user);
          },
          (err) => {
            next(err);
          }
        )
        .catch((err) => {
          next(err);
        });
    }
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    User.findByIdAndRemove(req.params.username)
      .then(
        (_) => {
          res.statusCode = 200;
          res.end("Succesfully deleted user!");
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => {
        next(err);
      });
  });

router
  .route("/subscribe/:id")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    User.findById(req.params.id)
      .then(
        (user) => {
          if (user) {
            let oldFollowing = [...user.following];
            if (oldFollowing.length && oldFollowing.findIndex(id => req.body.id === id) > -1) {
              console.log('user already following')
              res.send('user already following')
              return
            }
            user.following = user.following.concat([req.body.id]);
            user.save().then(
              (user) => {
                User.findById(user._id)
                  .then((_) => {
                    let newFollowing = user.following.find(
                      (following) =>
                        !oldFollowing.find(
                          (oldFollowing) => oldFollowing === following
                        )
                    );
                    res.statusCode = 201;
                    res.json(newFollowing);
                  });
              },
              (err) => {
                console.log("error following", err);
                next(err);
              }
            );
            return;
          }
          err = new Error("User" + req.params.id + "not found");
          err.status = 404;
          return next(err);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => {
        next(err);
      });
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    User.findById(req.params.id)
      .then(
        (user) => {
          if (user) {
            let oldFollowing = [...user.following];
            if (oldFollowing.length && oldFollowing.findIndex(id => req.body.id === id) < 0) {

              console.log('\n')
              console.log(user.following)
              console.log(req.body.id)
              console.log('\n')

              console.log('user is not following')
              res.statusCode = 406;
              res.send('user is not following')
              return
            }
            console.log('\n')
            console.log(user.following)
            user.following = user.following.filter(id => id !== req.body.id);
            console.log(user.following)
            console.log(req.body.id)
            console.log('\n')
            user.save().then(
              (user) => {
                User.findById(user._id)
                  .then((_) => {
                    let newFollowing = user.following.find(
                      (following) =>
                        !oldFollowing.find(
                          (oldFollowing) => oldFollowing === following
                        )
                    );
                    res.statusCode = 200;
                    res.json(newFollowing);
                  });
              },
              (err) => {
                console.log("error following", err);
                next(err);
              }
            );
            return;
          }
          err = new Error("User" + req.params.id + "not found");
          err.status = 404;
          return next(err);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => {
        next(err);
      });
  });

module.exports = router;
