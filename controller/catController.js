const AppError = require('../utils/AppError');
const Category = require('./../models/Category');
const catchAsync = require('./../utils/catchAsync');

exports.createCat = catchAsync(async (req, res, next) => {
  const filterCat = await Category.findOne({ category: req.body.category });
  if (filterCat) {
    if (req.body.category === filterCat.category) {
      return next(new AppError('value already exists. please use another'));
    }
  }
  const newCat = await Category.create({ category: req.body.category });

  res.status(200).json({
    status: 'success',
    data: {
      category: newCat,
    },
  });
});

exports.getCat = catchAsync(async (req, res, next) => {
  const cats = await Category.find();
  res.status(200).json({
    status: 'success',
    result: cats.length,
    data: {
      category: cats,
    },
  });
});

exports.deleteCat = catchAsync(async (req, res, next) => {
  const cat = await Category.findByIdAndDelete(req.params.id);
  if (!cat) {
    return next(new AppError('there is no category with this id'));
  }
  res.status(200).json({
    status: 'success',
  });
});

exports.deleteAllCat = catchAsync(async (req, res, next) => {
  await Category.deleteMany({});

  res.status(200).json({
    status: 'success',
  });
});
