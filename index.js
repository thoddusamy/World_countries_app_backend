const express = require('express')
const app = express()
const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
const dotenv = require('dotenv').config()
const cors = require('cors')
const URL = process.env.DB

app.use(express.json())

app.use(cors({
    origin: '*'
}))

app.get('/allcountries', async (req, res) => {
    try {
        //open the connection
        const connection = await mongoClient.connect(URL)

        //select the DB
        let db = connection.db('Rest_countries_API')

        //select the collection and do opreations
        let getData = await db.collection('allCountries').find().sort({ "name.common": 1 }).toArray()

        //close the connection
        connection.close()

        res.json(getData)

    } catch (error) {
        alert('Something Error! Please contact your Administor!')
    }
})

app.listen(process.env.PORT || 6999);