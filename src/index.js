const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('../routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));
app.use('/', routes);

app.listen(3001, () => {
  console.log('Listening on port 3001');
});
