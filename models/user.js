
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//var passport = require('passport');
var bcrypt = require('bcrypt');

// Define schema
var UserSchema = new Schema({
  userId: { type: String, required: true, index: { unique: true } },
  email: { type: String, required: true },
  name: { type: String, required: true },
  provider: { type: String, required: true },
  salt: { type: String, required: true },
  passwordHash: { type: String, required: true }
});

UserSchema.virtual('password')
.get(function() {
  return this._password;
})
.set(function(value) {
  this._password = value;
  this.salt = bcrypt.genSaltSync(12);
  this.passwordHash = bcrypt.hashSync(value, this.salt);
});

UserSchema.virtual('passwordConfirmation')
.get(function() {
  return this._passwordConfirmation;
})
.set(function(value) {
  this._passwordConfirmation = value;
});

UserSchema.path('passwordHash').validate(function(v) {
  if (this._password || this._passwordConfirmation) {
    if (this._password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'must match confirmation.');
    }
  }
  
  if (this.isNew && !this._password) {
    this.invalidate('password', 'required');
  }
}, null);

UserSchema.method('verifyPassword', function(password, callback) {
  bcrypt.compare(password, this.passwordHash, callback);
});

UserSchema.methods.setPassword = function setPassword (password, confirmpassword) {
  if (password === confirmpassword) {
    this.password = confirmpassword;
    return true;
  }
  this.invalidate('password', new Error('Password mismatch'));
  return false;
}

UserSchema.static('authenticate', function(userId, password, callback) {
  this.findOne({ userId: userId }, function(err, user) {
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