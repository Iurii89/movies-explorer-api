const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors');
const User = require('../models/user');
const { inError } = require('../static/errorMessage');

const { JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized(inError);
      }

      return bcrypt.compare(password, user.password)
        .then((isValid) => {
          if (!isValid) {
            throw new Unauthorized(inError);
          }
          return user;
        });
    })

    .then(({ _id }) => {
      const token = jwt.sign({ _id }, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'none');
      res.send({ token });
    })
    .catch(next);
};

module.exports = login;
