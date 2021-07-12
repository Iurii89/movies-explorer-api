const createMoviesValidator = require('./createMovies');
const deleteMoviesValidator = require('./deleteMovies');
const loginValidator = require('./login');
const registerValidator = require('./register');
const updateUserValidator = require('./updateUser');

module.exports = {
  registerValidator,
  loginValidator,
  updateUserValidator,
  createMoviesValidator,
  deleteMoviesValidator,
};
