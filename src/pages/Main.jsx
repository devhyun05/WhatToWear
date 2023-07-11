import TextField from '@mui/material/TextField';
import '../App.css'; 

const Main = () => {
    return (
        <div>
            <div className="search-box-wrapper">
                <h2>Search Your Location</h2>
                <TextField variant="outlined" InputProps={{style:{width: '700px', borderRadius: '20px'}}}/>
            </div>
        </div>
    );
}

export default Main; 