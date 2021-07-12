require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const helmet = require('helmet');
const errorHandler = require('./middlewares/errorHandler');
const pageNotFound = require('./controller/pageNotFound');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const router = require('./routes');
const limiter = require('./static/rateLimit');
const mongooseConnect = require('./static/mongoose');
const corsSetting = require('./static/corsSetting');

const app = express();

mongooseConnect();

app.use(limiter);
app.use(helmet());

app.use(requestLogger);
app.use(express.json());
app.use(corsSetting);

app.use('/', router);
app.use(errors());
app.use('*', pageNotFound);
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT);
