const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const dishesRouter = require('./routes/api/dishes');
const ordersRouter = require('./routes/api/orders');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/dishes', dishesRouter);

app.use('/api/order', ordersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server Error' } = err;
  res.status(status).json({
    message,
  });
});

module.exports = app;
