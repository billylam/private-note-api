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

let port = process.env.PORT;
if (port == null || port === '') {
  port = 8000;
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
