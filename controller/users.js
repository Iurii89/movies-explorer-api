const User = require('../models/user');
const { NotFound, BadRequest } = require('../errors');

const getMe = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .orFail(() => {
      throw new NotFound('Пользователя не существует, требуется пройти регистрацию');
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, { runValidators: true, new: true })
    .orFail(() => {
      throw new NotFound('Такого пользователя не существует');
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new BadRequest('Информация не обновлена. Ошибка данных');
        return error;
      }
      return next(err);
    });
};

module.exports = {
  updateUser,
  getMe,
};
