import { allMyOrders, createNewOrder, deleteOrder, getAllOrders, getSingleOrder, updateOrderStatus } from "../controllers/orderController.js";
import { roleBasedAccess, verifyUserAuthentication } from "../middlewares/userAuth.js";
import express from 'express'
let router = express.Router()

router.route('/new/order').post(verifyUserAuthentication, createNewOrder)
router.route('/order/:id')
  .get(verifyUserAuthentication, getSingleOrder)

router.route('/orders/user').get(verifyUserAuthentication, allMyOrders)
router.route('/admin/orders').get(verifyUserAuthentication,roleBasedAccess('admin'), getAllOrders)

router.route('/admin/order/:id').put(verifyUserAuthentication,roleBasedAccess('admin'),updateOrderStatus).delete(verifyUserAuthentication,roleBasedAccess('admin'),deleteOrder)
export default router