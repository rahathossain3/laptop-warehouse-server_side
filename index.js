const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

//for dotenv
require('dotenv').config();


//middleware-----------
app.use(cors());
app.use(express.json());


// basic api ---------------
app.get('/', (req, res) => {
    res.send('Welcome to Fashion-bd-warehouse');
});

//for listen api ----------------
app.listen(port, () => {
    console.log('Listen for Fashion-bd-warehouse port:', port);
});