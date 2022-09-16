const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Enter you name'],
    },
    email: {
      type: String,
      required: [true, 'Enter email address'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Enter new password'],
      minlength: 8,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, 'Please confirm your new password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: `Password doesn't match`,
      },
    },
    profilePic: {
      type: String,
      default: 'default.jpeg',
    },
    role: {
      type: String,
      default: 'author',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// const salt = await bcrypt.genSalt(10);
// const hashedPass = await bcrypt.hash(req.body.password, salt);

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});

// UserSchema.post('save',function())

module.exports = mongoose.model('User', UserSchema);
