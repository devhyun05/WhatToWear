import { useState, useEffect, useRef } from 'react'; 
import { useNavigate } from 'react-router-dom'; 

import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../App.css'; 

const backend = 'https://www.whattoweartoday.pro'; 

const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
          },
        },
      },
    },
  });

// Custom debounce hook
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
  
    return debouncedValue;
}

const Main = () => {
    
    const navigate = useNavigate(); 
    const [searchValue, setSearchValue] = useState(''); 
    const [searchResultArray, setSearchResultArray] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null); 
    const debouncedSearchValue = useDebounce(searchValue, 500);
    const inputKey = useRef(1);

    useEffect(() => {
  
        if (debouncedSearchValue) {
            fetch(`${backend}/cityname?name=${debouncedSearchValue}`)
            .then(response => response.json())
            .then(responseData => {
                setSearchResultArray(responseData); 
            })
            .catch(error => {
                console.log("Went to error");
                console.log("Error: " + error); 
            })
        } else {
            setSearchResultArray([]);
        }
    }, [debouncedSearchValue]);

    const clearSearchValue = () => {
        setSearchValue("");
        setSelectedOption(null);
        inputKey.current += 1;  // increment the key to force re-render
    };

    return (

        <ThemeProvider theme={theme}>
            <div style={{ backgroundImage: 'url("/img/cloudy.jpg")', width: '100vw', height: '100vh', backgroundSize: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

                <div className="search-box-wrapper" style={{marginBottom: '15%'}}>
                    <h1 style={{textAlign: 'center'}}>Search Your City</h1>
    
                    <Autocomplete
                        key={inputKey.current}
                        freeSolo
                        options={searchResultArray}
                        getOptionLabel={(option) => `${option.name}, ${option.country}`}
                        onInputChange={(event, newValue) => {
                            setSearchValue(newValue);
                        }}
                        onChange={(event, newValue) => {
                            setSelectedOption(newValue);
                        }}
                        renderOption={(props, option) => (
                            <li {...props}>
                                <img 
                                    src={`https://github.com/hjnilsson/country-flags/blob/main/png250px/${option.country.toLowerCase()}.png?raw=true`} 
                                    alt={`Flag of ${option.country}`} 
                                    style={{width: '25px', marginRight: '10px'}}
                                />
                                {`${option.name}, ${option.country}`}
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField {...params}
                                variant="outlined" 
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        if (searchResultArray.length > 0) {
                                            setSelectedOption(searchResultArray[0]);
                                        }
                                    }
                                  }}
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (                   
                                        <SearchIcon/>             
                                    ),
                                    endAdornment: (
                                        <IconButton onClick={clearSearchValue}>
                                            <ClearIcon/>
                                        </IconButton>
                                    ),
                                    style:{
                                        width: '700px', 
                                        borderRadius: '20px',
                                    }
                                }}
                            />                
                        )}
                    />
                    <Collapse in={!!selectedOption}>
                    <Button onClick={() => {
                        const city = selectedOption?.name;
                        navigate('/outfit', { state: { city } });
                    }} variant="contained" color="primary" style={{marginTop: '20px'}}>
                        Check today's outfit!
                    </Button>


                    </Collapse>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default Main;
