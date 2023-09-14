import { useState, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';



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

        if (weatherData != null) {
        if (tempCelsius >= 28) {
            outfit = (
                <>
                  <OutfitImage src={process.env.PUBLIC_URL + '/img/t-shirt.png'} alt="T-shirt" description="T-shirt" />
                  <OutfitImage src={process.env.PUBLIC_URL + '/img/short-pants.png'} alt="Short pants" description="Short pants" />
                  <OutfitImage src={process.env.PUBLIC_URL + '/img/sandle.png'} alt="Sandle" description="Sandle" />
                </>
            )
        } else if (tempCelsius >= 23 && tempCelsius <= 27 ) {
            outfit = (
              <>
                  <OutfitImage src={process.env.PUBLIC_URL + '/img/short-dress-shirt.png'} alt="Short dress shirt" description="Short dress shirt" />
                  <OutfitImage src={process.env.PUBLIC_URL + '/img/short-pants.png'} alt="Short pants" description="Short pants" />
                  <OutfitImage src={process.env.PUBLIC_URL + '/img/sneakers.png'} alt="Sneakers" description="Sneakers" />
              </>
            );
        } else if (tempCelsius >= 20 && tempCelsius <= 22) {
            outfit = (
              <>
                <OutfitImage src={process.env.PUBLIC_URL + '/img/blouse.png'} alt="Blouse" description="Blouse"/> 
                <OutfitImage src={process.env.PUBLIC_URL + '/img/trouser.png'} alt="Trouser" description="Trouser"/> 
                <OutfitImage src={process.env.PUBLIC_URL + '/img/sneakers.png'} alt="Sneakeres" description="Sneakers" />
              </>
            );
        } else if (tempCelsius >= 17 && tempCelsius <= 19) {
            outfit =(
                <>
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/long-T-shirt.png'} alt="Long T-shirt" description="Long T-shirt"/> 
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/trouser.png'} alt="Trouser" description="Trouser"/> 
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/running-shoes.png'} alt="Running shoes" description="Running shoes" />
                </>
            )
        } else if (tempCelsius >= 12 && tempCelsius <= 16) {
            outfit = (
                <>
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/jacket.png'} alt="Jacket" description="Jacket"/> 
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/jeans.png'} alt="Jeans" description="Jeans"/> 
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/running-shoes.png'} alt="Running shoes" description="Running shoes" />
                </>
            )
        } else if (tempCelsius >= 9 && tempCelsius <= 11) {
            outfit = (
                <>
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/jacket.png'} alt="Jacket" description="Jacket" /> 
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/fleece-lined-pants.png'} alt="Fleece-lined pants" description="Fleece-lined pants" /> 
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/ankle-boots.png'} alt="Ankle boots" description="Ankle boots" /> 
                </>
            )
        } else if (tempCelsius >= 5 && tempCelsius <= 8) {
            outfit = (
                <>
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/padded-jacket.png'} alt="Padded jacket" description="Padded jacket" /> 
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/fleece-lined-pants.png'} alt="Fleece-lined pants" description="Fleece-lined pants" /> 
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/ankle-boots.png'} alt="Ankle boots" description="Ankle boots" /> 
                </>
            )
        } else {
            outfit = (
                <>
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/padded-jacket.png'} alt="Padded jacket" description="Padded jacket" /> 
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/fleece-lined-pants.png'} alt="Fleece-lined pants" description="Fleece-lined pants" /> 
                    <OutfitImage src={process.env.PUBLIC_URL + '/img/ankle-boots.png'} alt="Ankle boots" description="Ankle boots" /> 
                </>
            )
        }
    }

        return outfit;
    }
        const backgroundVideo = () => {
            let bgVideo; 
            console.log(weatherData);
            if (weatherData != null) {
            if (weatherData.weather[0].description === "clear sky") {
                console.log(`Weather Data : ${weatherData.weather[0].description}`);
                    bgVideo = (
                        <>
                            <video src={"/video/clear-sky.mp4"} autoPlay loop muted
                                                    style={{position: 'absolute', 
                                                            objectFit: 'cover', 
                                                            width: '100vw', 
                                                            height: '100vh',
                                                            zIndex: '-1'}}>
                            </video>
                        </>
                    )
                } else if (weatherData.weather[0].description === "few clouds" || weatherData.weather[0].description === "broken clouds") {
                    bgVideo = (
                        <>
                            <video src={"/video/few-clouds.mp4"} autoPlay loop muted
                                                    style={{position: 'absolute', 
                                                            objectFit: 'cover', 
                                                            width: '100vw', 
                                                            height: '100vh',
                                                            zIndex: '-1'}}>
                            </video>                    
                        </>
                    )
                } else if (weatherData.weather[0].description === "scattered clouds" || weatherData.weather[0].description === "overcast clouds") {
                    bgVideo = (
                        <>
                            <video src={"/video/scattered-clouds.mp4"} autoPlay loop muted
                                                    style={{position: 'absolute', 
                                                            objectFit: 'cover', 
                                                            width: '100vw', 
                                                            height: '100vh',
                                                            zIndex: '-1'}}>
                            </video>                      
                        </>
                    )
                } else if (weatherData.weather[0].description === "broken clouds") {
                    bgVideo = (
                        <>
                            <video src={"/video/broken-cluds.mp4"} autoPlay loop muted
                                                    style={{position: 'absolute', 
                                                            objectFit: 'cover', 
                                                            width: '100vw', 
                                                            height: '100vh',
                                                            zIndex: '-1'}}>
                            </video>                        
                        </>
                    )
                } else if (weatherData.weather[0].id === 500 || weatherData.weather[0].id === 501) {
                    bgVideo = (
                        <>
                            <video src={"/video/shower-rain.mp4"} autoPlay loop muted
                                                    style={{position: 'absolute', 
                                                            objectFit: 'cover', 
                                                            width: '100vw', 
                                                            height: '100vh',
                                                            zIndex: '-1'}}>
                            </video>                        
                        </>
                    )
                } else if (weatherData.weather[0].main === "Rain") {
                    bgVideo = (
                        <>
                            <video src={"/video/rain.mp4"} autoPlay loop muted
                                                    style={{position: 'absolute', 
                                                            objectFit: 'cover', 
                                                            width: '100vw', 
                                                            height: '100vh',
                                                            zIndex: '-1'}}>
                            </video>                        
                        </>
                    )
                } else if (weatherData.weather[0].main === "Thunderstorm") {
                    bgVideo = (
                        <>
                            <video src={"/video/thunderstorm.mp4"} autoPlay loop muted
                                                    style={{position: 'absolute', 
                                                            objectFit: 'cover', 
                                                            width: '100vw', 
                                                            height: '100vh',
                                                            zIndex: '-1'}}>
                            </video>                        
                        </>
                    )
                } else if (weatherData.weather[0].main === "Snow") {
                    bgVideo = (
                        <>
                            <video src={"/video/snow.mp4"} autoPlay loop muted
                                                    style={{position: 'absolute', 
                                                            objectFit: 'cover', 
                                                            width: '100vw', 
                                                            height: '100vh',
                                                            zIndex: '-1'}}>
                            </video>                        
                        </>
                    )
                } else if (weatherData.weather[0].main === "Mist") {
                    bgVideo = (
                        <>
                            <video src={"/video/mist.mp4"} autoPlay loop muted
                                                    style={{position: 'absolute', 
                                                            objectFit: 'cover', 
                                                            width: '100vw', 
                                                            height: '100vh',
                                                            zIndex: '-1'}}>
                            </video>                        
                        </>
                    )
                }
            } else {
                console.log(`Weather Data : ${weatherData}`);
            }
            return bgVideo;
        }

        return (
        <div>
 
   
                {weatherData ? (
                    <>
                       {backgroundVideo()}
                        <div style={{display: 'flex', flexDirection: 'column', color: 'white', marginLeft: '15%' }}>
                                <h1>
                                    {`${weatherData.name}, ${weatherData.sys.country}`}
                                </h1>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <img 
                                        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                                        alt="Weather icon"
                                    />
                                    <h1>{`${weatherData.weather[0].description}`}</h1>
                                </div>

                                <h1>{`Temperature: ${Math.round(weatherData.main.temp - 273.15)}°C`}</h1>
                                <h1>{`Humidity: ${weatherData.main.humidity}%`}</h1>
                        </div>
                    </>
                ) : (
                    
                <p>Loading weather data...</p>
                )}


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
