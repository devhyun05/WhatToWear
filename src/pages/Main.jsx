import { useState, useEffect } from 'react'; 
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import '../App.css'; 

const Main = () => {
 
    const [searchValue, setSearchValue] = useState(''); 
    const [searchResultArray, setSearchResultArray] = useState([]); 

    const handleChange = (event) => {
        const tempValue = event.target.value; 
        setSearchValue(tempValue); 
        
        console.log(tempValue);
        fetch(`http://api.geonames.org/searchJSON?name_startsWith=${tempValue}&maxRows=10&username=devhyun05&cities=cities15000`)
        .then(response => response.json())
        .then(responseData => {
            let results = responseData.geonames
                          .filter(item => item.toponymName.startsWith(searchValue))
                          .sort((a, b) => a.toponymName.localeCompare(b.toponymName));

            setSearchResultArray(results); 
            console.log(tempValue);
        })
        .catch(error => {
            console.log("Error: " + error); 
        })
    };

    useEffect(() => {
        
    }, [searchResultArray]); // This useEffect will run whenever searchResultArray changes.
    return (
        <div>
            <div className="search-box-wrapper">
                <h2>Search Your Location</h2>
   
                <TextField variant="outlined" 
                value={searchValue}
                onChange={handleChange}
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
                        borderRadius: '20px'
                    }}}>                
                </TextField>
                {searchResultArray.map((item, index) => <p key={index}>{item.toponymName}</p>)}
            </div>
        </div>
    );
}

export default Main; 