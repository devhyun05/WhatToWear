const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: 'https://weatherclothesrecommendation-f8e0423120e4.herokuapp.com/',
};
// Use CORS middleware
app.use(cors(corsOptions)); 

