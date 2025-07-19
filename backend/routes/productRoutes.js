import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/productController.js";

import express from 'express'

let router = express.Router()
// let app = express()



// app.get('/api/v1/products', getAllProducts)

// app.get('/api/v1/product', getSingleProduct)

// app.post('/api/v1/products', createProduct)

// app.put('/api/v1/product', updateProduct)

// app.delete('/api/v1/product', deleteProduct)


router.route('/products')
  .get(getAllProducts)
  .post(createProduct)
router.route('/product/:id')
  .get(getSingleProduct)
  .put(updateProduct)
  .delete(deleteProduct)


  export default router