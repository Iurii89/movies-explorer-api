const Movies = require('../models/movie');
const { NotFound, BadRequest, Forbidden } = require('../errors');
const { movieCreateError, movieNotFound, movieErrorDelete } = require('../static/errorMessage');

const sendMovies = (req, res) => {
  res.send(req.movies);
};

const createMovies = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movies) => {
      res.send({ data: movies });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new BadRequest(movieCreateError);
        return next(error);
      }
      return next(err);
    });
};

const deleteMovies = (req, res, next) => {
  Movies.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFound(movieNotFound);
    })
    .then((movieCard) => {
      const one = String(req.user._id);
      const two = String(movieCard.owner);
      if (one !== two) {
        throw new Forbidden(movieErrorDelete);
      } return movieCard.remove()
        .then(() => res.send(movieCard));
    })
    .catch(next);
};

module.exports = {
  sendMovies,
  createMovies,
  deleteMovies,
};
