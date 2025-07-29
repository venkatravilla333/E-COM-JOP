
// let express = require('express') //common js syntax 

import express from 'express' //ES-6 module pattern
import dotenv from 'dotenv' //ES-6 module pattern
import { connectWithMongoDB } from './config/db.js'
import customErrorHandler from './middlewares/error.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import product from './routes/productRoutes.js'
import user from './routes/userRoutes.js'
import order from './routes/orderRoutes.js'

dotenv.config({
  path: './config/config.env'
}) //process.env

process.on('uncaughtException', (err) => {
   console.log(`Error: close the process Shutdown the server ${err.message} `)
    process.exit(1)
})


connectWithMongoDB()


var app = express() //server creation
app.use(express.json()) 
app.use(cookieParser()) 
app.use(cors());


app.use('/api/v1', product)
app.use('/api/v1',  user)
app.use('/api/v1',  order)

app.use(customErrorHandler)

// console.log(age)

let PORT = process.env.PORT || 5000

let server = app.listen(PORT, () => {
  console.log(`Server stated in port ${PORT}`)
})

process.on('unhandledRejection', (err) => {
  console.log(`Error: close the process Shutdown the server ${err.message} `)

  server.close(() => {
    process.exit(1)
  })
})




