var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate')
var cors = require('./cors')

var router = express.Router();
router.use(bodyParser.json());

router.route('/')
      .get(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, function(req, res, next) {
        User.find({})
            .then(users => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(users);
              })
            .catch(err => { next(err); });
      });

router.post('/signup', cors.corsWithOptions, (req, res, next) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: err});
            console.log(err)
            // console.log('\n', "____________________")
            // console.log(req.body)
            // console.log("____________________", '\n')
            return;
        }
        if (req.body.firstname) user.firstname = req.body.firstname;
        if (req.body.lastname) user.lastname = req.body.lastname;
        user.save((err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({err: err});
                return;
            }
            passport.authenticate('local')(req, res, () => {
                var token = authenticate.getToken({_id: user._id});
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: true, token: token, id: user._id, username: req.user.username, admin: req.user.admin, status: 'Registration Successful!'});
            });
        })
    });
});

router.post('/login', cors.corsWithOptions, passport.authenticate('local'), (req, res) => {
    var token = authenticate.getToken({_id: req.user._id})
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, id: req.user._id, username: req.user.username, admin: req.user.admin, status: 'You are successfully logged in!'});
});

router.route('/:username')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200)} )
    .get(cors.cors, (req, res, next) => {
        User.findByUsername(req.params.username)
            .then(user => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(user);
                  },
                  err => { next(err); })
            .catch(err => { next(err); })
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        User.findByIdAndUpdate(req.params.username, { $set: req.body }, { new: true })    
            .then(user => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(user);
                  },
                  err => { next(err); })
            .catch(err => { next(err); });
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        User.findByIdAndRemove(req.params.username)
            .then(_ => {
                        res.statusCode = 200;
                        res.end('Succesfully deleted user!')
                  }, 
                  err => { next(err); })
            .catch(err => { next(err); });
    })

module.exports = router;
