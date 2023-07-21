import { useState, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const Outfit = () => {
    const location = useLocation(); 
    const cityName = location.state?.city; 
    const [weatherData, setWeatherData] = useState(null); 

    useEffect(() => {
        if (cityName) {
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1ea1024f7bfa9bdeb4698e2cbefa3060`)
            .then(response => response.json())
            .then(data => {
                setWeatherData(data);
            })
            .catch(err => {
                console.log(err); 
            })
        }
    }, [cityName]);
    
    const OutfitImage = ({ src, alt }) => (
        <div style={{backgroundColor: 'white', width: '15%', height: '15%'}}>
          <img src={src} alt={alt} style={{width: '100%', height: '100%'}} />
        </div>
    );

    const weatherClothesCalculate = () => {
        let tempCelsius = Math.round(weatherData.main.temp - 273.15);
    
        if (tempCelsius >= 23 && tempCelsius <= 27 ) {
            return (
              <>
                <OutfitImage src={process.env.PUBLIC_URL + '/img/t-shirt.png'} alt="T-shirt" />
                <OutfitImage src={process.env.PUBLIC_URL + '/img/short_pants.png'} alt="Short pants" />
              </>
            );
        } else {
            return <h1>No image</h1>; 
        }
    }
    

    return (
        <div>
            <Box style={{display: "flex", justifyContent: "flex-start", alignItems: "center", marginTop: '5%', marginLeft: '5%'}}>
                {weatherData ? (
                    <Card style={{width: '20%', height: '20%'}}>
                        <CardContent>
                            <Typography variant="h5" component="div" textAlign="center">
                                {`${weatherData.name}, ${weatherData.sys.country}`}
                            </Typography>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <img 
                                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                                    alt="Weather icon"
                                />
                                <Typography variant="body2" textAlign="center">
                                    {`${weatherData.weather[0].description}`}
                                </Typography>
                            </Box>
                            <Typography variant="body2" textAlign="center">
                                {`Temperature: ${Math.round(weatherData.main.temp - 273.15)}°C`}
                            </Typography>
                            <Typography variant="body2" textAlign="center">
                                {`Humidity: ${weatherData.main.humidity}%`}
                            </Typography>
                        </CardContent>
                    </Card>
                ) : (
                    <p>Loading...</p>
                )}
            </Box>

            <motion.div 
                style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1>Recommended Outfit</h1>
                {weatherData && weatherClothesCalculate()}
            </motion.div>

        </div>
    ); 
}

export default Outfit;
