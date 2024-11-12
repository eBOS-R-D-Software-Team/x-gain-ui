import { message } from 'antd';


const USERNAME = 'xgain';
const PASSWORD = 'xG4iN1Cc$-ins';

const iccsUrl = process.env.REACT_APP_API_BASE_URL;
const incUrl = process.env.REACT_APP_API1_BASE_URL;
const wrUrl = process.env.REACT_APP_API3_BASE_URL;

const apiRequest = async (url, method, headers, body) => {
    const response = await fetch(url, {
        method,
        headers,
        body,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};


const fetchLoginToken = async (loginData) => {
    return apiRequest(`${iccsUrl}/login`, 'POST', {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
    }, loginData);
};


const postMainData = async (mainData, token) => {
    return apiRequest(`${iccsUrl}/main`, 'POST', {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    }, JSON.stringify(mainData));
};


const retrieveAccessToken = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        throw new Error('No access token found. Please log in first.');
    }
    return accessToken;
};


const retrieveFromLocalStorage = (key, errorMessage) => {
    const data = JSON.parse(localStorage.getItem(key));
    if (!data) {
        throw new Error(errorMessage);
    }
    return data;
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
            ...retrieveFromLocalStorage('sectorsServicesLevelDetails', ''),
            ...retrieveFromLocalStorage('sectorsServicesDetails', ''),
            ...retrieveFromLocalStorage('locationDetails', ''),
            ...retrieveFromLocalStorage('questionsFormData', ''),
        };

        const mainResponseData = await postMainData(mainData, loginResponseData.access_token);
        localStorage.setItem('iccs_response', JSON.stringify(mainResponseData));

        console.log('Main response:', mainResponseData);
        return mainResponseData;

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        message.error('There was a problem with the fetch operation');
        return false;
    }
};


const postWithAccessToken = async (url, bodyData) => {
    try {
        const accessToken = retrieveAccessToken();
        return await apiRequest(url, 'POST', {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }, JSON.stringify(bodyData));
    } catch (error) {
        console.error(error.message);
        message.error(error.message);
        localStorage.removeItem('iccs_response');  // Remove specific item
        localStorage.removeItem('solutionsAnalysisResponse');
        return false;
    }
}; 


export const postSolutionsAnalysis = async () => {
    try {
        const iccsResponseData = retrieveFromLocalStorage('iccs_response', 'No ICCS response data found in localStorage.');
        const responseData = await postWithAccessToken(`${incUrl}/solutionanalysis`, iccsResponseData);
        if (responseData) {
            localStorage.setItem('solutionsAnalysisResponse', JSON.stringify(responseData));
            console.log('Solutions Analysis response:', responseData);
        }
        return !!responseData;
    } catch (error) {
        console.error('Error posting to Solutions Analysis:', error);
        localStorage.removeItem('iccs_response');  // Remove specific item
        localStorage.removeItem('solutionsAnalysisResponse'); 
        return false;
    }
};


export const postSocialQuestions = async (mainData) => {
    const responseData = await postWithAccessToken(`${wrUrl}/Social/DetermineAdditionalQuestions`, mainData);
    if (responseData) {
        localStorage.setItem('socialQuestionsResponse', JSON.stringify(responseData));
    }
    return responseData;
};


export const postSocialAnswers = async (data) => {
    try {
        const responseData = await postWithAccessToken(`${wrUrl}/Social/CalculateSocialScore`, data);
        if (responseData) {
            localStorage.setItem('socialAnswersResponse', JSON.stringify(responseData));
            console.log('Calculate Social Score response:', responseData);
        }
        return !!responseData;
    } catch (error) {
        console.error('Error posting to Solutions Analysis:', error);
        return false;
    }
};


export const postEnvironmentalData = async (data) => {
    const responseData = await postWithAccessToken(`${wrUrl}/Environmental/CalculateEnvironmentalScore`, data);
    if (responseData) {
        localStorage.setItem('environmentalDataResponse', JSON.stringify(responseData));
    }
    return responseData;
};
