import { useState, useEffect } from 'react'; 
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import '../App.css'; 

const Main = () => {
    const [keyword, setKeyword] = useState(''); 
    const [searchValue, setSearchValue] = useState(''); 

    const handleChange = (event) => {
        setSearchValue(event.target.value); 
    };
    useEffect(()=>{
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${keyword}&appid=1ea1024f7bfa9bdeb4698e2cbefa3060`)
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData); 
        });
    }, [keyword]);
    return (
        <div>
            <div className="search-box-wrapper">
                <h2>Search Your Location</h2>
   
                <TextField variant="outlined" 
                value={searchValue}
                onChange={handleChange}
                InputProps={{
                    startAdornment: (
                        <IconButton>
                            <SearchIcon/>
                        </IconButton>
                    ),
                    endAdornment: (
                        <IconButton onClick={() => setSearchValue("")}>
                            <ClearIcon/>
                        </IconButton>
                    ),
                    style:{
                        width: '700px', 
                        borderRadius: '20px'
                    }}}>
                    
                </TextField>
            </div>
        </div>
    );
}

export default Main; 