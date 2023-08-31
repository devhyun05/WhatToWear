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
    
    const OutfitImage = ({ src, alt, description }) => (
        <Box sx={{
            backgroundColor: 'white', 
            width: '15%', 
            height: '15%', 
            position: 'relative',
            '&:hover .overlay': {
                opacity: 1
            }
        }}>
            <img src={src} alt={alt} style={{width: '100%', height: '100%'}} />
            <Box 
                className="overlay" 
                sx={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    height: '100%',
                    width: '100%',
                    opacity: '0',
                    transition: '.5s ease',
                    backgroundColor: 'rgba(0,0,0,0.2)'
                }}
            >
                <Typography 
                    variant="body1" 
                    textAlign="center"
                    sx={{
                        color: 'white',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        msTransform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                    }}
                >
                    {description}
                </Typography>
            </Box>
        </Box>
    );

    const weatherClothesCalculate = () => {
        let tempCelsius = Math.round(weatherData.main.temp - 273.15);
        let outfit;

        if (tempCelsius >= 28) {
            outfit = (
                <>
                  <OutfitImage src={process.env.PUBLIC_URL + '/img/t-shirt.png'} alt="T-shirt" description="T-shirt" />
                  <OutfitImage src={process.env.PUBLIC_URL + '/img/short_pants.png'} alt="Short pants" description="Short pants" />
                  <OutfitImage src={process.env.PUBLIC_URL + '/img/canvas_shoes.png'} alt="Canvas shoes" description="Canvas shoes" />
                </>
            )
        } else if (tempCelsius >= 23 && tempCelsius <= 27 ) {
            outfit = (
              <>
                  <OutfitImage src={process.env.PUBLIC_URL + '/img/t-shirt.png'} alt="T-shirt" description="T-shirt" />
                  <OutfitImage src={process.env.PUBLIC_URL + '/img/short_pants.png'} alt="Short pants" description="Short pants" />
                  <OutfitImage src={process.env.PUBLIC_URL + '/img/canvas_shoes.png'} alt="Canvas shoes" description="Canvas shoes" />
              </>
            );
        } else if (tempCelsius >= 20 && tempCelsius <= 22) {
            outfit = (
              <>
                <OutfitImage src={process.env.PUBLIC_URL + '/img/long_shirt.png'} alt="Long shirt" description="Long shirt"/> 
                <OutfitImage src={process.env.PUBLIC_URL + '/img/long_pants.png'} alt="Long pants" description="Long pants"/> 
                <OutfitImage src={process.env.PUBLIC_URL + '/img/canvas_shoes.png'} alt="Canvas shoes" description="Canvas shoes" />
              </>
            );
        } else if (tempCelsius >= 17 && tempCelsius <= 19) {
            outfit =(
                <>
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/sweater.PNG'} alt="Sweater" description="Sweater"/> 
                </>
            )
        } else if (tempCelsius >= 5 && tempCelsius <= 8) {
            
        } else {

        }

        return outfit;
    }
    

        return (
        <div>
            <Box style={{ marginTop: '2%', marginLeft: '2%'}}>
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
                {weatherData && (
                  <>
                    <Typography variant="h5" component="h2" textAlign="center" style={{marginBottom: '1em'}}>
                        Recommended Outfit
                    </Typography>
                    {weatherClothesCalculate()}
                  </>
                )}
            </motion.div>

        </div>
    ); 

}

export default Outfit;
