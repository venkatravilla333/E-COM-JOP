import express from 'express'
import { deleteUser, getSingleUser, getUserDetails, getUsersList, loginUser, logoutUser, registerUser, requestPasswordReset, resetPassword, updatePassword, updateProfile, updateUserRole } from '../controllers/userController.js'
import { roleBasedAccess, verifyUserAuthentication } from '../middlewares/userAuth.js'

let router = express.Router()

//user

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/password/forget').post(requestPasswordReset)
router.route("/reset/:token").post(resetPassword);
router.route("/profile").get(verifyUserAuthentication, getUserDetails);
router.route("/password/update").put(verifyUserAuthentication, updatePassword);


router.route("/profile/update").put(verifyUserAuthentication, updateProfile);

//admin

router.route("/admin/users").get(verifyUserAuthentication, roleBasedAccess('admin'), getUsersList);
router.route("/admin/user/:id")
  .get(verifyUserAuthentication, roleBasedAccess('admin'), getSingleUser)
  .put(verifyUserAuthentication, roleBasedAccess('admin'), updateUserRole)
  .delete(verifyUserAuthentication, roleBasedAccess('admin'), deleteUser)
  
  
export default router
