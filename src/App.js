import React, { useState , useEffect } from 'react';
import { useNavigate ,Navigate  } from 'react-router-dom';
import { Routes, Route, redirect } from "react-router-dom";
import './App.css';
import HeaderMenu from './Components/HeaderMenu';
import Home from './Pages/Home';
import SectorServicesLevel from './Pages/SectorServicesLevel';
import PageNotFound from './Pages/PageNotFound';
import SectorServices from './Pages/SectorServices';
import LocationDetails from './Pages/LocationDetails';
import QuestionsList from './Pages/QuestionsList';
import ImpactAssessment from './Pages/ImpactAssessment';
import TechnologyMixes from './Pages/TechnologyMixes';
import SummaryResults from './Pages/Results/SummaryResults';
import TermsIndex from './Pages/TermsIndex';
import TechnoEconomicIndicators from './Pages/Results/TechnoEconomicIndicators';
import HasEmployeesQuestion from './Pages/SocialWizard/HasEmployeesQuestion';
import SocialQuestionsList from './Pages/SocialWizard/SocialQuestionsList';

function App() { 

  const navigate = useNavigate();

  const checkTerms = localStorage.getItem('Terms'); 
  useEffect(() => {
    // Check the condition if not accept terms then navigate the terms page 
    if (!checkTerms ) {
      // Redirect to the terms page
      navigate('/');
    }

  }, [checkTerms, navigate]); // Dependencies


  return (
    <div className="App">
      <Routes>
      <Route exact path="/" element={!checkTerms ?  <TermsIndex />  : <Navigate to='/home'/> } />   
        <Route  element={<HeaderMenu />}>        
          <Route path="/home" element={<Home />} />          
          <Route path="/sector-services-level" element={<SectorServicesLevel />} />
          <Route path="/sector-services" element={<SectorServices />} />
          <Route path="/location-details" element={<LocationDetails />} />
          <Route path="/questions" element={<QuestionsList />} />
          <Route path="/impact-assessment" element={<ImpactAssessment />} />
          <Route path="/technology-mixes" element={<TechnologyMixes />} />
          <Route path="/solution/:solId/summary-results" element={<SummaryResults />} />
          <Route path="/techno-economic-indicators" element={<TechnoEconomicIndicators />} />
          <Route path="/has-employee" element={<HasEmployeesQuestion />} />
          <Route path="/social-questions" element={<SocialQuestionsList />} />
          <Route path="/*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
