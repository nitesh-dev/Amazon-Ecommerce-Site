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





    // ------------------ Account -------------------
    async getAdmin() {
        try {
            const db = mongoose.connection.useDb("shop_cart");
            const collection = db.collection("accounts");
            const account = await collection.findOne();
            console.log("fetch account")
            return account;

        } catch (error) {
            console.error('Error saving product:', error);
            throw error;
        }

    }







    // --------- category ---------------

    async addCategory(categoryData: CategoryData) {

        try {
            const newCategory = await Category.create(categoryData);
            console.log("category added")
            return newCategory;
        } catch (error) {
            console.error('Error saving product:', error);
            throw error;
        }
    }


    async getCategory(categoryId: number) {
        try {
            const category = await Category.findOne({ categoryId: categoryId }).select({ _id: 0, __v: 0 }).lean()
            console.log("fetch category")
            return category;

        } catch (error) {
            console.error('Error saving product:', error);
            throw error;
        }
    }

    async getAllCategory() {
        try {
            const categories = await Category.find().select({ _id: 0, __v: 0 }).lean()
            return categories;

        } catch (error) {
            console.error('Error saving product:', error);
            throw error;
        }
    }











    // ------------ Products -----------------

    async addProduct(productData: ProductData) {

        try {
            const newProduct = await Product.create(productData);

            await Category.findOneAndUpdate(
                { categoryId: productData.categoryId },
                { $inc: { clicks: 1, views: 1 } }
            );

            console.log("product added")
            return newProduct;
        } catch (error) {
            console.error('Error saving product:', error);
            throw error;
        }
    }

    async getProduct(productId: number) {
        try {

            const product = await Product.findOne({ productId: productId });
            console.log("fetch product")
            return product;

        } catch (error) {
            console.error('Error saving product:', error);
            throw error;
        }
    }

    async getProducts(categoryId: number, limit: number) {
        try {

            const isExist = await this.getCategory(categoryId)

            if(isExist == null){
                return null
            }

            if (limit == 0) {
                const product = await Product
                    .find({ categoryId: categoryId })
                return product;

            } else {
                const product = await Product
                    .find({ categoryId: categoryId })
                    .sort({ views: -1 })
                    .limit(limit)
                return product;
            }

        } catch (error) {
            console.error('Error saving product:', error);
            throw error;
        }
    }


}

export default MongoAPI