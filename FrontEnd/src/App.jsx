import React from 'react';
import Home from './Pages/Home.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './Pages/ProductDetails.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/product/:id" element={<ProductDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;