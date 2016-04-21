var express = require('express');
var passport = require('passport');
var fbgraph = require('fbgraph');
var User = require('../config/models');
fbgraph.setVersion("2.6");
var router = express.Router();
var bluebird = require('bluebird');

router.get('/', profileRedirectCheck, function(req, res) {
  res.render('index', {title: 'Express'});
});
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_friends'] }));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/profile',
                                      failureRedirect: '/' }));
router.get('/profile', isLoggedIn, function(req,res) {
  res.render('profile', {user: req.user});
});

router.get('/api', function(req,res) {
    var dbPromise = User.find().exec();
    var promise = dbPromise.then(function(users) {
      return bluebird.map(users, function(user) {
        var params = {
          access_token: user._doc.token
        };
        var friends = new Promise(function(resolve, reject){
          fbgraph.get('/me/friends', params, function(err,res) {
            if(err)
            {
              reject({error: err});
            }
            else {
              console.log(res);
              var friendsString = "";
              for(i = 0; i < res.data.length; i++) {
                friendsString+= res.data[i].name + ', ';
              };
              var json = {user: user.name, friends: friendsString};
              resolve(json);
            }
          });
        });
        return friends.then(function(result){
          return result;
        });
     });
    }).then(function(result) {
      res.send(result);
    }).catch(function(err) {
      console.log('error:', err);
    });
  });

router.get('/logout', function(req,res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;

function profileRedirectCheck(req, res, next) {
  if(!req.isAuthenticated()){
      return next();
  }
  res.redirect('/profile');
}

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}

	res.redirect('/');
}
