const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors');
const User = require('../models/user');

const { JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Ошибка входа: неправильный email или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((isValid) => {
          if (!isValid) {
            throw new Unauthorized('Ошибка входа: неправильный email или пароль');
          }
          return user;
        });
    })

    .then(({ _id }) => {
      const token = jwt.sign({ _id }, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'none');
      res.status(200).send({ token });
    })
    .catch(next);
};

module.exports = login;
