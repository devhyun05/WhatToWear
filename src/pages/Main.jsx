import { useState, useEffect } from 'react'; 
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import '../App.css'; 

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
 
    const [searchValue, setSearchValue] = useState(''); 
    const [searchResultArray, setSearchResultArray] = useState([]); 
    const debouncedSearchValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (debouncedSearchValue) {
            fetch(`http://api.geonames.org/searchJSON?q=${debouncedSearchValue}&maxRows=10&username=devhyun05&cities=cities15000`)
            .then(response => response.json())
            .then(responseData => {
                let results = responseData.geonames
                              .filter(item => item.toponymName.toLowerCase().startsWith(debouncedSearchValue.toLowerCase()))
                              .sort((a, b) => a.toponymName.localeCompare(b.toponymName));
                console.log(responseData); 
                setSearchResultArray(results); 
            })
            .catch(error => {
                console.log("Error: " + error); 
            })
        } else {
            setSearchResultArray([]);
        }
    }, [debouncedSearchValue]);

    return (
        <div>
            <div className="search-box-wrapper">
                <h2>Search Your Location</h2>
   
                <TextField variant="outlined" 
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                InputProps={{
                    startAdornment: (                   
                        <SearchIcon/>             
                    ),
                    endAdornment: (
                        <IconButton onClick={() => setSearchValue("")}>
                            <ClearIcon/>
                        </IconButton>
                    ),
                    style:{
                        width: '700px', 
                        borderRadius: '20px',
                    }}}>                
                </TextField>
                {searchResultArray.map((item, index) => <p key={index}>{item.toponymName}, {item.countryCode}</p>)}
            </div>
        </div>
    );
}

export default Main; 
