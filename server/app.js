const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes');
const dotenv = require("dotenv")
const cors = require('cors');
dotenv.config()
const PORT = process.env.PORT;
const URI = process.env.URI;
const app = express();

app.use(bodyParser.json());
app.use(morgan("tiny"))
app.use(cors());

mongoose.connect(URI)
.then(()=>{console.log("Database is connected...");})
.catch((err)=> console.log(err));

app.use('/api', routes);

app.listen(PORT, ()=> console.log(`Server is running on http://localhost:${PORT}`));