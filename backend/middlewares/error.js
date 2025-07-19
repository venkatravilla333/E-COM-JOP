// import { customError } from "../utils/customError.js"

import { CustomError } from "../utils/customError.js"


export default (err, req, res, next)=> {
  
  err.message = err.message || 'Internal server error'
  err.statusCode = err.statusCode || 500


  if (err.name === 'CastError') {
    let message = `Invalid resouces ${err.path}`
    err = new CustomError(message, 404)
  }
  
  res.status(err.statusCode).json({
    success: false,
    message: err.message
  })
}





