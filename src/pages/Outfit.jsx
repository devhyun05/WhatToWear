import { useState, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';
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
    
    const weatherClothesCalculate = () => {
        let tempCelsius = Math.round(weatherData.main.temp - 273.15);

        if (tempCelsius >= 23 && tempCelsius <= 27 ) {
            return <img src={process.env.PUBLIC_URL+"t-shirt.jpeg"} alt="T-shirt"/>
        }
    }

    return (
        <div>
            <Box display="flex" justifyContent="center" alignItems="center">
                {weatherData ? (
                    <Card>
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

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <h1>Today's Outfit</h1>
                {weatherClothesCalculate()}
            </div>
        </div>
    ); 
}

export default Outfit;
