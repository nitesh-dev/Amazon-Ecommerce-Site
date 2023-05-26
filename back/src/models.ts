
import { Schema } from 'mongoose';
import mongoose from 'mongoose';

export class SimpleScrapData {
  smallInfo: { heading: string, content: string }[] = []
  technicalDetails: { heading: string, content: string }[] = []
  aboutItem: string[] = []
  featureImages: string[] = []
  landingImages: string[] = []
}

export class ScrapData {
  info = {
    title: "",
    rating: 0,
    reviewCount: 0,
    price: 0,
    discountPrice: 0
  }
  smallInfo: { heading: string, content: string }[] = []
  technicalDetails: { heading: string, content: string }[] = []
  aboutItem: string[] = []
  featureImages: string[] = []
  landingImages: string[] = []

  toSimpleData() {
    let data = new SimpleScrapData()
    data.smallInfo = this.smallInfo
    data.technicalDetails = this.technicalDetails
    data.aboutItem = this.aboutItem
    data.featureImages = this.featureImages
    data.landingImages = this.landingImages

    return JSON.stringify(data)
  }
}



// -------------- Account ----------------


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
  price: number,
  discountPrice: number,
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
  imageUrl: string,
  count: number
}

const categorySchema = new Schema({

  categoryId: { type: Number, required: true },
  clicks: { type: Number, required: true },
  views: { type: Number, required: true },
  createAt: { type: Number, required: true },
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  count: { type: Number, required: true },

});

export const Category = mongoose.model("Category", categorySchema)



