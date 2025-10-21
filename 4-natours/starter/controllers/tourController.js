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

exports.aliasToptours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    //BUILD QUERY
    // 1A Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    console.log(queryObj);

    // 1B Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(queryStr);

    // const query = Tour.find(queryObj);
    let query = Tour.find(JSON.parse(queryStr));

    // 2 Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    //3 Fields limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    //4 Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip > numTours) throw new Error('This page does not exist');
    }
    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    //EXECUTE QUERY
    const tours = await query;

    // SEND RES
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
