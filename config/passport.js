var configAuth = require('./auth');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../config/models');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


  passport.use(new FacebookStrategy({
      clientID: configAuth.facebookAuth.clientID,
      clientSecret: configAuth.facebookAuth.clientSecret,
      callbackURL: configAuth.facebookAuth.callbackURL,
      profileFields: ['id', 'email', 'displayName']
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function(){
	    		User.findOne({'fb_id': profile.id}, function(err, user){
	    			if(err)
	    				return done(err);
	    			if(user)
	    				return done(null, user);
	    			else {
	    				var newUser = new User();
              newUser.fb_id = profile.id;
	    				newUser.token = accessToken;
	    				newUser.name = profile.displayName;
	    				newUser.email = profile.emails[0].value;

	    				newUser.save(function(err){
	    					if(err)
	    						throw err;
	    					return done(null, newUser);
	    				});	    				
	    			}
	    		});
	    	});
    }
  ));
};
