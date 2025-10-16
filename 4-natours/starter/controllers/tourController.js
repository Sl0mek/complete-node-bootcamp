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

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      time: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      time: req.requestTime,
      message: error,
    });
  }
};

exports.getTour = async (req, res) => {
  console.log('Test');
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      time: req.requestTime,
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      time: req.requestTime,
      message: error,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      time: req.requestTime,
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      time: req.requestTime,
      message: error,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    console.log(req.params.id);
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      time: req.requestTime,
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      time: req.requestTime,
      message: error,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    console.log(req.params.id);
    await Tour.findOneAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      time: req.requestTime,
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      time: req.requestTime,
      message: error,
    });
  }
};
