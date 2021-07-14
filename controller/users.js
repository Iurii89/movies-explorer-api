const User = require('../models/user');
const { NotFound, BadRequest, Conflict } = require('../errors');
const { emailDuplicated, userNotFound, infoNotUpgrade } = require('../static/errorMessage');

const getMe = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .orFail(() => {
      throw new NotFound('Пользователя не существует, требуется пройти регистрацию');
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findOne({ email })
    .then((isEmail) => {
      if (isEmail) {
        throw new Conflict(emailDuplicated);
      }

      User.findByIdAndUpdate(req.user._id, { email, name },
        { runValidators: true, new: true })
        .orFail(() => {
          throw new NotFound(userNotFound);
        })
        .then((user) => res.send({ data: user }))
        .catch((err) => {
          if (err.name === 'CastError') {
            const error = new BadRequest(infoNotUpgrade);
            return error;
          }
          return err;
        });
    })
    .catch(next);
};

module.exports = {
  updateUser,
  getMe,
};
