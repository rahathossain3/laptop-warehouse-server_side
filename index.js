const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
//for dotenv
require('dotenv').config();

const app = express();

//middleware-----------
app.use(cors());
app.use(express.json());

//mongodb

// username: warehouse1
// password: FOB6Ql2uJTfpp87R



const uri = "mongodb+srv://warehouse1:FOB6Ql2uJTfpp87R@cluster0.3aknj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const itemCollection = client.db('laptopwarehouse').collection('item');


        // get all items
        app.get('/item', async (req, res) => {

            const query = {};
            const cursor = itemCollection.find(query);
            const items = await cursor.toArray();

            res.send(items);

        });

        /* 
               // get user wise data
                app.get('/item', async (req, res) => {
                    // get user wise data
        
                    const email = req.query.email;
        
                    const query = {};
                    const cursor = itemCollection.find(query);
        let userEmail = 
                    // console.log('email', email);
        
                    if (email == ) {
                        const query = { email: email };
                        const cursor = itemCollection.find(query);
                        const items = await cursor.toArray();
                    }
                    else {
                        const items = await cursor.toArray();
                    }
                    // const items = await cursor.toArray();
                    res.send(items);
        
                    }
                ) 
         */

        // get single item 
        app.get('/item/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const item = await itemCollection.findOne(query);
            res.send(item);
        })


        //add item from client

        app.post('/item', async (req, res) => {
            const newItem = req.body;
            const result = await itemCollection.insertOne(newItem);
            res.send(result);
        })



        //delete service

        app.delete('/item/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await itemCollection.deleteOne(query);
            res.send(result);

        })



        /* // get user wise data
        app.get('/item', async (req, res) => {
            // get user wise data
            // console.log(req.query.email)
            const email = req.query.email;

            console.log('email', email);

            const query = { email };
            const cursor = itemCollection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        }
        ) */


        // for update item info ----------------------********
        // update item
        app.put('/item/:id', async (req, res) => {
            const id = req.params.id;

            const updateItem = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: req.body
            };
            const result = await itemCollection.updateOne(filter, updatedDoc, options);
            res.send(result);

        })







    }

    finally {

    }

}

run().catch(console.dir);





// basic api ---------------
app.get('/', (req, res) => {
    res.send('Welcome to Laptop-warehouse');
});

//for listen api ----------------
app.listen(port, () => {
    console.log('Listen for Laptop-warehouse port:', port);
});