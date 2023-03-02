import './App.css';
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import MainArithmetic from './Compoments/Arithmetic/MainArithmetic';
import Main from './Compoments/Main';
import Arifmetic from './Compoments/Arithmetic/Arifmetic';

function App() {
  return (   
    <div className="App">
  
     <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Main/>} ></Route>
        <Route path='/arithmetic' element={<MainArithmetic/>} ></Route>
        <Route path='/page' element={<Arifmetic/>}></Route>
      </Routes>
      </BrowserRouter>
    
    
  
    </div> 

  );
}

export default App;
