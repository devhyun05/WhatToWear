const fetch = require('node-fetch');
const express = require('express');
const path = require('path'); 
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000; 
const dotenv = require('dotenv');
const deepai = require('deepai');

deepai.setApiKey(`1ca9978f-a4f6-40c1-a1a0-2b1c22b2184a`); 



dotenv.config(); 

const corsOptions = {
    origin: [
        'https://weatherclothesrecommendation-67b3a3b0816e.herokuapp.com',
        "http://localhost:3000",
        "https://www.whattoweartoday.pro"
    ],
};

app.use(express.json());
// Use CORS middleware
app.use(cors(corsOptions)); 

app.use(express.static(path.join(__dirname + "/public"))); 


app.get('/cityname', async (req, res) => {

    try {
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
});

app.get('/cityImage', async (req, res) => {
    const searchText = req.body.text; 
    const unsplashAPI = `https://api.unsplash.com/search/photos?page=1&query=${searchText}&client_id=${process.env.unsplashAPIKey}&orientation=landscape&per_page=1`
    
    

});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})
