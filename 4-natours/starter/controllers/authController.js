const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');

exports.signup = catchAsync(async (req, res, next) => {
  const newUsesr = await User.create(req.body);

  const token = jwt.sign({ id: newUsesr._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUsesr,
    },
  });
});
