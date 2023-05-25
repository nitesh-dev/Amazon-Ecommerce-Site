import mongoose, { Collection } from "mongoose";
import { Category, CategoryData, Product, ProductData } from "./models.js"

class MongoAPI {

    async connectMongoose(url: string) {
        var isConnected = false
        await mongoose.connect(url)
            .then(() => {
                isConnected = true
                console.log('Connected to MongoDB');
            })
            .catch((error) => {
                console.error('Error connecting to MongoDB:', error);
            });

        return isConnected
    }

    // --------- category ---------------

    async addCategory(categoryData: CategoryData) {

        const category = new Category({
            categoryId: categoryData.categoryId,
            clicks: categoryData.clicks,
            views: categoryData.views,
            createAt: categoryData.createAt,
            name: categoryData.name
        })

        try {
            const db = mongoose.connection.useDb("shop_cart");
            const collection = db.collection("categories");
            const newCategory = await collection.insertOne(category);
            console.log("category added")
            return newCategory;
        } catch (error) {
            console.error('Error saving product:', error);
            throw error;
        }
    }


    async getCategory(categoryId: number) {
        try {
            const db = mongoose.connection.useDb("shop_cart");
            const collection = db.collection("categories");
            const category = await collection.findOne({ categoryId: categoryId });
            console.log("fetch category")
            return category;

        } catch (error) {
            console.error('Error saving product:', error);
            throw error;
        }
    }

    async getAllCategory() {
        try {
            const db = mongoose.connection.useDb("shop_cart");
            const collection = db.collection("categories");
            const categories = await collection.find().toArray();
            return categories;

        } catch (error) {
            console.error('Error saving product:', error);
            throw error;
        }
    }


    // ------------ Account -----------------

    async addProduct(productData: ProductData) {

        const product = new Product({
            categoryId: productData.categoryId,
            productId: productData.productId,
            clicks: productData.clicks,
            views: productData.views,
            createAt: productData.createAt,
            name: productData.name,
            rating: productData.rating,
            reviewCount: productData.reviewCount,
            currentPrice: productData.currentPrice,
            discountPrice: productData.discountPrice,
            affiliateUrl: productData.affiliateUrl,
            allDetail: productData.allDetail
        })

        try {
            const db = mongoose.connection.useDb("shop_cart");
            const collection = db.collection("products");
            const newProduct = await collection.insertOne(product);
            console.log("product added")
            return newProduct;
        } catch (error) {
            console.error('Error saving product:', error);
            throw error;
        }
    }

    async getProduct(productId: number) {
        try {
            const db = mongoose.connection.useDb("shop_cart");
            const collection = db.collection("products");
            const product = await collection.findOne({ productId: productId });
            console.log("fetch product")
            return product;

        } catch (error) {
            console.error('Error saving product:', error);
            throw error;
        }
    }

    async getProducts(categoryId: number, limit: number) {
        try {
            const db = mongoose.connection.useDb("shop_cart");
            const collection = db.collection("products");
            if (limit == 0) {
                const product = await collection
                    .find({ categoryId: categoryId })
                    .toArray()
                return product;

            } else {
                const product = await collection
                    .find({ categoryId: categoryId })
                    .sort({ views: -1 })
                    .limit(limit)
                    .toArray()
                return product;
            }

        } catch (error) {
            console.error('Error saving product:', error);
            throw error;
        }
    }


}

export default MongoAPI