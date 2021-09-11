const express = require('express');
const app = express();
const fileRoutes = require('./routes/file');
const mongoose = require('mongoose');
const path = require('path');
const envVeribles = process.env.NODE_ENV == 'production' ? './.env' : './.env.local';
require('dotenv').config({path: path.resolve(__dirname,envVeribles)});
const PORT = process.env.PORT || 1101;
const cors = require('cors');

app.use(cors())
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use('/',fileRoutes);

console.log(process.env.DB_URL)

mongoose.connect(process.env.DB_URL)
    .then(() => console.log('connected to database'))
    .catch((err) => console.log('Database connection error: ',err))

app.listen(PORT,() => console.log(`server running on ${PORT} port`))






























