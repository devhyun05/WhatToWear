const fetch = require('node-fetch');
const express = require('express');
const path = require('path'); 
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000; 
const dotenv = require('dotenv');



dotenv.config(); 

const corsOptions = {
    origin: [
        'https://weatherclothesrecommendation-67b3a3b0816e.herokuapp.com',
        "http://localhost:3000",
        "https://www.whattoweartoday.pro"
    ],
};

// Use CORS middleware
app.use(cors(corsOptions)); 

app.use(express.static(path.join(__dirname + "/public"))); 


app.get('/cityname', async (req, res) => {
    console.log("backend");
    try {
        console.log(req.query);
        const { name } = req.query;
        const cityNameURL = `https://api.api-ninjas.com/v1/city?name=${name}`;
        const cityNameResponse = await fetch(cityNameURL, {
            method: 'GET',
            headers: { 'X-Api-Key': `${process.env.apikey}`},
        }); 
        const cityNameData = await cityNameResponse.json();

        res.json(cityNameData); 
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'An error occurred '}); 
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})
