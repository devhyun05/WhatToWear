const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000; 

const corsOptions = {
    origin: [
        'https://weatherclothesrecommendation-f8e0423120e4.herokuapp.com',
        "http://localhost:3000"
    ],
};
// Use CORS middleware
app.use(cors(corsOptions)); 

app.get('/geonames', async (req, res) => {

    try {
        const { q } = req.query;
        const geonamesURL = `https://api.geonames.org/searchJSON?q=${q}&maxRows=100&username=devhyun05&cities=cities15000`;
        const geonamesResponse = await fetch(geonamesURL); 
        const geonamesData = await geonamesResponse.json();
        res.json(geonamesData); 
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'An error occurred '}); 
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})
