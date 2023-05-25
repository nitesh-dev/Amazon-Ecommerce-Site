
import { Schema } from 'mongoose';
import mongoose from 'mongoose';



// ------------ Products -----------------
export interface ProductData {
  categoryId: number,
  productId: number,
  clicks: number,
  views: number,
  createAt: number,
  name: string,
  rating: number,
  reviewCount: number,
  currentPrice: string,
  discountPrice: string,
  affiliateUrl: string,
  allDetail: string
}

const productSchema = new Schema({

  categoryId: { type: Number, required: true },
  productId: { type: Number, required: true },
  clicks: { type: Number, required: true },
  views: { type: Number, required: true },
  createAt: { type: Number, required: true },
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  reviewCount: { type: Number, required: true },
  currentPrice: { type: String, required: true },
  discountPrice: { type: String, required: true },
  affiliateUrl: { type: String, required: true },
  allDetail: { type: String, required: true },

});

export const Product = mongoose.model("Product", productSchema)


// ------------------------- Collections --------------------

export interface CategoryData {
  categoryId: number,
  clicks: number,
  views: number,
  createAt: number,
  name: string,
}

const categorySchema = new Schema({

  categoryId: { type: Number, required: true },
  clicks: { type: Number, required: true },
  views: { type: Number, required: true },
  createAt: { type: Number, required: true },
  name: { type: String, required: true },

});

export const Category = mongoose.model("Category", categorySchema)



