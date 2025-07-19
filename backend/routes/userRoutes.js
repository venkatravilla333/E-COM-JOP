import express from 'express'
import { register } from '../controllers/userController.js'

let router = express.Router()

router.route('/users')
  .post(register)

export default router
