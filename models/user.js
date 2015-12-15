var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');
	// passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
	// userId: String,
    username: String,
    password: String
});

// Hash the password in middleware. Security thoughts?
// Password is MD5 hashed in hex format.
UserSchema.pre('save',
	function(next){
		if (this.password){
			var md5 = crypto.createHash('md5');
			this.password = md5.update(this.password).digest('hex');
		}
		next();
	})

UserSchema.methods.authenticate = function(password){
	var md5 = crypto.createHash('md5');
	md5 = md5.update(password).digest('hex');

	return this.password == md5;
}

UserSchema.statics.findUserName = function(username){
	//Nothing here at the moment
	return null;
}

// UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);