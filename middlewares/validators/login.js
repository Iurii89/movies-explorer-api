const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { emailError } = require('../../static/errorMessage');

const loginValidator = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(8),
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }

      return helpers.message(emailError);
    }),
  }).unknown(true),
});

module.exports = loginValidator;
