const mongoose = require('mongoose');
const validator = require('validator');
const { emailError } = require('../static/errorMessage');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: emailError,
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('user', userSchema);
