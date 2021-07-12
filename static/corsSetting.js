const cors = require('cors');

const corsSetting = cors({
  origin: 'http://localhost:3000',
  credentials: true,
});

module.exports = corsSetting;
