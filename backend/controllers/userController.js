
import asyncHandler from 'express-async-handler';
import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import {  sendJwttoken } from '../utils/Jwttoken.js';

export let registerUser =  asyncHandler(async (req, res) => {

  let { name, email, password, } = req.body
  
  // let salt = await bcrypt.genSalt(10)

  // let hashingPassword = await bcrypt.hash(password, 10)
  

  let user = await User.create({
    name,
    email,
    password,
    avathar: {
      "public_id": "user1 public-id",
      "url": "user1 url"
    }
  })

  // let token = jwt.sign({ id: user._id }, process.env.JWT_SECRETE, {
  //     expiresIn: process.env.JWT_EXPIRE
  // })
  // let token = user.generateToken()

  sendJwttoken(user, 200, res)
    
    // res.status(201).json({
    //   success: true,
    //   message: 'Created product in db',
    //   user,
    //   token
    // })
  
});
export let loginUser =  asyncHandler(async (req, res) => {

  let { email, password, } = req.body

  if (!email || !password) {
      return next(new CustomError('Should be entered email and password', 401))
  }

  var user = await User.findOne({ email }).select('+password')
  
  if (!user) {
     return next(new CustomError('Invalid user name or password', 401))
  }

  let matchPassword = user.comparePassword(password)
  
  if (!matchPassword) {
    return next(new CustomError('Invalid user name or password', 401))
  }

  sendJwttoken(user, 200, res)
//  let token =  user.generateToken()
  
//     res.status(201).json({
//       success: true,
//       message: 'Login success',
//       user,
//       token
//     })
  
});

export let logoutUser = asyncHandler(async (req, res) => {
  
  res.cookie('token', null , {
    expires: new Date(Date.now()),
    httpOnly: true
  })

  res.status(200).json({
    success: true,
    message: "User logged out successfully"
  })
  
})


export const requestPasswordReset = asyncHandler(async (req, res, next) => {
  // let { email } = req.body

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new HandleError("User doesn't exist", 400));
  }

  let resetToken;

  try {
    resetToken = user.generatePasswordResetToken();
    console.log(resetToken)
    await user.save({ validateBeforeSave: false });
  } catch (error) {
    return next(new HandleError("Could not save reset token, please try again later", 500));
  }
});