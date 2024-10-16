export const handleFileUpload = (event, setFileContent) => {    
   
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
    
        reader.onload = function(e) {
            try {
                const json = JSON.parse(e.target.result);
                
                // Check and set values into localStorage only if they are not null
                if (json.sectorsServicesLevelDetails !== null) {
                    localStorage.setItem('sectorsServicesLevelDetails', JSON.stringify(json.sectorsServicesLevelDetails));
                }
                if (json.sectorsServicesDetails !== null) {
                    localStorage.setItem('sectorsServicesDetails', JSON.stringify(json.sectorsServicesDetails));
                }
                if (json.locationDetails !== null) {
                    localStorage.setItem('locationDetails', JSON.stringify(json.locationDetails));
                }
                if (json.questionsFormData !== null) {
                    localStorage.setItem('questionsFormData', JSON.stringify(json.questionsFormData));
                }
                if (json.socialAnswersResponse !== null) {
                    localStorage.setItem('socialAnswersResponse', JSON.stringify(json.socialAnswersResponse));
                }
    
                // Optionally update state with uploaded data
                setFileContent(json);
    
            } catch (error) {
                alert('Invalid JSON file');
            }
        };
    
        reader.readAsText(file);
    }
    
};
