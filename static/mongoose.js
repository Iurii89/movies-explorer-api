const mongoose = require('mongoose');

const { MONGOOSE_URL } = process.env;
const mongooseUrl = 'mongodb://localhost:27017/moviesdb';

const mongooseConnect = () => {
  mongoose.connect(process.env.NODE_ENV === 'production' ? MONGOOSE_URL : mongooseUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  // eslint-disable-next-line no-console
  mongoose.connection.on('open', () => console.log('DB connected. К базе подключился. Ура:)'));
  // eslint-disable-next-line no-console
  mongoose.connection.on('error', () => console.log('Ошибка подключения базы "DB" с "mongoose" :('));
};

module.exports = mongooseConnect;
