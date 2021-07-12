const Movies = require('../models/movie');
const { NotFound, BadRequest, Forbidden } = require('../errors');

const sendMovies = (req, res) => {
  res.status(200).send(req.movies);
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
      res.status(200).send({ data: movies });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new BadRequest('Карточка фильма не создана: ошибка в переданных данных');
        return next(error);
      }
      return next(err);
    });
};

const deleteMovies = (req, res, next) => {
  Movies.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFound('Карточка фильма с таким идентификатором не найдена');
    })
    .then((movieCard) => {
      // eslint-disable-next-line eqeqeq
      if (req.user._id == movieCard.owner) {
        movieCard.remove();
        res.status(200).send(movieCard);
      } else throw new Forbidden('Вы можете удалять только свои карточки фильмов');
    })
    .catch(next);
};

module.exports = {
  sendMovies,
  createMovies,
  deleteMovies,
};
