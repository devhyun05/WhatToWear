const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000; 
const dotenv = require('dotenv');



dotenv.config(); 

const apiKey = process.env.apikey; 
const corsOptions = {
    origin: [
        'https://weatherclothesrecommendation-f8e0423120e4.herokuapp.com/',
        "http://localhost:3000"
    ],
};
// Use CORS middleware
app.use(cors(corsOptions)); 

app.get("/", (req, res) => {
    console.log("default route");
    res.send("abc");
});
app.get('/cityname', async (req, res) => {
    console.log("backend");
    try {
        console.log(req.query);
        const { name } = req.query;
        const cityNameURL = `https://api.api-ninjas.com/v1/city?name=${name}`;
        const cityNameResponse = await fetch(cityNameURL, {
            method: 'GET',
            headers: { 'X-Api-Key': `${apiKey}`},
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
