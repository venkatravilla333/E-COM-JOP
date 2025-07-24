import { createProduct, deleteProduct, getAdminProducts, getAllProducts, getSingleProduct, updateProduct } from "../controllers/productController.js";

import express from 'express'
import { roleBasedAccess, verifyUserAuthentication } from "../middlewares/userAuth.js";

let router = express.Router()
// let app = express()



// app.get('/api/v1/products', getAllProducts)

// app.get('/api/v1/product', getSingleProduct)

// app.post('/api/v1/products', createProduct)

// app.put('/api/v1/product', updateProduct)

// app.delete('/api/v1/product', deleteProduct)


// public (user)

router.route('/products').get(getAllProducts)
router.route('/product/:id').get(getSingleProduct)
  
//admin

router.route("/admin/products")
  .get(verifyUserAuthentication, roleBasedAccess("admin"), getAdminProducts);
router.route('admin/products').post(verifyUserAuthentication, roleBasedAccess('admin'), createProduct)
router.route('admin/product/:id')
  .put(verifyUserAuthentication, roleBasedAccess('admin'), updateProduct)
  .delete(verifyUserAuthentication, roleBasedAccess('admin'), deleteProduct)

  export default router