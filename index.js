const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middle wares
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("BD-Travel");
});



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rgz3uon.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {
    try {
        const servicesCollection = client.db("bdTravel").collection("services");
        const reviewCollection = client.db("bdTravel").collection("reviews");


        // read

        app.get("/services", async (req, res) => {
            const query = {};
            const cursor = servicesCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

        app.get("/services/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const doubleSection = await servicesCollection.findOne(query);
            res.send(doubleSection);
        });

        // reviews api
        app.get('/reviews', async (req, res) => {
            let query = {};

            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }

            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        })


        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })


    }
    finally {

    }
}

run().catch(err => console.error(err));



app.listen(port, () => {
    console.log(`server is working from ${port}`);
});




// find(query).sort({date: -1})