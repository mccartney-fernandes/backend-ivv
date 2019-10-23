const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  },
  email: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    name: {
      type: String,
      required: true
    },
    avata: {
      type: String
    }
  }
})

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = await bcrypt.hash(this.password, 10)
})

UserSchema.methods.comparePassword = function (passCompare) {
  return bcrypt.compare(passCompare, this.password)
}

UserSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.APP_SECRET)
}

const User = new mongoose.model('User', UserSchema)

module.exports = User
