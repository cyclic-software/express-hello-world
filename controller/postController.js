const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const Post = require('./../models/Post');

exports.createPost = catchAsync(async (req, res, next) => {
  const post = await Post.create(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new AppError('there is not post with this id'));
  }
  postAuthor = post.author._id.toString();
  reqUser = req.user._id.toString();
  if (!post) {
    return next(new AppError('There is no post with this id', 404));
  }
  if (postAuthor !== reqUser) {
    return next(
      new AppError('You are not authorized to perform this action', 401)
    );
  }
  if (postAuthor === reqUser) {
    updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
  }
  res.status(200).json({
    status: 'success',
    data: {
      updatedPost,
    },
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new AppError('there is not post with this id', 404));
  }
  postAuthor = post.author._id.toString();
  reqUser = req.user._id.toString();
  if (postAuthor !== reqUser) {
    return next(new AppError('You can delete only your post!', 401));
  }
  await post.delete();
  res.status(200).json({
    status: 'success',
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  res.status(200).json(post);
});

exports.getAllPost = catchAsync(async (req, res, next) => {
  posts = await Post.find();

  res.status(200).json({
    status: 'success',
    result: posts.length,
    data: { posts },
  });
});
