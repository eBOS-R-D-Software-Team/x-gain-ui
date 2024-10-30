import { saveAs } from 'file-saver';

export default function SaveButton() {
    // Get the data from localStorage
    const sectorsServicesLevelDetails = JSON.parse(localStorage.getItem('sectorsServicesLevelDetails'));
    const sectorsServicesDetails = JSON.parse(localStorage.getItem('sectorsServicesDetails'));
    const locationDetails = JSON.parse(localStorage.getItem('locationDetails'));
    const questionsFormData = JSON.parse(localStorage.getItem('questionsFormData'));  
    const DataQuestionUploadButton = JSON.parse(localStorage.getItem('DataQuestionUploadButton'));
    const Economicvalue = JSON.parse(localStorage.getItem('Economicvalue'));
    const Environmentalvalue = JSON.parse(localStorage.getItem('Environmentalvalue'));
    const Technologicalvalue = JSON.parse(localStorage.getItem('Technologicalvalue'));
    const completeQuestionsFormData = JSON.parse(localStorage.getItem('completeQuestionsFormData'));
    const hasEmployeeValue = JSON.parse(localStorage.getItem('hasEmployeeValue'));
    const answers = JSON.parse(localStorage.getItem('answers'));
    const dataCalculateSocialScore = JSON.parse(localStorage.getItem('dataCalculateSocialScore'));
    const currentQuestionIndexSocialQuestion = localStorage.getItem('currentQuestionIndexSocialQuestion');
    const socialQuestionsResponse = localStorage.getItem('socialQuestionsResponse');
    
    

    // Merge all data into one object
    const dataToSave = {
        sectorsServicesLevelDetails,
        sectorsServicesDetails,
        locationDetails, 
        questionsFormData,
        DataQuestionUploadButton,
        Economicvalue,
        Environmentalvalue,
        Technologicalvalue,
        completeQuestionsFormData,
        hasEmployeeValue,
        answers,
        dataCalculateSocialScore,
        currentQuestionIndexSocialQuestion,
        socialQuestionsResponse,
    
    };

    // Create a Blob and trigger download
    const blob = new Blob([JSON.stringify(dataToSave, null, 2)], { type: 'application/json' });
    saveAs(blob, 'mergedData.json'); // Save as mergedData.json
}
