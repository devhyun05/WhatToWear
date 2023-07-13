import { useState, useEffect } from 'react'; 
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import '../App.css'; 

const Main = () => {
 
    const [searchValue, setSearchValue] = useState(''); 

    const handleChange = (event) => {
        setSearchValue(event.target.value); 
    };

    const fetchData = () => {
        fetch(`http://api.geonames.org/searchJSON?q=${searchValue}*&maxRows=10&username=devhyun05&cities=cities15000`)
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData); 
    
        }); 
    };


    return (
        <div>
            <div className="search-box-wrapper">
                <h2>Search Your Location</h2>
   
                <TextField variant="outlined" 
                value={searchValue}
                onChange={handleChange}
                InputProps={{
                    startAdornment: (
                        <IconButton onClick={fetchData}>
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