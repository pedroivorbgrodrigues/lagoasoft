var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var userSchema = mongoose.Schema({
  fb_id: String,
  token: String,
  name: String,
  email: String
});
module.exports  = mongoose.model('User', userSchema);
