const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, `Category can't be empty`],
      unique: true,
    },
  },
  { timestamps: true }
);

CategorySchema.index({ category: 1 });

module.exports = mongoose.model('Category', CategorySchema);
