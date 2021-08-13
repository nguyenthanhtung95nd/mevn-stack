const mongoose = require('mongoose');
const {StringUtil} = require('../utilities/string-util');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    username: String,
    first: String,
    last: String,
    password: String
});

// Adds create_at and updated_at timestamps
userSchema.set('timestamps', true); 

// Returns a transient field client-side without actually adding it to the schema
userSchema.virtual('fullName').get(function () {
    const first = StringUtil.capitalize(this.first.toLowerCase());
    const last = StringUtil.capitalize(this.last.toLowerCase());
    return `${first} ${last}`;
});

// Static methods that can be called from anywhere (e.g., User.passwordMatches)
userSchema.statics.passwordMatches = function(password, hash) {
    return bcrypt.compareSync(password, hash);
}

// Runs validation before saving a user
userSchema.pre('save', function(next) {
    this.username = this.username.toLowerCase();
    this.first = this.first.toLowerCase();
    this.last = this.last.toLowerCase();
    const unsafePassword = this.password;
    this.password = bcrypt.hashSync(unsafePassword); // Will encrypt the user's password
    next();
});

module.exports = mongoose.model('user', userSchema);