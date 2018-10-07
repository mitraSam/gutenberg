import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  passwordHash: {
    required: true,
    type: String,
  }
}, {timestamps: true})

userSchema.methods = {
  authenticate(plaintTextPassword) {
      return bcrypt.compareSync(plaintTextPassword, this.passwordHash)
  },
  hashPassword(plaintTextPassword) {
    if (!plaintTextPassword) {
      throw new Error('Could not save user')
    }

    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(plaintTextPassword, salt)
  }
};


userSchema.pre('save',function (next) {
    const user = this;
    const hash =  this.hashPassword(user.passwordHash)
    user.passwordHash = hash
    next()

})

export const User = mongoose.model('user', userSchema)
