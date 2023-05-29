import express from 'express'
import { generateId, stringToNumber } from './utils.js'
import cors from 'cors'
import dotenv from 'dotenv'
import MongoAPI from './mongo.js'
import { CategoryData, CategoryUpdate, ProductData, ScrapData } from './models.js'
import startScrapping from './scraper.js'
import bodyParser from 'body-parser'

dotenv.config()

const port = process.env.EXPRESS_PORT || 3001
const host = process.env.ATLAS_URI;

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    if (!isMongoConnected) {
        res.status(400).send("Database connection error")
    } else {
        next()
    }
})




app.post('/admin/*', async (req, res, next) => {
    if (!isMongoConnected) {
        res.status(400).send("Database connection error")
    } else {
        try {
            let adminId = req.body.adminId
            if (await isAdmin(adminId)) {
                next()
            } else {
                res.status(403).send("You don't have access")
            }

        } catch (error) {
            res.status(400).send(error)
        }
    }
})

app.put('/admin/*', async (req, res, next) => {
    if (!isMongoConnected) {
        res.status(400).send("Database connection error")
    } else {
        try {
            let adminId = req.body.adminId
            if (await isAdmin(adminId)) {
                next()
            } else {
                res.status(403).send("You don't have access")
            }

        } catch (error) {
            res.status(400).send(error)
        }
    }
})


app.get('/admin/scrap-url', async (req, res, next) => {
    if (!isMongoConnected) {
        res.status(400).send("Database connection error")
    } else {
        try {
            let adminId = req.query.adminId as string
            console.log("admin: " + adminId)
            if (await isAdmin(adminId)) {
                next()
            } else {
                res.status(403).send("You don't have access")
            }

        } catch (error) {
            res.status(400).send(error)
        }
    }
})





// -------------------- Coding part ----------------

const mongoAPI = new MongoAPI()
var isMongoConnected = await mongoAPI.connectMongoose(host!)





app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.get('/category-products', async (req, res) => {

    let categoryId = stringToNumber(req.query.categoryId as string);
    let limit = stringToNumber(req.query.limit as string)
    const data = await mongoAPI.getProducts(categoryId, limit)

    if (data == null) {
        res.status(404).send("Not Found")
    } else {
        res.status(200).send(data)
    }
})


app.get('/category-all-products', async (req, res) => {

    let categoryId = stringToNumber(req.query.categoryId as string);
    const data = await mongoAPI.getSimpleProducts(categoryId, 0)
    if (data == null) {
        res.status(404).send("Not Found")
    } else {
        res.status(200).send(data)
    }
})

app.get('/search', async (req, res) => {

    let search = req.query.search as string
    const data = await mongoAPI.getSearchedProducts(search, 15)
    if (data == null) {
        res.status(404).send("Not Found")
    } else {
        res.status(200).send(data)
    }
})


app.post('/login', async (req, res) => {
    let email = req.body.email as string
    let password = req.body.password as string
    console.log(email + "   " + password)

    let admin = await mongoAPI.getAdmin()
    if (admin == null) {
        res.status(400).send("Something went wrong!")
    } else {
        let adminEmail = (admin as any).email
        let adminPassword = (admin as any).password
        let adminAccountId = (admin as any).accountId

        if (email != adminEmail) {
            res.status(400).send("Wrong email")
        } else if (password != adminPassword) {
            res.status(400).send("Wrong password")
        } else {
            res.status(200).json({ id: adminAccountId })
        }
    }
})




// --------------------- Category ------------------
app.get('/category/:id', async (req, res) => {

    const id = parseInt(req.params.id)
    const data = await mongoAPI.getCategory(id)
    if (data == null) {
        res.status(404).send("Not Found")
    } else {
        res.status(200).send(data)
    }

})

app.get('/product', async (req, res) => {
    let productId = stringToNumber(req.query.productId as string);
    const data = await mongoAPI.getProduct(productId)
    if (data == null) {
        res.status(404).send("Not Found")
    } else {
        res.status(200).send(data)
    }
})

app.get('/all-category', async (req, res) => {

    const data = await mongoAPI.getAllCategory()
    if (data == null) {
        res.status(404).send("Not Found")
    } else {
        res.status(200).send(data)
    }
})

app.get('/home', async (req, res) => {

    const data = await mongoAPI.getHomePageData()
    if (data == null) {
        res.status(404).send("Not Found")
    } else {
        res.status(200).send(data)
    }

})

app.post('/update-product-click', (req, res) => {

    let productId = req.body.productId as number
    console.log("product click updated: " + productId)
    mongoAPI.updateProductClick(productId)

    res.sendStatus(200)
})


app.post('/update-category-click', (req, res) => {

    let categoryId = req.body.categoryId as number
    console.log("category click updated: " + categoryId)
    mongoAPI.updateCategoryClick(categoryId)

    res.sendStatus(200)
})






// ------------------------ Admin -----------------------------

app.post('/admin/category', async (req, res) => {

    let categoryName = req.body.name as string
    let isSlide = req.body.isSlide as boolean
    let imageUrl = req.body.url as string

    if (isSlide == true) {
        let isExist = await mongoAPI.isSlideShowCategoryExist()
        if (isExist == null) {
            res.status(400).send("Something went wrong")
            return
        } else if (isExist) {
            res.status(400).send("Category already exist")
            return
        }
    }

    const id = generateId()
    let data: CategoryData = {
        categoryId: id,
        clicks: 0,
        views: 0,
        createAt: id,
        name: categoryName,
        imageUrl: imageUrl,
        count: 0,
        isSlide: isSlide
    }

    const result = await mongoAPI.addCategory(data)
    if (result == null) {
        res.status(400).send("Bad request")
    } else {
        res.status(200).send(result)
    }
})

app.put('/admin/category', async (req, res) => {

    try {
        let data = req.body.data as CategoryUpdate

        const result = await mongoAPI.updateCategory(data)
        if (result == null) {
            res.sendStatus(400)
        } else {
            res.sendStatus(200)
        }
    } catch (error) {
        console.log("Bad request")
        res.status(400).send("Bad request")
    }
})


// used for deletion
app.put('/admin/category-delete', async(req, res) => {
    try {
        let categoryId = req.body.categoryId as number

        const result = await mongoAPI.deleteCategory(categoryId)
        if (result == null) {
            res.sendStatus(400)
        } else {
            res.sendStatus(200)
        }
    } catch (error) {
        console.log("Bad request")
        res.status(400).send("Bad request")
    }
})



async function isAdmin(adminId: string) {
    let admin = await mongoAPI.getAdmin()
    if (admin == null) {
        return false
    } else {
        if (adminId == (admin as any).accountId) {
            return true
        }
    }

    return false
}


app.get('/admin/scrap-url', async (req, res) => {

    let url = req.query.url as string;
    const data = await startScrapping(url)

    if (data == null) {
        res.status(400).send("Unable to scrap")
    } else {
        res.status(200).json(data)
    }

})


app.post('/admin/product', async (req, res) => {

    try {
        let categoryId = stringToNumber(`${req.body.categoryId}`)
        let slideImageUrl = req.body.slideImageUrl as string
        let affiliateUrl = req.body.affiliateUrl as string
        let imageUrl = req.body.imageUrl as string
        let data = new ScrapData().toObject(req.body.data as ScrapData)
        const id = generateId()

        console.log(data.scrapUrl + "  dddd")

        const product: ProductData = {
            categoryId: categoryId,
            name: data.info.title,
            rating: data.info.rating,
            reviewCount: data.info.reviewCount,
            price: data.info.price,
            discountPrice: data.info.discountPrice,
            affiliateUrl: affiliateUrl,
            allDetail: data.toSimpleData(),
            productId: id,
            clicks: 0,
            views: 0,
            createAt: id,
            imageUrl: imageUrl,
            scrapUrl: data.scrapUrl,
            slideImageUrl: slideImageUrl
        };

        const result = await mongoAPI.addProduct(product)
        if (result == null) {
            res.status(400).send("Bad request | category not found")
        } else {
            res.status(200).send(result)
        }


    } catch (error) {
        console.log(error);
        res.status(400).send("Bad request")
    }


})






app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})