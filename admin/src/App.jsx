import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Add from "./pages/Add";

const App = () => {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addcourse" element={<Add />} />

      </Routes>
    
  );
}

export default App;
