const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    set: (plainPassword) => {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(plainPassword, salt);
      return hashedPassword;
    },
  },
  full_name: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
  },
});

userSchema.methods.verifyPassword = function (plainPassword) {
  return bcrypt.compareSync(plainPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
