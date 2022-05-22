require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//PARSER and encoder
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// LOAD MYSQL DB---->
require('./config/db-connection');

//LOAD ROUTES
require("./routes/index")(app);

//PORT

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req,res) => {
    console.log(`Server is listening at port = ${PORT}`);
});