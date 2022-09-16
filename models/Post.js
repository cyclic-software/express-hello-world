const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      unique: true,
    },
    desc: {
      type: String,
      required: [true, `Description can't be empty`],
    },
    photo: {
      type: String,
      default: 'post.jpeg',
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Post must belong to author'],
    },
    categories: {
      type: Array,
    },
  },
  { timestamps: true }
);

postSchema.pre(/^find/, function (next) {
  this.populate({ path: 'author', select: 'name' });
  next();
});

module.exports = mongoose.model('Post', postSchema);
