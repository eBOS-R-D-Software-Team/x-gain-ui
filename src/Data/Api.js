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
        console.log('ddncncccc', mainData);
        const mainResponseData = await postMainData(mainData, loginResponseData.access_token);

        localStorage.setItem('iccs_response', JSON.stringify(mainResponseData));

        console.log('Login response:', loginResponseData);
        console.log('Main Data:', mainData);
        console.log('Main response:', mainResponseData);

        return mainData;

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        message.error("There was a problem with the fetch operation");
        return false;
    }
};
