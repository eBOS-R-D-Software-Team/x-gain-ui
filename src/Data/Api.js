import { message } from 'antd';

const USERNAME = 'xgain';
const PASSWORD = 'xG4iN1Cc$-ins';

const fetchLoginToken = async (loginData) => {
    const response = await fetch("/api/login", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*'
        },
        body: loginData
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};


const postMainData = async (mainData, token) => {
    const response = await fetch("/api/main", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(mainData)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};


export const postDataToICCSApi = async () => {
    const loginData = new URLSearchParams({
        grant_type: '',
        username: USERNAME,
        password: PASSWORD,
        scope: '',
        client_id: '',
        client_secret: ''
    });

    try {
        const loginResponseData = await fetchLoginToken(loginData);
        localStorage.setItem('access_token', loginResponseData.access_token);
        
        const mainData = {
            ...JSON.parse(localStorage.getItem('sectorsServicesLevelDetails')) || {},
            ...JSON.parse(localStorage.getItem('sectorsServicesDetails')) || {},
            ...JSON.parse(localStorage.getItem('locationDetails')) || {},
            ...JSON.parse(localStorage.getItem('questionsFormData')) || {},
        }
        const mainResponseData = await postMainData(mainData, loginResponseData.access_token);

        localStorage.setItem('iccs_response', JSON.stringify(mainResponseData));
        
        console.log('Main response:', mainResponseData);

        return mainResponseData;

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        message.error("There was a problem with the fetch operation");
        return false;
    }
};


export const postSolutionsAnalysis = async () => {
    const URL = '/api1/solutionsanalysis';
    
    try {
        // Retrieve the access token
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            throw new Error('No access token found. Please log in first.');
        }

        // Retrieve the ICCS response data from localStorage
        const iccsResponseData = JSON.parse(localStorage.getItem('iccs_response'));
        if (!iccsResponseData) {
            throw new Error('No ICCS response data found in localStorage.');
        }

        // console.log('respos', iccsResponseData);

        // Make the POST request
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(iccsResponseData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Solutions Analysis response:', responseData);

        // Optionally, store the response in localStorage
        localStorage.setItem('solutionsAnalysisResponse', JSON.stringify(responseData));

        return true;

    } catch (error) {
        console.error('Error posting to Solutions Analysis:', error);
        //message.error("Error posting to Solutions Analysis");
        return false;
    }
};
