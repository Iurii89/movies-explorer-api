const router = require('express').Router();
const controller = require('../controller/movies');
const getCardsMiddlewares = require('../middlewares/getCardsMiddlewares');
const { createMoviesValidator, deleteMoviesValidator } = require('../middlewares/validators');

router.get('/', getCardsMiddlewares, controller.sendMovies);
router.post('/', createMoviesValidator, controller.createMovies);
router.delete('/:movieId', deleteMoviesValidator, controller.deleteMovies);

module.exports = router;
