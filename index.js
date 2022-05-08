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


        // get single item 
        app.get('/item/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const item = await itemCollection.findOne(query);
            res.send(item);
        })



        //delete service

        app.delete('/item/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await itemCollection.deleteOne(query);
            res.send(result);

        })



    }
    finally {

    }

}

run().catch(console.dir);





// basic api ---------------
app.get('/', (req, res) => {
    res.send('Welcome to Fashion-bd-warehouse');
});

//for listen api ----------------
app.listen(port, () => {
    console.log('Listen for Fashion-bd-warehouse port:', port);
});