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



export const createReviewForProduct = asyncHandler(async (req, res, next) => {
  // console.log(req.body)
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);
    if (!product) {
      return next(new CustomError("Product not found", 400));
    }
    const reviewExists = product.reviews.find(
      (review) => review.user.toString() === req.user.id.toString()
    );
    if (reviewExists) {
      product.reviews.forEach((review) => {
        if (review.user.toString() === req.user.id.toString()) {
          (review.rating = rating), (review.comment = comment);
        }
      });

    } else {
      product.reviews.push(review);
    }
  product.noOfReviews = product.reviews.length;
  
    let sum = 0;
    product.reviews.forEach((review) => {
      sum += review.rating;
    });

    product.ratings =
    product.reviews.length > 0 ? sum / product.reviews.length : 0;
  
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      product,
    });
  }
);


// Getting reviews

export const getProductReviews = asyncHandler(async (req, res, next) => {
  console.log(req.query.id)
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new CustomError("Product not found", 400));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});



// Deleting Reviews

export const deleteReview = asyncHandler(async (req, res, next) => {

  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new CustomError("Product not found", 400));
  }
  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );
  let sum = 0;
  reviews.forEach((review) => {
    sum += review.rating;
  });
  const ratings = reviews.length > 0 ? sum / reviews.length : 0;

  const noOfReviews = reviews.length;
 

  await Product.findByIdAndUpdate(

    req.query.productId,
    {
      reviews,
      ratings,
      noOfReviews,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    message: "Review Deleted Successfully",
  });
});
