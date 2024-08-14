import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import HeaderMenu from './Components/HeaderMenu';
import Home from './Pages/Home';
import SectorServicesLevel from './Pages/SectorServicesLevel';
import PageNotFound from './Pages/PageNotFound';
import SectorServices from './Pages/SectorServices';
import LocationDetails from './Pages/LocationDetails';
import QuestionsList from './Pages/QuestionsList';
import ImpactAssessment from './Pages/ImpactAssessment';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HeaderMenu />}>
          <Route exact path="/home" element={<Home />} />
          <Route path="/sector-services-level" element={<SectorServicesLevel />} />
          <Route path="/sector-services" element={<SectorServices />} />
          <Route path="/location-details" element={<LocationDetails />} />
          <Route path="/questions" element={<QuestionsList />} />
          <Route path="/impact-assessment" element={<ImpactAssessment />} />
          <Route path="/*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
