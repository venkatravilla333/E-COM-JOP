
import mongoose from 'mongoose'
import validator from 'validator'

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
    minLength: [5, 'Please enter password morethan 5 chars']
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

export let User = mongoose.model('User', userSchema)

// var x = 100