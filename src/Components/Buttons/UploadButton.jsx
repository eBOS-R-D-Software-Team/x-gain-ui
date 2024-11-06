export const handleFileUpload = (event, setFileContent) => {    
   
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
    
        reader.onload = function(e) {
            try {
                const json = JSON.parse(e.target.result);    
                // Optionally update state with uploaded data
                setFileContent(json);
    
            } catch (error) {
                alert('Invalid JSON file');
            }
        };
    
        reader.readAsText(file);
    }
    
};
