
import mongoose from 'mongoose'

let productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
    maxLength: [7, 'Price must be less than 7 digits']
  },
  description: {
    type: String,
    required: [true, 'Please enter product description'],
  },
  category: {
    type: String,
    required: [true, 'Please enter product category'],
  },
  image: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  ratings: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    required: [true, 'please enter product stock'],
    maxLength: [5, 'Stock can not be exceed 5 digits'],
    default: 1
  },
  noOfReviews: {
    type: Number,
    default: 0
  },
  reviews: [
    {
      user: {
         type: mongoose.Schema.ObjectId
      },
      name: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      comment: {
        type: String,
        required: true
      }
    }
  ],
  user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
      },

  createdAt: {
    type: Date,
    default: Date.now
}
})

export let Product = mongoose.model('product', productSchema)