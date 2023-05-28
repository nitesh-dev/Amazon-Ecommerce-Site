import mongoose, { Collection } from "mongoose";
import { Category, CategoryData, HomeData, Product, ProductData, SimpleCategoryData, SimpleProductData } from "./models.js"

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
            return null
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
            return null
        }
    }

    async isSlideShowCategoryExist() {
        try {
            const category = await Category.findOne({ name: 'SlideShow' }).lean()
            if(category == null){
                return false
            }
            return true

        } catch (error) {
            console.error('Error', error);
            return null
        }
    }

    async getCategory(categoryId: number) {
        try {
            const category = await Category.findOne({ categoryId: categoryId }).select({ _id: 0, __v: 0 }).lean()
            console.log("fetch category")
            return category;

        } catch (error) {
            console.error('Error saving product:', error);
            return null
        }
    }

    async getAllCategory() {
        try {
            const categories = await Category.find().select({ _id: 0, __v: 0 }).lean()
            return categories;

        } catch (error) {
            console.error('Error saving product:', error);
            return null
        }
    }

    async getAllSimpleCategory() {
        try {
            const categories = await Category.find().select('-_id categoryId name imageUrl count isSlide').lean()
            return categories as SimpleCategoryData[];

        } catch (error) {
            console.error('Error saving product:', error);
            return null
        }
    }











    // ------------ Products -----------------

    async addProduct(productData: ProductData) {

        try {
            const isExist = await this.getCategory(productData.categoryId)
            if (isExist == null) {
                return null
            }

            const newProduct = await Product.create(productData);

            await Category.findOneAndUpdate(
                { categoryId: productData.categoryId },
                { $inc: { count: 1, views: 1 } }
            );

            console.log("product added")
            return newProduct;
        } catch (error) {
            console.error('Error saving product:', error);
            return null
        }
    }

    async getProduct(productId: number) {
        try {
            const product = await Product.findOne({ productId: productId });
            console.log("fetch product")
            return product;

        } catch (error) {
            console.error('Error saving product:', error);
            return null
        }
    }

    async getProducts(categoryId: number, limit: number) {
        try {
            const isExist = await this.getCategory(categoryId)
            if (isExist == null) {
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
            return null
        }
    }



    async getSimpleProducts(categoryId: number, limit: number) {
        try {
            const isExist = await this.getCategory(categoryId)
            if (isExist == null) {
                return null
            }

            if (limit == 0) {
                const product = await Product
                    .find({ categoryId: categoryId })
                    .select('-_id categoryId productId views name rating reviewCount price discountPrice imageUrl slideImageUrl')
                    .sort({ views: -1 })
                return product as SimpleProductData[]

            } else {
                const product = await Product
                    .find({ categoryId: categoryId })
                    .select('-_id categoryId productId views name rating reviewCount price discountPrice imageUrl slideImageUrl')
                    .sort({ views: -1 })
                    .limit(limit) as SimpleProductData[]
                return product;
            }


        } catch (error) {
            console.error('Error saving product:', error);
            return null
        }
    }



    async getHomePageData() {
        try {
            const categories = await this.getAllSimpleCategory()
            if (categories == null) return null

            const categoryDataWithProducts = await Promise.all(
                categories.map(async (category) => {

                    var products: SimpleProductData[] = []
                    if (category.isSlide == true) {
                        const data = await this.getSimpleProducts(category.categoryId, 0)
                        if (data != null) {
                            products = data
                        }
                    } else {
                        const data = await this.getSimpleProducts(category.categoryId, 7)
                        if (data != null) {
                            products = data
                        }
                    }

                    let data: HomeData = {
                        category: category,
                        products: products
                    }
                    return data
                })
            );

            return categoryDataWithProducts;
        } catch (error) {
            console.error('Error fetching category data with products:', error);
            return null;
        }
    }
}

export default MongoAPI