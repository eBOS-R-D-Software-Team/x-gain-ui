import React, { useEffect, useState } from 'react';
import { useNavigate ,Navigate  } from 'react-router-dom';
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
import TechnologyMixes from './Pages/TechnologyMixes';
import SummaryResults from './Pages/Results/SummaryResults';
import TermsIndex from './Pages/TermsIndex';
import TechnoEconomicIndicators from './Pages/Results/TechnoEconomicIndicators';
import HasEmployeesQuestion from './Pages/SocialWizard/HasEmployeesQuestion';
import SocialQuestionsList from './Pages/SocialWizard/SocialQuestionsList';
import BusinessModel from './Pages/Results/BusinessModel';
import SocioEnvironmentalIndicators from './Pages/Results/SocioEnvironmentalIndicators';
import RegionalAssessment from './Pages/Regional/RegionalAssessment';
import clarity from '@microsoft/clarity';


function App() { 
	//Pass States from QuestionsList
	const [currentQuestionKey, setCurrentQuestionKey] = useState('dev_per_type');
	const [selectedLevel, setSelectedLevel] = useState('');
	const [count, setCount] = useState(0);
  	const navigate = useNavigate();

	const checkTerms = localStorage.getItem('Terms'); 

	useEffect(() => {
		clarity.init('qu6da2ly1q');
	}, []);


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
				<Route path="/regionalAssessment" element={<RegionalAssessment/>} />
				<Route element={<HeaderMenu currentQuestionKey={currentQuestionKey} selectedLevel={selectedLevel} count={count} />}>        
					<Route path="/home" element={<Home />} />          
					<Route path="/sector-services-level" element={<SectorServicesLevel />} />
					<Route path="/sector-services" element={<SectorServices />} />
					<Route path="/location-details" element={<LocationDetails />} />
					<Route path="/questions" element={
						<QuestionsList 
							currentQuestionKey={currentQuestionKey} 
							setCurrentQuestionKey={setCurrentQuestionKey} 
							selectedLevel={selectedLevel} 
							setSelectedLevel={setSelectedLevel} 
							count={count}
							setCount={setCount}
						/>} 
					/>
					<Route path="/impact-assessment" element={<ImpactAssessment />} />
					<Route path="/technology-mixes" element={<TechnologyMixes />} />
					<Route path="/solution/:solId/summary-results" element={<SummaryResults />} />
					<Route path="/techno-economic-indicators" element={<TechnoEconomicIndicators />} />
					<Route path="/socio-environmental-indicators" element={<SocioEnvironmentalIndicators />} />
					<Route path="/has-employee" element={<HasEmployeesQuestion />} />
					<Route path="/social-questions" element={<SocialQuestionsList />} />
					<Route path="/business-model" element={<BusinessModel />} />
					<Route path="/*" element={<PageNotFound />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
