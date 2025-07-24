import { Product } from "../models/productModel.js"
import { ApiFunctionality } from "../utils/apiFunctionality.js";
import { CustomError } from "../utils/customError.js"

import asyncHandler from 'express-async-handler';

export let getAllProducts = async (req, res) => {
  
  let resPerPage = 2
  // console.log('query', req.query)

  let apiFeature  = new ApiFunctionality(Product.find(), req.query).search().filter().paginate(resPerPage)
  // console.log(apiFeature)

//  let products = await Product.find()
  let products = await apiFeature.query
  // console.log(products)

  res.status(200).json({
    success: true,
    message: 'All products',
    products
  })
}

export let getSingleProduct = asyncHandler( async(req, res, next) => {

  let product = await Product.findById(req.params.id)
  if (!product) {
    // res.status(404).json({
    //   success: false,
    //   message: 'Product not found with given id'
    // })
    return next(new CustomError('Product not found with given id', 404))
  }
  res.status(200).json({
    success: true,
    message: 'Get single product',
    product
  })
})

export let createProduct =  asyncHandler(async (req, res) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      // message: 'Created product in db',
      product
    })
  
});


export let updateProduct = asyncHandler( async(req, res, next) => {

 let product =await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
 })
  
  if (!product) {
    // res.status(404).json({
    //   success: false,
    //   message: 'Product not found with given id'
    // })
   return next(new CustomError('Product not found with given id', 404))
  }
  
  res.status(201).json({
    success: true,
    message: 'Update product',
    product
  })
})

export let deleteProduct = asyncHandler(async(req, res, next) => {

  let product = await Product.findByIdAndDelete(req.params.id)
  
  if (!product) {
    // res.status(404).json({
    //   success: false,
    //   message: 'Product not found with given id'
    // })
   return next(new CustomError('Product not found with given id', 404))
  }
  res.status(201).json({
    success: true,
    message: 'Delete product'
  })
} )

//admin

export const getAdminProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});
