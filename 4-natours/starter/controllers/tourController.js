// const fs = require('fs');
const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// exports.checkID = (req, res, next, id) => {
//   console.log(`ID is: ${id}`);
//   const tour = tours.find((el) => el.id === id * 1);

//   if (!tour) {
//     return res.status(404).json({
//       status: 'fail',
//       time: req.requestTime,
//       message: 'Invalid ID',
//     });
//   }

//   req.tour = tour;
//   next();
// };

exports.checkBody = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      status: 'fail',
      time: req.requestTime,
      message: 'Missing name or price',
    });
  }

  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    time: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  // res.status(200).json({
  //   status: 'success',
  //   time: req.requestTime,
  //   data: {
  //     tour: req.tour,
  //   },
  // });
};

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    time: req.requestTime,
    data: {
      tour: newTour,
    },
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    time: req.requestTime,
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    time: req.requestTime,
    data: null,
  });
};
