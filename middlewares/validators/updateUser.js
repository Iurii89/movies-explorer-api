const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { emailError } = require('../../static/errorMessage');

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }

      return helpers.message(emailError);
    }),
  }).unknown(true),
});

module.exports = updateUserValidator;
