import express from 'express'
import { loginUser, logoutUser, registerUser, requestPasswordReset } from '../controllers/userController.js'

let router = express.Router()

router.route('/register')
  .post(registerUser)
router.route('/login')
  .post(loginUser)
router.route('/logout')
  .post(logoutUser)
router.route('/password/forget')
  .post(requestPasswordReset)

export default router
