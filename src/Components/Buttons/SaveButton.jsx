import { saveAs } from 'file-saver';

export default function SaveButton() {
    // Get the data from localStorage
    const sectorsServicesLevelDetails = JSON.parse(localStorage.getItem('sectorsServicesLevelDetails'));
    const sectorsServicesDetails = JSON.parse(localStorage.getItem('sectorsServicesDetails'));
    const locationDetails = JSON.parse(localStorage.getItem('locationDetails'));
    const questionsFormData = JSON.parse(localStorage.getItem('questionsFormData'));
   // const socialAnswersResponse = JSON.parse(localStorage.getItem('socialAnswersResponse'));


    // Merge all data into one object
    const dataToSave = {
        sectorsServicesLevelDetails,
        sectorsServicesDetails,
        locationDetails, 
        questionsFormData
       // socialAnswersResponse
    };

    // Create a Blob and trigger download
    const blob = new Blob([JSON.stringify(dataToSave, null, 2)], { type: 'application/json' });
    saveAs(blob, 'mergedData.json'); // Save as mergedData.json
}
