
import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter user name'],
    minLength: [3, 'please provide user name morethan 3 chars'],
    maxLength: [20, 'please provide user name sholud not be morethan 20 chars'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please enter email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter password'],
    minLength: [5, 'Please enter password morethan 5 chars'],
    select: false
  },
  avathar:  {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
  },
  role: {
    type: String,
    default: 'user'
  },
  resetPasswordToken : String,
  resetPasswordExpire: Date
  
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  let salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.comparePassword = function (userEnteredPassword) {
  
  return bcrypt.compare(userEnteredPassword, this.password)
  
}

userSchema.methods.generateToken = function () {
 return jwt.sign({ id: this._id }, process.env.JWT_SECRETE, {
      expiresIn: process.env.JWT_EXPIRE
  })
}

export let User = mongoose.model('User', userSchema)

// var x = 100