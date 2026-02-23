const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findOneAndDelete(req.params.id);

    if (!doc) {
      return next(
        new AppError(`No document found with this id: ${req.params.id}`, 404),
      );
    }

    res.status(204).json({
      status: 'success',
      time: req.requestTime,
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log(req.params.id);
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(
        new AppError(`No document found with this id: ${req.params.id}`, 404),
      );
    }

    res.status(200).json({
      status: 'success',
      time: req.requestTime,
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      time: req.requestTime,
      data: {
        data: newDoc,
      },
    });
  });
