import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import "./styles/home.css";
import Header from "./Components/Header";
import { useState } from "react";
import GetStart from "./Components/GetStart";
import 'primeicons/primeicons.css';

function App() {
  const [getStart,setGetStart] = useState(true);

  const check = (getStart) && setGetStart(false);

  return (
      
  <BrowserRouter>
    <Header/>
    {
    (!check) ? <GetStart/>:
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    }
  </BrowserRouter>
  );
}

export default App;
