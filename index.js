const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
//for dotenv
require('dotenv').config();

const app = express();

//middleware-----------
app.use(cors());
app.use(express.json());

//mongodb

username: warehouse1
password: FOB6Ql2uJTfpp87R



const uri = "mongodb+srv://warehouse1:FOB6Ql2uJTfpp87R@cluster0.3aknj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const itemCollection = client.db('laptopwarehouse').collection('item');

    }
    finally {

    }

}

run().catch(console.dir);

// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object

// });




// basic api ---------------
app.get('/', (req, res) => {
    res.send('Welcome to Fashion-bd-warehouse');
});

//for listen api ----------------
app.listen(port, () => {
    console.log('Listen for Fashion-bd-warehouse port:', port);
});