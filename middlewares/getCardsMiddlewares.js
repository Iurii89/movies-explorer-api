const Movies = require('../models/movie');

const getCardsMiddlewares = (req, res, next) => {
  Movies.find({})
    .then((movies) => {
      req.movies = movies;

      next();
    })
    .catch(next);
};

module.exports = getCardsMiddlewares;
