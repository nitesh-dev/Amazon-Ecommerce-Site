import express from 'express'
import { generateId } from './utils.js'
import cors from 'cors'
import dotenv from 'dotenv'
import MongoAPI from './mongo.js'
import { CategoryData, ProductData } from './models.js'
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





// -------------------- Coding part ----------------

const mongoAPI = new MongoAPI()
var isMongoConnected = await mongoAPI.connectMongoose(host!)

const emptyProduct: ProductData = {
    categoryId: 0,
    name: 'nitehs',
    rating: 4,
    reviewCount: 112,
    currentPrice: 'd',
    discountPrice: 'ddd',
    affiliateUrl: 'd',
    allDetail: 'd',
    productId: 0,
    clicks: 0,
    views: 0,
    createAt: 0
};


const category: CategoryData = {
    name: 'test collection',
    categoryId: 0,
    clicks: 0,
    views: 0,
    createAt: 0
}

function addProduct() {
    mongoAPI.addProduct(emptyProduct)
    mongoAPI.addCategory(category)

}






app.get('/scrap-url', async (req, res) => {

    let url = req.query.url as string;
    console.log("scrapping")
    const data = await startScrapping(url)

    if(data == null){
        res.status(400).send("Unable to scrap")
    }else{
        res.status(200).send(data)
    }
    
})


app.get('/', (req, res) => {
    res.send('Hello World!')
    addProduct()
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})