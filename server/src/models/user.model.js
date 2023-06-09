import mongoose from 'mongoose'
import modelOptions from './model.option.js'
import crypto from 'crypto'

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true
    },
    displayName: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true,
      select: false
    },
    salt: {
      type: String,
      require: true,
      select: false
    }
  },
  modelOptions
)

// use pbkdf2Sync or brypt(this library do better hash password than pb.....)
// compare this.password hashed
userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex')

  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex')
}

userSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex')

  return hash === this.password
}

const userModel = mongoose.model('User', userSchema)

export default userModel
