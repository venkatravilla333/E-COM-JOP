import asyncHandler from 'express-async-handler';
import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { sendJwttoken } from '../utils/Jwttoken.js';
import { sendEmail } from '../utils/sendEmail.js';
import { CustomError } from '../utils/customError.js';
import crypto from 'crypto'

export let registerUser = asyncHandler(async (req, res) => {
  let { name, email, password } = req.body;

  // let salt = await bcrypt.genSalt(10)

  // let hashingPassword = await bcrypt.hash(password, 10)

  let user = await User.create({
    name,
    email,
    password,
    avathar: {
      public_id: 'user1 public-id',
      url: 'user1 url',
    },
  });

  // let token = jwt.sign({ id: user._id }, process.env.JWT_SECRETE, {
  //     expiresIn: process.env.JWT_EXPIRE
  // })
  // let token = user.generateToken()

  sendJwttoken(user, 200, res);

  // res.status(201).json({
  //   success: true,
  //   message: 'Created product in db',
  //   user,
  //   token
  // })
});
export let loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return next(new CustomError('Should be entered email and password', 401));
  }

  var user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new CustomError('Invalid user name or password', 401));
  }

  let matchPassword = user.comparePassword(password);

  if (!matchPassword) {
    return next(new CustomError('Invalid user name or password', 401));
  }

  sendJwttoken(user, 200, res);
  //  let token =  user.generateToken()

  //     res.status(201).json({
  //       success: true,
  //       message: 'Login success',
  //       user,
  //       token
  //     })
});

export let logoutUser = asyncHandler(async (req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'User logged out successfully',
  });
});


//forget password

export const requestPasswordReset = asyncHandler(async (req, res, next) => {
  let { email } = req.body;

  const user = await User.findOne({ email });
  console.log('hi', user);

  if (!user) {
    return next(new CustomError("User doesn't exist", 400));
  }

  let resetToken;
  try {
    resetToken = await user.generatePasswordResetToken();
    console.log(resetToken)
    await user.save({validateBeforeSave: false});
    console.log(user)
    console.log('User saved with reset token');
  } catch (error) {
    console.log('ERROR WHILE GENERATING TOKEN:', error);
    return next(new CustomError('Could not save reset token', 500));
  }

  const resetPasswordURL = `http://localhost/api/v1/reset/${resetToken}`;
  console.log('hi', resetPasswordURL);
  const message = `Use the following link to reset your password: ${resetPasswordURL}. This link will expire in 30 minutes.If you didn’t request a password reset, please ignore this message.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      message: message,
    });
    res.status(200).json({
      success: true,
      message: `Email is sent to ${user.email}`
    })
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new CustomError("Email couldn't be sent, please try again later", 500)
    );
  }
});


//reset password

export const resetPassword = asyncHandler(async (req, res, next) => {

  console.log(req.params.token)
const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire:{$gt:Date.now()}
})
if(!user){
    return next(new CustomError("Reset Password token is invalid or has been expired",400))
  }
  
  const { password, confirmPassword } = req.body;
  
if(password!==confirmPassword){
    return next(new CustomError("Password doesn't match",400))
}
user.password = password;
user.resetPasswordToken=undefined;
user.resetPasswordExpire=undefined;
await user.save();
sendJwttoken(user,200,res)
})


//get user details

export const getUserDetails=asyncHandler(async(req , res , next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    })
 
})

//update password

export const updatePassword = asyncHandler(async (req, res, next) => {
  
  const { oldPassword, newPassword, confirmPassword } = req.body;
  
  const user = await User.findById(req.user.id).select('+password');
  
  const checkPasswordMatch = await user.verifyPassword(oldPassword);
  
    if(!checkPasswordMatch){
        return next(new CustomError('Old password is incorrect',400))
    }
    if(newPassword!==confirmPassword){
        return next(new CustomError("Password doesn't match",400))
    }
    user.password = newPassword;
    await user.save();
    sendJwttoken(user,200,res);
})
