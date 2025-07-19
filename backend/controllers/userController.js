
import asyncHandler from 'express-async-handler';
import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken'

export let register =  asyncHandler(async (req, res) => {

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
 let token =  user.generateToken()
  
    res.status(201).json({
      success: true,
      message: 'Created product in db',
      user,
      token
    })
  
});