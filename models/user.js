
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//var passport = require('passport');
var bcrypt = require('bcrypt');

// Define schema
var UserSchema = new Schema({
  uid: { type: String, unique: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  provider: { type: String, required: true },
  salt: { type: String, required: true },
  passwordHash: { type: String, required: true }
});

UserSchema
  .virtual('password')
  .get(function () {
    return this._password;
  })
  .set(function (password) {
    this._password = password;
    var salt = this.salt = bcrypt.genSaltSync(10);
    this.passwordHash = bcrypt.hashSync(password, salt);
  });

// Not entirely sure why the async version isn't working...
//.virtual('password')
//.get(function() {
//  return this._password;
//})
//.set(function(password) {
//  this._password = password;
//  bcrypt.genSalt(10, function(err, salt) {
//    this.salt = salt;
//    bcrypt.hash(password, salt, function(err, hash) {
//      this.hash = hash;
//    });
//  });
//});

UserSchema.method('verifyPassword', function(password, callback) {
  bcrypt.compare(password, this.passwordHash, callback);
});

UserSchema.static('authenticate', function(uid, password, callback) {
  this.findOne({ uid: uid }, function(err, user) {
      if (err) { return callback(err); }
      if (!user) { return callback(null, false); }
      user.verifyPassword(password, function(err, passwordCorrect) {
        if (err) { return callback(err); }
        if (!passwordCorrect) { return callback(null, false); }
        return callback(null, user);
      });
    });
});

module.exports = mongoose.model('User', UserSchema);