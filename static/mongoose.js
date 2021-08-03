const mongoose = require('mongoose');

const { MONGO_URL } = require('../config');

const mongooseConnect = () => {
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  mongoose.connection.on('open', () => console.log('DB connected. К базе подключился. Ура:)'));
  mongoose.connection.on('error', () => console.log('Ошибка подключения базы "DB" с "mongoose" :('));
};

module.exports = mongooseConnect;
