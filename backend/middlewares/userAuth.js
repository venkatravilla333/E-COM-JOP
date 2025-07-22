import { User } from "../models/userModel.js"
import { CustomError } from "../utils/customError.js"
import jwt from 'jsonwebtoken'

export async function verifyUserAuthentication(req, res, next) {

   let { token } = req.cookies
   
  console.log('hi', token)
  if (!token) {
     return next(new CustomError('need token to verify authencated user', 401))
  }

  let decodeData = jwt.verify(token, process.env.JWT_SECRETE)

   req.user = await User.findById(decodeData.id)
   
   next()
  
}

export const roleBasedAccess = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new HandleError(`Role - ${req.user.role} is not allowed to access the resource`, 403)
      )
    }
    next()
  }
}