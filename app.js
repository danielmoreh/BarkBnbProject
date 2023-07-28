const express = require('express');
const morgan = require('morgan');

const dogRouter = require('./routes/dogRoutes');
const app = express();

// middlewares

// 1.1) Morgan middleware for logging incoming requests during development.
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
  
  // 1.2) Middleware for parsing incoming JSON data from the request body.
  app.use(express.json());
  
  // 1.3) Middleware for serving static files from the public directory.
  app.use(express.static(`${__dirname}/public`));
  
  // 1.4) Custom middleware adding a requestTime property to the request object.
  app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
  });

// routes
app.use('/api/v1/dogs',dogRouter);

app.all('*', (req, res, next) => {
    res.status(404).json({
      status: 'fail',
      message: `Can't find ${req.originalUrl} on this server`,
    });
  });

module.exports = app;

