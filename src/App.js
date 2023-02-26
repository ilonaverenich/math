import './App.css';
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import MainArithmetic from './Compoments/Arithmetic/MainArithmetic';
import Main from './Compoments/Main';

function App() {
  return (   
    <div className="App">
  
     <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Main/>} ></Route>
        <Route path='/arithmetic' element={<MainArithmetic/>} ></Route>
      </Routes>
      </BrowserRouter>
    
    
  
    </div> 

  );
}

export default App;
