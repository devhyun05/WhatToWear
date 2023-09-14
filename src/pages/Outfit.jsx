import { useState, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';



const Outfit = () => {
    const location = useLocation(); 
    const cityName = location.state?.city; 
    const [weatherData, setWeatherData] = useState(null); 
    const [weatherDesc, setWeatherDesc] = useState(""); 
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
            width: '15%', 
            height: '15%', 
            position: 'relative',
            '&:hover .overlay': {
                opacity: 1
            }
        }}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                 <img src={src} alt={alt} style={{width: '70%', height: '70%'}} />
            </div>
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
                  <OutfitImage src={process.env.PUBLIC_URL + '/img/short-pants.png'} alt="Short pants" description="Short pants" />
                  <OutfitImage src={process.env.PUBLIC_URL + '/img/sandle.png'} alt="Canvas shoes" description="Canvas shoes" />
                </>
            )
        } else if (tempCelsius >= 23 && tempCelsius <= 27 ) {
            outfit = (
              <>
                  <OutfitImage src={process.env.PUBLIC_URL + '/img/short-dress-shirt.png'} alt="T-shirt" description="T-shirt" />
                  <OutfitImage src={process.env.PUBLIC_URL + '/img/short-pants.png'} alt="Short pants" description="Short pants" />
                  <OutfitImage src={process.env.PUBLIC_URL + '/img/sneakers.png'} alt="Canvas shoes" description="Canvas shoes" />
              </>
            );
        } else if (tempCelsius >= 20 && tempCelsius <= 22) {
            outfit = (
              <>
                <OutfitImage src={process.env.PUBLIC_URL + '/img/blouse.png'} alt="Long shirt" description="Long shirt"/> 
                <OutfitImage src={process.env.PUBLIC_URL + '/img/trouser.png'} alt="Long pants" description="Long pants"/> 
                <OutfitImage src={process.env.PUBLIC_URL + '/img/canvas_shoes.png'} alt="Canvas shoes" description="Canvas shoes" />
              </>
            );
        } else if (tempCelsius >= 17 && tempCelsius <= 19) {
            outfit =(
                <>
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/long-T-shirt.png'} alt="Sweater" description="Sweater"/> 
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/trouser.png'} alt="Long pants" description="Long pants"/> 
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/running-shoes.png'} alt="Canvas shoes" description="Canvas shoes" />
                </>
            )
        } else if (tempCelsius >= 12 && tempCelsius <= 16) {
            outfit = (
                <>
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/jacket.png'} alt="Sweater" description="Sweater"/> 
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/jeans.png'} alt="Long pants" description="Long pants"/> 
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/running-shoes.png'} alt="Canvas shoes" description="Canvas shoes" />
                </>
            )
        } else if (tempCelsius >= 9 && tempCelsius <= 11) {
            outfit = (
                <>
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/jacket.png'} alt="Trench Coat" description="Trench Coat" /> 
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/fleece-lined-pants.png'} alt="Trench Coat" description="Trench Coat" /> 
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/ankle-boots.png'} alt="Trench Coat" description="Trench Coat" /> 
                </>
            )
        } else if (tempCelsius >= 5 && tempCelsius <= 8) {
            outfit = (
                <>
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/padded-jacket.png'} alt="Trench Coat" description="Trench Coat" /> 
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/fleece-lined-pants.png'} alt="Trench Coat" description="Trench Coat" /> 
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/ankle-boots.png'} alt="Trench Coat" description="Trench Coat" /> 
                </>
            )
        } else {
            outfit = (
                <>
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/padded-jacket.png'} alt="Trench Coat" description="Trench Coat" /> 
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/fleece-lined-pants.png'} alt="Trench Coat" description="Trench Coat" /> 
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/ankle-boots.png'} alt="Trench Coat" description="Trench Coat" /> 
                </>
            )
        }

        return outfit;
    }
    

        return (
        <div>
            <video src={"/video/broken_cloud.mp4"} autoPlay loop muted
                                                   style={{position: 'absolute', 
                                                           objectFit: 'cover', 
                                                           width: '100vw', 
                                                           height: '100vh',
                                                           zIndex: '-1'}}>
            </video>

            <Box style={{display: 'flex', justifyContent: 'flex-end', marginRight: '20%'}}>
                {weatherData ? (
              
                        <div>
                                {`${weatherData.name}, ${weatherData.sys.country}`}
                 
                                <img 
                                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                                    alt="Weather icon"
                                />
          
                                {`${weatherData.weather[0].description}`}
                        
                                {`Temperature: ${Math.round(weatherData.main.temp - 273.15)}°C`}
                                {`Humidity: ${weatherData.main.humidity}%`}
                        </div>

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
                    <Typography variant="h5" component="h2" textAlign="center" >
                        {/* Recommended Outfit */}
                    </Typography>
                    {weatherClothesCalculate()}
                  </>
                )}
            </motion.div>
        </div>
    ); 

}

export default Outfit;
