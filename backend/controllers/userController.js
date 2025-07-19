
import asyncHandler from 'express-async-handler';
import { User } from '../models/userModel.js';

export let register =  asyncHandler(async (req, res) => {

  let {name, email, password, } = req.body

  let user = await User.create({
    name,
    email,
    password,
    avathar: {
      "public_id": "user1 public-id",
      "url": "user1 url"
    }
  })

    res.status(201).json({
      success: true,
      // message: 'Created product in db',
      user
    })
  
});