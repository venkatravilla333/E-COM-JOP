import express from 'express'
import { getUserDetails, loginUser, logoutUser, registerUser, requestPasswordReset, resetPassword, updatePassword } from '../controllers/userController.js'
import { verifyUserAuthentication } from '../middlewares/userAuth.js'

let router = express.Router()

router.route('/register')
  .post(registerUser)
router.route('/login')
  .post(loginUser)
router.route('/logout')
  .post(logoutUser)
router.route('/password/forget')
  .post(requestPasswordReset)

router.route("/reset/:token").post(resetPassword);

router.route("/profile").get(verifyUserAuthentication, getUserDetails);
router.route("/password/update").put(verifyUserAuthentication, updatePassword);

export default router
