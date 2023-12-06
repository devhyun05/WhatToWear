import { useState, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const backend = 'http://localhost:8000';


const Outfit = () => {
    const location = useLocation(); 
    const cityName = location.state?.city; 
    const Access_Key = "F1q2KGs1AxsrCnPGlTmEjrAEEoB_9QNXPgFk6XilOYY"
    const [weatherData, setWeatherData] = useState(null); 
    const [cityImage, setCityImage] = useState(null); 

    const url = `https://api.unsplash.com/search/photos?page=1&query=${cityName}&client_id=${Access_Key}&orientation=landscape&per_page=1`
    useEffect(() => {
        if (cityName) {
            try {
                // Record the start time before making the API call
                // const startTime = performance.now();
    
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1ea1024f7bfa9bdeb4698e2cbefa3060`)
                    .then(response => response.json())
                    .then(weatherData => {
                        // Record the end time after receiving the API response
                        // const endTime = performance.now();
    
                        // Calculate the API response time in milliseconds
                        // const apiResponseTime = endTime - startTime;
                        // console.log(`API Response Time: ${apiResponseTime} milliseconds`);
    
                        setWeatherData(weatherData);
                        fetchCityImage();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } catch (error) {
                console.error("Error occurred: ", error);
            }
        }
    }, [cityName]);
    
    const fetchCityImage = async () => {
        try {
            const startTime = performance.now();
            const response = await fetch(url); 
            const responseJson = await response.json() 
            const result = responseJson.results
            console.log(result[0].links.download);            
            setCityImage(result[0].links.download); 

                     const endTime = performance.now();
    
                        // Calculate the API response time in milliseconds
                        const apiResponseTime = endTime - startTime;
                        console.log(`API Response Time: ${apiResponseTime} milliseconds`);
        } catch (error) {
            console.error("Error: ", error); 
        }
    }


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
                 <img src={src} alt={alt} style={{width: '200px', height: '200px',}} />
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
       
        return (
        <div>
 
   
                {weatherData ? (
                    <>                       
                    <div style={{backgroundImage: `url('${cityImage}')`, 
                                 backgroundRepeat: 'no-repeat', 
                                 backgroundSize: 'cover', 
                                 backgroundPosition: 'center',    
                                 position: 'absolute',                             
                                 width: '100vw', 
                                 height: '100vh',
                          
                                 }}>
                            <div style={{display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(299, 299, 299, 0.4)', color: 'blue', marginLeft: '15%', 
                                        marginTop: '10%', position: 'absolute', fontSize: '15px', padding: '20px 40px', borderRadius: '10px'}}>
                                    <h1>
                                        {`${weatherData.name}, ${weatherData.sys.country}`}
                                    </h1>
                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                        <img 
                                            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                                            alt="Weather icon"
                                        />
                                        <h1>{`${weatherData.weather[0].description}`}</h1>
                                    </div>

                                    <h1>{`Temperature: ${Math.round(weatherData.main.temp - 273.15)}°C`}</h1>
                                    <h1>{`Humidity: ${weatherData.main.humidity}%`}</h1>

                            </div>
                        </div>
                    </>
                ) : (
                    
                <p>Loading weather data...</p>
                )}


            <motion.div 
                style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '10%'}}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {weatherData && (
                  <>

                    {weatherClothesCalculate()}
                  </>
                )}
            </motion.div>
        </div>
    ); 

}

export default Outfit;