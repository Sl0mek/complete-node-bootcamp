const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// MIDDLEWARE

app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello form the middleware!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTE HANDLERS

// app.get('/', (req, res) => {
//   res.status(404).json({
//     message: 'Hello from the server side',
//     app: 'Natours',
//   });
// });

// app.post('/', (req, res) => {
//   res.status(404).json({
//     message: 'You can POST on this endpoint',
//     app: 'Natours',
//   });
// });

// ROUTES

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// START SERVER

module.exports = app;
