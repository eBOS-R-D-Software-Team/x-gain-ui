import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import HeaderMenu from './Components/HeaderMenu';
import Home from './Pages/Home';
import SectorServicesLevel from './Pages/SectorServicesLevel';
import PageNotFound from './Pages/PageNotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HeaderMenu />}>
          <Route exact path="/home" element={<Home />} />
          <Route path="/sector-services-level" element={<SectorServicesLevel />} />
          <Route path="/*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
