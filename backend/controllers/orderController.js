import { Order } from "../models/orderModel.js";
import { CustomError } from "../utils/customError.js"

import asyncHandler from 'express-async-handler';
import { Product } from "../models/productModel.js"

export const createNewOrder = asyncHandler(async (req, res, next) => {
  
  console.log(req.body)
  const { shippingInfo, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body;
  

const order = await Order.create({

    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt:Date.now(),
    user:req.user._id
})
res.status(201).json({
    success:true,
    order
})
})

//Getting single Order

export const getSingleOrder = asyncHandler(async(req,res,next)=>{
 const order=await Order.findById(req.params.id).populate("user","name email")
 if(!order){
    return next(new CustomError("No order found",404));
 }
 res.status(200).json({
    success:true,
    order
 })
})

//All my orders

export const allMyOrders = asyncHandler(async(req,res,next)=>{
 const orders=await Order.find({user:req.user._id});
 if(!orders){
    return next(new CustomError("No order found",404));
}
res.status(200).json({
    success:true,
    orders
})
})

////Getting all orders

export const getAllOrders = asyncHandler(async(req,res,next)=>{
    const orders=await Order.find();
    let totalAmount = 0;
    orders.forEach(order=>{
        totalAmount+=order.totalPrice
    })
    res.status(200).json({
        success:true,
        orders,
        totalAmount
    })
})


export const updateOrderStatus = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new CustomError("Order not found", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new CustomError("Order already delivered", 400));
    }

    if (req.body.status === "Shipped") {
        // Update stock for each product
        for (const item of order.orderItems) {
            const product = await Product.findById(item.product);
            console.log(product)
            if (product) {
                product.stock -= item.quantity;
                await product.save({ validateBeforeSave: false });
            }
        }
    }

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save();

    res.status(200).json({
        success: true,
        message: "Order status updated",
    });
});

export const deleteOrder = asyncHandler(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new CustomError("No order found",404));
    }
    if(order.orderStatus!=='Delivered'){
        return next(new CustomError("This order is under processing and cannot be deleted",404));
    }
    
    await Order.deleteOne({_id:req.params.id});
    res.status(200).json({
        success:true,
        message:"Order Deleted successfully"
    })
})
