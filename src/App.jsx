import './App.css';
import Main from './pages/Main'; 
import { Route, Routes } from 'react-router-dom'; 
import Outfit from './pages/Outfit'; 
function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/outfit" element={<Outfit />} />
    </Routes>
  );
}

export default App;
