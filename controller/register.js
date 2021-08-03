const bcrypt = require('bcrypt');
const { Conflict } = require('../errors');
const User = require('../models/user');
const { emailDuplicated } = require('../static/errorMessage');

const register = (req, res, next) => {
  const { email, name, password } = req.body;

  User.findOne({ email })
    .then((isEmail) => {
      if (isEmail) {
        throw new Conflict(emailDuplicated);
      }
      return bcrypt.hash(password, 10);
    })
    .then((hashPassword) => {
      User.create({
        email, name, password: hashPassword,
      });
      res.send({
        email, name,
      });
    })
    .catch(next);
};

module.exports = register;
