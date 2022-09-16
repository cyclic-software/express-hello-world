const bcrypt = require('bcrypt');

const User = require('./../models/User');
const Post = require('./../models/Post');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

// only admin can get user
exports.getUser = catchAsync(async (req, res, next) => {
  const reqUser = req.user._id;
  const currentUser = await User.findById(reqUser);

  if (currentUser.role !== 'admin') {
    return next(new AppError('Unauthorised access', 401));
  }
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError('there is no user with this id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

// pending only current user can update
exports.updateUser = catchAsync(async (req, res, next) => {
  const reqUser = req.user._id;

  const updatedUser = await User.findByIdAndUpdate(
    reqUser,
    {
      name: req.body.name,
      email: req.body.email,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: 'success',
    data: {
      updatedUser,
    },
  });
});

//pending only current user can update
exports.updatePassword = (req, res, next) => {
  res.status(200).json({
    status: 'router for password updation',
  });
};

// pending only admin and current user can delete (active: false)
exports.deleteUser = catchAsync(async (req, res, next) => {
  const reqUser = req.user._id;

  if (!reqUser) {
    return next(new AppError('Unauthorised access', 401));
  }
  const user = await User.findById(reqUser);
  if (!user) {
    return next(new AppError('there is no user with this id'));
  }

  await Post.deleteMany({ author: reqUser });
  await User.findByIdAndDelete(reqUser);

  res
    .cookie('jwt', undefined, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({
      status: 'success',
    });
});
