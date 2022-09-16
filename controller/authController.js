const AppError = require('../utils/AppError');
const User = require('./../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');

exports.register = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });
  const { password, active, role, ...others } = newUser._doc;
  res.status(200).json({
    status: 'success',
    user: others,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  const id = user._id;
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 1000 * 60 * 60 * 24
    ),
    httpOnly: true,
  });

  user.password = undefined;
  res.status(200).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError('You are not logged in ! please login first', 401) // 401 means unauthorized
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const CurrentUser = await User.findById(decoded.id);
  if (!CurrentUser) {
    return next(
      new AppError(
        'The User belonging to this token does no longer exists.',
        401
      )
    );
  }

  // GRANT ACCESS
  req.user = CurrentUser;
  res.locals.user = CurrentUser;
  next();
});

exports.logout = (req, res) => {
  res
    .cookie('jwt', undefined, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({ status: 'success', token: '' });
};
