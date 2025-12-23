const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const newUsesr = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      user: newUsesr,
    },
  });
});
