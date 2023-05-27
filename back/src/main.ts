import express from 'express'
import { generateId, stringToNumber } from './utils.js'
import cors from 'cors'
import dotenv from 'dotenv'
import MongoAPI from './mongo.js'
import { CategoryData, ProductData, ScrapData } from './models.js'
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






// -------------------- Coding part ----------------

const mongoAPI = new MongoAPI()
var isMongoConnected = await mongoAPI.connectMongoose(host!)





app.get('/', (req, res) => {
    res.send('Hello World!')
})

// --------------------- Scrap -------------------

app.get('/scrap-url', async (req, res) => {

    let url = req.query.url as string;
    const data = await startScrapping(url)

    if (data == null) {
        res.status(400).send("Unable to scrap")
    } else {
        res.status(200).json(data)
    }

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

app.get('/all-category', async (req, res) => {

    const data = await mongoAPI.getAllCategory()
    if (data == null) {
        res.status(404).send("Not Found")
    } else {
        res.status(200).send(data)
    }
})

app.get('/home', async (req, res) => {

})











// ------------------------ Admin -----------------------------

app.post('/admin/category', async (req, res) => {

    let categoryName = req.body.name
    let imageUrl = req.body.url
    const id = generateId()
    let data: CategoryData = {
        categoryId: id,
        clicks: 0,
        views: 0,
        createAt: id,
        name: categoryName,
        imageUrl: imageUrl,
        count: 0
    }

    const result = await mongoAPI.addCategory(data)
    if(result == null){
        res.status(400).send("Bad request")
    }else{
        res.status(200).send(result)
    }
})


async function isAdmin(adminId: number) {
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


app.post('/admin/product', async (req, res) => {

    try {
        let categoryId = stringToNumber(`${req.body.categoryId}`)
        let affiliateUrl = req.body.affiliateUrl as string
        let data = new ScrapData().toObject(req.body.data as ScrapData)
        const id = generateId()

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
            createAt: id
        };

        const result = await mongoAPI.addProduct(product)
        if(result == null){
            res.status(400).send("Bad request | category not found")
        }else{
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